'use client'
import Link from 'next/link';
import React, {useState} from "react";
import {MuiTelInput} from "mui-tel-input";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
import {useRouter} from "next/navigation";
import PersonalData from "@/app/_types/PersonalData";
import createCustomer from "@/app/_helpers/_db-interactions/createCustomer";
import uploadScan from "@/app/_helpers/_db-interactions/uploadScan";
import createConfig from "@/app/_helpers/_db-interactions/createConfig";
import uploadConfig from "@/app/_helpers/_db-interactions/uploadConfig";
import createOrder from "@/app/_helpers/_db-interactions/createOrder";
export default function Payment() {
    const router = useRouter();
    const history = useTeethStore((state:State) => state.history);
    const bufferConfigImage = useTeethStore((state:State) => state.bufferConfigImage);
    const scanImage = useTeethStore((state:State) => state.scanImage);
    const total = useTeethStore((state:State) => state.total);
    const packaging = useTeethStore((state: State) => state.packaging);
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
    function handlePhoneChange(newValue: string) {
        setBillingData({...billingData, phone:newValue});
        if(error) {
            setError(false)
        }
    }

    function handleShipPhoneChange(newValue: string) {
        setBillingData({...shippingData, phone:newValue});
        if(error) {
            setError(false)
        }
    }

    const [isSending, setIsSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    async function pay() {
        setIsSending(true);
        let shippingJson;
        if(differentShipOpts && (
            shippingData.name === ''
            || shippingData.lastname === ''
            || shippingData.address === ''
            || shippingData.city === ''
            || shippingData.state === ''
            || shippingData.phone === ''
            || shippingData.postalCode === ''
        )) {
            setIsSending(false);
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
            setIsSending(false);
            setError('The billing information is incomplete');
            return;
        }
        if(differentShipOpts) {
            shippingJson = shippingData;
        } else {
            shippingJson = {...billingData};
            delete shippingJson.email;
        }
        // console.log(billingData, shippingJson, bufferConfigImage, scanImage);
        // server action? - YES
        // create Customer + retrieve id - YES
        // upload scan + update Customer (if scan is present) - YES
        // create Config + retrieve id
        // upload config + update Config
        // create Order w/ Customer id + Config id

        try {

            const customer = await createCustomer(billingData);
            const number = Math.random() * 100 + Math.cos(Math.random() * 100);
            if(scanImage.scan && customer) {
                await uploadScan(scanImage, number, customer[0].id);
            }

            const config = await createConfig(history[history.length-1][0], total, packaging);
            if(bufferConfigImage && config) {
                await uploadConfig(bufferConfigImage, number, config[0].id);
            }

            if(customer && config) {
                await createOrder(customer[0].id, config[0].id, total, shippingJson);
            }

            setIsSending(false);
            setSent(true);
            router.push('/checkout/payment/success');

        } catch(error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="fixed w-full flex justify-center z-16">
                <img className="cursor-auto py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
            </div>
            {isSending
                ? <div className="w-[75vw] h-page-nav flex flex-col items-center justify-center mx-auto">
                    <div className="w-full text-center">
                        <span className="loader mb-8 inline-block mx-auto"></span>
                        <h2 className="text-gray-950 mx-auto">Processing your transaction...</h2>
                    </div>
                </div>
                : sent
                    ? <></>
                    :
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
                                                <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                       type="text"
                                                       placeholder="Type your name"
                                                       value={billingData.name}
                                                       onChange={(e) => {
                                                           setBillingData({
                                                               ...billingData,
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
                                                <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                       type="text"
                                                       placeholder="Type your last name"
                                                       value={billingData.lastname}
                                                       onChange={(e) => {
                                                           setBillingData({
                                                               ...billingData,
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
                                                <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                       type="text"
                                                       placeholder="Type your address"
                                                       value={billingData.address}
                                                       onChange={(e) => {
                                                           setBillingData({
                                                               ...billingData,
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
                                                <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                       type="text"
                                                       placeholder="Type your city"
                                                       value={billingData.city}
                                                       onChange={(e) => {
                                                           setBillingData({
                                                               ...billingData,
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
                                                       value={billingData.postalCode}
                                                       onChange={(e) => {
                                                           setBillingData({
                                                               ...billingData,
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
                                                <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                       type="text"
                                                       placeholder="Type your state"
                                                       value={billingData.state}
                                                       onChange={(e) => {
                                                           setBillingData({
                                                               ...billingData,
                                                               state: e.currentTarget.value
                                                           });
                                                           if(error) {
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
                                                           if(error) {
                                                               setError(false)
                                                           }
                                                       }}
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
                                                                paddingTop: '0.5rem',
                                                                paddingBottom: '0.5rem',
                                                                paddingRight: '1rem'
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
                                }}>
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
                                                        <input className="w-full bg-stone-200 rounded py-2 px-4"
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
                                                        <input className="w-full bg-stone-200 rounded py-2 px-4"
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
                                                        <input className="w-full bg-stone-200 rounded py-2 px-4"
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
                                                        <input className="w-full bg-stone-200 rounded py-2 px-4"
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
                                                        <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                               type="text"
                                                               placeholder="Type your state"
                                                               value={shippingData.state}
                                                               onChange={(e) => {
                                                                   setShippingData({
                                                                       ...shippingData,
                                                                       state: e.currentTarget.value
                                                                   });
                                                                   if(error) {
                                                                       setError(false)
                                                                   }
                                                               }}
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
                                                                        paddingTop: '0.5rem',
                                                                        paddingBottom: '0.5rem',
                                                                        paddingRight: '1rem'
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

                            </div>
                            <div className="w-full lg:w-[50%] px-6 py-4 border-t-1 border-black/40 lg:border-t-0">
                                <form className="flex flex-col gap-4 px-2 pt-2 pb-8 justify-center h-full">
                                    <label>Card number
                                        <input className="w-full bg-stone-200 rounded py-2 px-4"
                                               type="text"
                                               placeholder="Enter your debit/credit card number"
                                               required
                                        />
                                    </label>
                                    <div className="flex gap-4">
                                        <label>Expiration date
                                            <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                   type="text"
                                                   placeholder="__/__"
                                                   required
                                            />
                                        </label>
                                        <label>CVV
                                            <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                   type="number"
                                                   placeholder="CVV"
                                                   required
                                            />
                                        </label>
                                    </div>
                                    <label className="flex items-center gap-2 mt-4">
                                        <input
                                            type="checkbox"
                                            required
                                        />
                                        I agree with the terms and conditions
                                    </label>
                                    <label className="flex items-center gap-2 mt-[-1rem]">
                                        <input
                                            type="checkbox"
                                            required
                                        />
                                        I read and accept the privacy policy
                                    </label>
                                </form>
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
                            <button className="rounded-3xl bg-slate-950 text-gray-50 px-5 py-2 h-full cursor-pointer"
                                    type="button" onClick={pay}>Proceed to payment &rarr;</button>
                        </div>
                    </div>

            }
        </>
    )
}