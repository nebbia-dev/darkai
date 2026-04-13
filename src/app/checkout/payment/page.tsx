'use client'
import Link from 'next/link';
import React, {useEffect, useState} from "react";
import {MuiTelInput} from "mui-tel-input";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import PersonalData from "@/app/_types/PersonalData";
import CountrySelect from "@/app/_components/_elements/CountrySelect";
import findShippingFees from "@/app/_helpers/_checkers/findShippingFees";
import {StripeCheckout} from "@/app/_components/_elements/StripeCheckout";
import {prepareCheckout} from "@/app/_helpers/_stripe/prepareCheckout";
import CheckoutRecap from "@/app/_components/_elements/CheckoutRecap";
import calcTotal from "@/app/_helpers/_calculators/calcTotal";
import {History} from "@/app/_types/TeethOptions";
import {dataUrlToFile, uploadToStorage} from "@/app/_helpers/_uploads/uploadToStorage";

type PreparedCheckout = {
    clientSecret: string,
    orderId: number,
    configId: number,
    finalTotal: number,
}

export default function Checkout() {
    const history = useTeethStore((state:State) => state.history);
    const bufferConfigImage = useTeethStore((state:State) => state.bufferConfigImage);
    const scanImage = useTeethStore((state:State) => state.scanImage);
    const savedConfig = useTeethStore((state:State) => state.savedConfig);
    const setSavedConfig = useTeethStore((state:State) => state.setSavedConfig);
    const [finalConfig, setFinalConfig] = useState<{config:History|undefined, total:number}>({config:undefined, total:0});
    const packaging = useTeethStore((state: State) => state.packaging);
    const [shippingFees, setShippingFees] = useState<number|undefined>();
    const [billingData, setBillingData] = useState<PersonalData>({
        lastname: '',
        name: '',
        city: '',
        postalCode: '',
        state: '',
        email: '',
        phone: '',
        address: '',
    });
    const [shippingData, setShippingData] = useState<PersonalData>({
        lastname: '',
        name: '',
        city: '',
        postalCode: '',
        state: '',
        email: '',
        phone: '',
        address: '',
    });
    const [error, setError] = useState<boolean|string>(false);
    // DA RE-INSERIRE QUANDO VERRA' ABILITATA L'OPZIONE DEL RITIRO PRESSO GLI AFFILIATI
    // const [shippingOption, setShippingOption] = useState<string|undefined>(undefined);
    const [differentShipOpts, setDifferentShipOpts] = useState<boolean>(false);
    const [uploadedScanPath, setUploadedScanPath] = useState<string|undefined>(undefined);
    const [uploadedConfigPath, setUploadedConfigPath] = useState<string|undefined>(undefined);

    function handlePhoneChange(newValue: string) {
        setBillingData({...billingData, phone:newValue});
        if(error) {
            setError(false)
        }
    }

    function handleShipPhoneChange(newValue: string) {
        setShippingData({...shippingData, phone:newValue});
        if(error) {
            setError(false)
        }
    }

    function handleStateChange(newValue: string) {
        setBillingData({...billingData, state:newValue});

        if (differentShipOpts) {
            if (error) {
                setError(false);
            }
            return;
        }

        const fees = findShippingFees(newValue);
        if(fees === null) {
            setError('Attention: we do not ship to this country. Please add a valid address in the shipping address options');
            return;
        } else {
            if (!differentShipOpts) {
                setShippingFees(fees);
            }
        }

        if(error) {
            setError(false);
        }
    }

    function handleStateShipChange(newValue: string) {
        setShippingData({...shippingData, state:newValue});
        const fees = findShippingFees(newValue);
        if(fees === null) {
            setError('Attention: we do not ship to this country');
            return;
        } else {
            setShippingFees(fees);
        }

        if(error) {
            setError(false)
        }
    }

    const [isPreparingCheckout, setIsPreparingCheckout] = useState<boolean>(false);
    const [isUploadingScan, setIsUploadingScan] = useState<boolean>(false);
    const [isUploadingConfig, setIsUploadingConfig] = useState<boolean>(false);
    const [preparedCheckout, setPreparedCheckout] = useState<PreparedCheckout | null>(null);

    useEffect(() => {
        const shippingState = differentShipOpts ? shippingData.state : billingData.state;

        if (shippingState === '') {
            setShippingFees(undefined);
            return;
        }

        const fees = findShippingFees(shippingState);
        if (fees === null) {
            setShippingFees(undefined);
            return;
        }

        setShippingFees(fees);
    }, [billingData.state, differentShipOpts, shippingData.state]);

    useEffect(() => {
        setPreparedCheckout((currentPreparedCheckout) => currentPreparedCheckout ? null : currentPreparedCheckout);
    }, [billingData, differentShipOpts, scanImage, shippingData]);

    useEffect(() => {
        setUploadedScanPath(undefined);
    }, [scanImage]);

    useEffect(() => {
        setUploadedConfigPath(undefined);
    }, [bufferConfigImage]);

    async function calcFinalRecap(e:any) {
        if(!e.currentTarget.classList.contains('Mui-expanded') && (!finalConfig.config || finalConfig.total === 0)) {
            const {config, total} = await calcTotal(history[history.length - 1]?.[0], packaging);
            setFinalConfig({config, total});
        }
    }

    async function uploadScanBeforeCheckout() {
        if (!scanImage.scan) {
            return undefined;
        }

        if (uploadedScanPath) {
            return uploadedScanPath;
        }

        setIsUploadingScan(true);

        try {
            const extension = scanImage.type?.split('/')[1]?.split('+')[0] || 'bin';
            const file = new File(
                [scanImage.scan],
                `scan.${extension}`,
                {type: scanImage.type || 'application/octet-stream'},
            );
            const uploadedScan = await uploadToStorage('scans', file);

            setUploadedScanPath(uploadedScan.path);
            return uploadedScan.path;
        } finally {
            setIsUploadingScan(false);
        }
    }

    async function uploadConfigBeforeCheckout() {
        if (!bufferConfigImage || savedConfig) {
            return undefined;
        }

        if (uploadedConfigPath) {
            return uploadedConfigPath;
        }

        setIsUploadingConfig(true);

        try {
            const file = await dataUrlToFile(bufferConfigImage, 'config');
            const uploadedConfig = await uploadToStorage('configs', file);

            setUploadedConfigPath(uploadedConfig.path);
            return uploadedConfig.path;
        } finally {
            setIsUploadingConfig(false);
        }
    }

    async function handlePrepareCheckout() {
        if(differentShipOpts && (
            shippingData.name === ''
            || shippingData.lastname === ''
            || shippingData.address === ''
            || shippingData.city === ''
            || shippingData.state === ''
            || shippingData.phone === ''
            || shippingData.postalCode === ''
        )) {
            setError('The shipping information is incomplete');
            return;
        }

        if(billingData.name === ''
            || billingData.lastname === ''
            || billingData.address === ''
            || billingData.city === ''
            || billingData.state === ''
            || billingData.phone === ''
            || billingData.postalCode === ''
            || billingData.email === ''
        ) {
            setError('The billing information is incomplete');
            return;
        }

        if(!bufferConfigImage) {
            setError('No configuration screenshot was found');
            return;
        }

        const currentShippingState = differentShipOpts ? shippingData.state : billingData.state;
        if (currentShippingState === '' || findShippingFees(currentShippingState) === null) {
            setError('Unfortunately we do not ship to this country');
            return;
        }

        setIsPreparingCheckout(true);

        try {
            const {config, total} = await calcTotal(history[history.length - 1]?.[0], packaging);
            const currentUploadedScanPath = await uploadScanBeforeCheckout();
            const currentUploadedConfigPath = await uploadConfigBeforeCheckout();
            const checkout = await prepareCheckout({
                billingData,
                shippingData,
                differentShipOpts,
                currentConfig: config,
                total,
                packaging,
                uploadedConfigPath: currentUploadedConfigPath,
                uploadedScanPath: currentUploadedScanPath,
                savedConfig,
            });

            setPreparedCheckout({
                clientSecret: checkout.clientSecret,
                orderId: checkout.orderId,
                configId: checkout.configId,
                finalTotal: checkout.finalTotal,
            });
            setSavedConfig(checkout.configId);
            setError(false);
        } catch(err) {
            setPreparedCheckout(null);
            setError(err instanceof Error ? err.message : 'Unable to initialize the payment');
        } finally {
            setIsPreparingCheckout(false);
        }
    }

    return(
        <>
            <div className="fixed w-full flex justify-center z-16">
                <img className="cursor-auto py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
            </div>
            <div
                className="w-[90%] lg:w-[75vw] lg:h-page-nav flex flex-col items-center justify-center mx-auto text-sm">
                <div
                    className={`mt-18 w-full ${error ? 'h-[calc(100dvh-(0.25rem*38)-60px)]' : 'h-[calc(100dvh-(0.25rem*28)-60px)]'} lg:h-auto flex lg:flex-row flex-col overflow-y-auto lg:overflow-y-none lg:items-center lg:justify-center lg:bg-gray-50 p-6 lg:rounded-3xl lg:border-1`}>
                    <div
                        className="w-full lg:w-[50%] lg:border-r lg:border-gray-950/[33%] lg:overflow-y-auto lg:max-h-[calc(70dvh-54px)]">

                        <Accordion elevation={0} sx={{
                            backgroundColor: '#f9fafb',
                            '&:before': {height: '0px'},
                            '&.Mui-expanded': {margin: 0},
                        }}>
                            <div className="flex items-center justify-center">
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{
                                    height: '100px',
                                    px: 8,
                                    width: '90%',
                                    '&.MuiAccordionSummary-root': {paddingLeft: '2rem', paddingRight: '2rem'},
                                }}>
                                    <h2>Billing information</h2>
                                </AccordionSummary>
                            </div>
                            <AccordionDetails
                                sx={{borderTop: '1px solid #9ca3af', height: 'calc(100% - 100px - 15dvh)'}}>

                                <form className="flex flex-col gap-2 px-2 pt-2 pb-8">
                                    <label>Name
                                        <input
                                            className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                            type="text"
                                            placeholder="Type your name"
                                            value={billingData.name}
                                            onChange={(e) => {
                                                setBillingData({
                                                    ...billingData,
                                                    name: e.currentTarget.value
                                                });
                                                if (error) {
                                                    setError(false)
                                                }
                                            }}
                                            required
                                        />
                                    </label>
                                    <label>Last name
                                        <input
                                            className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                            type="text"
                                            placeholder="Type your last name"
                                            value={billingData.lastname}
                                            onChange={(e) => {
                                                setBillingData({
                                                    ...billingData,
                                                    lastname: e.currentTarget.value
                                                });
                                                if (error) {
                                                    setError(false)
                                                }
                                            }}
                                            required
                                        />
                                    </label>

                                    <label>Email address
                                        <input className="w-full bg-stone-200 rounded py-2 px-4"
                                               type="email"
                                               placeholder="Type your email address"
                                               value={billingData.email}
                                               onChange={(e) => {
                                                   setBillingData({
                                                       ...billingData,
                                                       email: e.currentTarget.value
                                                   });
                                                   if (error) {
                                                       setError(false)
                                                   }
                                               }}
                                               required
                                        />
                                    </label>

                                    <label>Address
                                        <input
                                            className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                            type="text"
                                            placeholder="Type your address"
                                            value={billingData.address}
                                            onChange={(e) => {
                                                setBillingData({
                                                    ...billingData,
                                                    address: e.currentTarget.value
                                                });
                                                if (error) {
                                                    setError(false)
                                                }
                                            }}
                                            required
                                        />
                                    </label>

                                    <label>City
                                        <input
                                            className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                            type="text"
                                            placeholder="Type your city"
                                            value={billingData.city}
                                            onChange={(e) => {
                                                setBillingData({
                                                    ...billingData,
                                                    city: e.currentTarget.value
                                                });
                                                if (error) {
                                                    setError(false)
                                                }
                                            }}
                                            required
                                        />
                                    </label>
                                    <label>Postal code
                                        <input
                                            className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                            type="number"
                                            placeholder="Type your postal code"
                                            value={billingData.postalCode}
                                            onChange={(e) => {
                                                setBillingData({
                                                    ...billingData,
                                                    postalCode: e.currentTarget.value
                                                });
                                                if (error) {
                                                    setError(false)
                                                }
                                            }}
                                            required
                                        />
                                    </label>
                                    <label>State
                                        <CountrySelect
                                            value={billingData.state}
                                            placeholder="Select your state"
                                            onChange={handleStateChange}
                                            required
                                        />
                                    </label>

                                    <label>Phone
                                        <div>
                                            <MuiTelInput sx={{
                                                width: 1,
                                                backgroundColor: '#e7e5e4',
                                                borderRadius: '0.25rem',
                                                "& .MuiOutlinedInput-root": {
                                                    fontSize: '0.875rem',
                                                    "& fieldset": {
                                                        borderWidth: '0px',
                                                    },
                                                },
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused": {
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            border: '2px solid #171717',
                                                        },
                                                    },
                                                },
                                                "& .MuiInputBase-input": {
                                                    "&.MuiOutlinedInput-input": {
                                                        color: '#171717',
                                                        fontSize: '0.875rem',
                                                        lineHeight: '1.25rem',
                                                        paddingTop: '0.5rem',
                                                        paddingBottom: '0.5rem',
                                                        paddingRight: '1rem',
                                                        "&::placeholder": {
                                                            fontSize: '0.875rem',
                                                            opacity: 0.5,
                                                        },
                                                    },
                                                },
                                            }}
                                                         placeholder="Enter your phone number"
                                                         value={billingData.phone}
                                                         onChange={handlePhoneChange}
                                            />
                                        </div>
                                    </label>
                                </form>

                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{
                            backgroundColor: '#f9fafb',
                            '&:before': {height: '0px'},
                            '&.Mui-expanded': {margin: 0},
                        }}
                        >
                            <div className="flex items-center justify-center border-t border-[#9ca3af]">
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{
                                    height: '100px',
                                    px: 8,
                                    width: '90%',
                                    '&.MuiAccordionSummary-root': {paddingLeft: '2rem', paddingRight: '2rem'},
                                }}>
                                    <h2>Shipping</h2>
                                </AccordionSummary>
                            </div>
                            <AccordionDetails
                                sx={{borderTop: '1px solid #9ca3af', height: 'calc(100% - 100px - 15dvh)'}}>

                                <>
                                    <div className="px-2 pt-2 pb-4">
                                        <p className="mb-2">Do you want to ship your package to an address
                                            different from the
                                            billing address?</p>
                                        <div>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input className="cursor-pointer" type="radio" name="diffShip"
                                                       value="0"
                                                       checked={!differentShipOpts}
                                                       onChange={() => setDifferentShipOpts(false)}
                                                       required
                                                />
                                                No
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input className="cursor-pointer" type="radio" name="diffShip"
                                                       value="1"
                                                       checked={differentShipOpts}
                                                       onChange={() => setDifferentShipOpts(true)}
                                                       required
                                                />
                                                Yes
                                            </label>
                                        </div>
                                    </div>

                                    {differentShipOpts &&
                                        <form className="flex flex-col gap-2 px-2 pt-2 pb-8">
                                            <label>Name
                                                <input className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                                       type="text"
                                                       placeholder="Type your name"
                                                       value={shippingData.name}
                                                       onChange={(e) => {
                                                           setShippingData({
                                                               ...shippingData,
                                                               name: e.currentTarget.value
                                                           });
                                                           if(error) {
                                                               setError(false)
                                                           }
                                                       }}
                                                       required
                                                />
                                            </label>
                                            <label>Last name
                                                <input className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                                       type="text"
                                                       placeholder="Type your last name"
                                                       value={shippingData.lastname}
                                                       onChange={(e) => {
                                                           setShippingData({
                                                               ...shippingData,
                                                               lastname: e.currentTarget.value
                                                           });
                                                           if(error) {
                                                               setError(false)
                                                           }
                                                       }}
                                                       required
                                                />
                                            </label>
                                            <label>Address
                                                <input className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                                       type="text"
                                                       placeholder="Type your address"
                                                       value={shippingData.address}
                                                       onChange={(e) => {
                                                           setShippingData({
                                                               ...shippingData,
                                                               address: e.currentTarget.value
                                                           });
                                                           if(error) {
                                                               setError(false)
                                                           }
                                                       }}
                                                       required
                                                />
                                            </label>
                                            <label>City
                                                <input className="w-full bg-stone-200 rounded py-2 px-4 focus:outline-black"
                                                       type="text"
                                                       placeholder="Type your city"
                                                       onChange={(e) => {
                                                           setShippingData({
                                                               ...shippingData,
                                                               city: e.currentTarget.value
                                                           });
                                                           if(error) {
                                                               setError(false)
                                                           }
                                                       }}
                                                       required
                                                />
                                            </label>
                                            <label>Postal code
                                                <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                       type="number"
                                                       placeholder="Type your postal code"
                                                       value={shippingData.postalCode}
                                                       onChange={(e) => {
                                                           setShippingData({
                                                               ...shippingData,
                                                               postalCode: e.currentTarget.value
                                                           });
                                                           if(error) {
                                                               setError(false)
                                                           }
                                                       }}
                                                       required
                                                />
                                            </label>
                                            <label>State
                                                <CountrySelect
                                                    value={shippingData.state}
                                                    placeholder="Select your state"
                                                    onChange={handleStateShipChange}
                                                    required
                                                />
                                            </label>
                                            <label>Phone
                                                <div>
                                                    <MuiTelInput sx={{
                                                        width: 1,
                                                        backgroundColor: '#e7e5e4',
                                                        borderRadius: '0.25rem',
                                                        "& .MuiOutlinedInput-root": {
                                                            fontSize: '0.875rem',
                                                            "& fieldset": {
                                                                borderWidth: '0px',
                                                            },
                                                        },
                                                        "& .MuiInputBase-root": {
                                                            "&.Mui-focused": {
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    border: '2px solid #171717',
                                                                },
                                                            },
                                                        },
                                                        "& .MuiInputBase-input": {
                                                            "&.MuiOutlinedInput-input": {
                                                                color: '#171717',
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.25rem',
                                                                paddingTop: '0.5rem',
                                                                paddingBottom: '0.5rem',
                                                                paddingRight: '1rem',
                                                                "&::placeholder": {
                                                                    fontSize: '0.875rem',
                                                                    opacity: 0.5,
                                                                },
                                                            },
                                                        },
                                                    }}
                                                                 placeholder="Enter your phone number"
                                                                 value={shippingData.phone}
                                                                 onChange={handleShipPhoneChange}/>
                                                </div>
                                            </label>
                                        </form>
                                    }
                                </>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{
                            backgroundColor: '#f9fafb',
                            '&:before': {height: '0px'},
                            '&.Mui-expanded': {margin: 0},
                        }}
                        onClick={(e) => calcFinalRecap(e)}
                        >
                            <div className="flex items-center justify-center border-t border-[#9ca3af]">
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{
                                    height: '100px',
                                    px: 8,
                                    width: '90%',
                                    '&.MuiAccordionSummary-root': {paddingLeft: '2rem', paddingRight: '2rem'},
                                }}
                                >
                                    <h2>Recap (shipping fees included)</h2>
                                </AccordionSummary>
                            </div>
                            <AccordionDetails
                                sx={{borderTop: '1px solid #9ca3af', height: 'calc(100% - 100px - 15dvh)'}}>

                                <CheckoutRecap history={finalConfig.config} packaging={packaging} total={finalConfig.total} shippingFees={shippingFees}/>

                            </AccordionDetails>
                        </Accordion>

                    </div>
                    <div className="h-full overflow-y-auto w-full lg:w-[50%] px-6 py-4 border-t-1 border-black/40 lg:border-t-0">
                        {preparedCheckout
                            ? <div className="h-full min-h-[420px]">
                                <div className="mb-4 rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                                    Secure payment ready. Final amount:
                                    {' '}
                                    <span className="font-semibold text-stone-950">
                                                {new Intl.NumberFormat("de-DE", {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }).format(preparedCheckout.finalTotal)}
                                            </span>
                                </div>
                                <StripeCheckout
                                    key={preparedCheckout.clientSecret}
                                    clientSecret={preparedCheckout.clientSecret}
                                />
                            </div>
                            : <div className="h-full min-h-[420px] rounded-3xl border border-dashed border-stone-400 bg-stone-100/70 px-6 py-8 flex flex-col items-center justify-center text-center">
                                {isPreparingCheckout
                                    ? <>
                                        <span className="loader mb-6 inline-block"></span>
                                        <h2 className="text-base font-semibold text-stone-950">
                                            {isUploadingScan
                                                ? 'Uploading your dental scan...'
                                                : isUploadingConfig
                                                    ? 'Uploading your configuration preview...'
                                                    : 'Preparing your secure payment...'}
                                        </h2>
                                        <p className="mt-2 max-w-md text-stone-600">
                                            {isUploadingScan
                                                ? 'We are uploading your scan before starting the Stripe checkout session.'
                                                : isUploadingConfig
                                                    ? 'We are uploading your configuration preview before creating the Stripe session.'
                                                    : 'We are saving your configuration and creating the Stripe session.'
                                            }
                                        </p>
                                    </>
                                    : <>
                                        <h2 className="text-base font-semibold text-stone-950">Payment will appear here</h2>
                                        <p className="mt-2 max-w-md text-stone-600">
                                            Complete the billing and shipping details, then prepare the checkout to load the embedded Stripe payment form on this page.
                                        </p>
                                        <button
                                            className="mt-6 rounded-3xl border border-stone-950 bg-stone-950 px-5 py-2 text-white cursor-pointer"
                                            type="button"
                                            onClick={handlePrepareCheckout}
                                        >
                                            Prepare payment
                                        </button>
                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>

                {error &&
                    <div
                        className="fixed lg:static bottom-20 border-1 border-red-500 rounded-3xl lg:w-full w-[90%] bg-red-100 px-2 py-2 flex items-center justify-between mt-4 mx-auto">
                        {error}
                    </div>
                }
                <div
                    className="fixed lg:static bottom-5 border-1 rounded-3xl lg:w-full w-[90%] bg-gray-50 px-2 py-2 flex items-center justify-between mt-4 mx-auto">
                    <Link
                        className="border-1 rounded-3xl text-slate-950 bg-gray-50 px-5 py-2 h-full cursor-pointer"
                        href="/">&larr; Back
                    </Link>
                    <button
                        className={`border-1 rounded-3xl px-5 py-2 h-full ${
                            preparedCheckout
                                ? 'border-stone-300 bg-stone-200 text-stone-600 cursor-default'
                                : 'border-slate-950 bg-slate-950 text-white cursor-pointer'
                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                        type="button"
                        disabled={isPreparingCheckout || preparedCheckout !== null}
                        onClick={handlePrepareCheckout}
                    >
                        {isUploadingScan
                            ? 'Uploading scan...'
                            : isUploadingConfig
                                ? 'Uploading preview...'
                                : isPreparingCheckout
                                    ? 'Preparing...'
                                    : preparedCheckout
                                        ? 'Payment ready'
                                        : 'Prepare payment'}
                    </button>
                </div>
            </div>
        </>
    )
}
