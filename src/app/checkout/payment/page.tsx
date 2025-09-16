'use client'
import Link from 'next/link';
import {useState} from "react";
import {MuiTelInput} from "mui-tel-input";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useTeethStore} from "@/app/stores/teeth";
import {State} from "@/app/types/State";
import {useRouter} from "next/navigation";
export default function Upload() {
    const router = useRouter();
    const history = useTeethStore((state:State) => state.history);
    // const preciousness = useTeethStore((state:State) => state.teethPreciousness);
    const [value, setValue] = useState<string>();
    // DA RE-INSERIRE QUANDO VERRA' ABILITATA L'OPZIONE DEL RITIRO PRESSO GLI AFFILIATI
    // const [shippingOption, setShippingOption] = useState<string|undefined>(undefined);
    const [differentShipOpts, setDifferentShipOpts] = useState<boolean>(false);
    function handleChange(newValue: string) {
        setValue(newValue);
    }

    const [isSending, setIsSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    function pay() {
        console.log(JSON.stringify(history[history.length-1][0]));
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setSent(true);
            router.push('/checkout/payment/success');
        }, 1000)
    }

    return(
        <>
            {isSending
                ? <div className="w-[75vw] h-[calc(100vh-54px)] flex flex-col items-center justify-center mx-auto">
                    <div className="w-full text-center">
                        <span className="loader mb-8 inline-block mx-auto"></span>
                        <h2 className="text-gray-950 mx-auto">Processing your transaction...</h2>
                    </div>
                  </div>
                : sent
                    ? <></>
                    : <>
                        <div className="w-[75vw] h-[calc(100vh-54px-15vh)] flex flex-col items-center justify-center gap-8 mx-auto">
                            <div className="w-full flex items-center justify-center">
                          <div
                              className="w-[50%] border-r border-gray-950/[33%] overflow-y-auto max-h-[calc(100vh-54px-15vh)]">

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
                                      sx={{borderTop: '1px solid #9ca3af', height: 'calc(100% - 100px - 15vh)'}}>

                                      <form className="flex flex-col gap-2 px-2 pt-2 pb-8">
                                          <label>Name
                                              <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                     type="text"
                                                     placeholder="Type your name"
                                                     required
                                              />
                                          </label>
                                          <label>Last name
                                              <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                     type="text"
                                                     placeholder="Type your last name"
                                                     required
                                              />
                                          </label>
                                          <label>Address
                                              <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                     type="text"
                                                     placeholder="Type your address"
                                                     required
                                              />
                                          </label>
                                          <label>City
                                              <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                     type="text"
                                                     placeholder="Type your city"
                                                     required
                                              />
                                          </label>
                                          <label>Postal code
                                              <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                     type="number"
                                                     placeholder="Type your postal code"
                                                     required
                                              />
                                          </label>
                                          <label>State
                                              <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                     type="text"
                                                     placeholder="Type your state"
                                                     required
                                              />
                                          </label>
                                          <label>Email address
                                              <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                     type="email"
                                                     placeholder="Type your email address"
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
                                                               value={value}
                                                               onChange={handleChange}/>
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
                                      sx={{borderTop: '1px solid #9ca3af', height: 'calc(100% - 100px - 15vh)'}}>

                                      <>
                                          <div className="px-2 pt-2 pb-4">
                                              <p className="mb-2">Do you want to ship your package to an address different from the
                                                  billing address?</p>
                                              <div>
                                                  <label className="flex items-center gap-2 cursor-pointer">
                                                      <input className="cursor-pointer" type="radio" name="diffShip" value="0"
                                                             checked={!differentShipOpts}
                                                             onChange={() => setDifferentShipOpts(false)}
                                                             required
                                                      />
                                                      No
                                                  </label>
                                                  <label className="flex items-center gap-2 cursor-pointer">
                                                      <input className="cursor-pointer" type="radio" name="diffShip" value="1"
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
                                                             required
                                                      />
                                                  </label>
                                                  <label>Last name
                                                      <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                             type="text"
                                                             placeholder="Type your last name"
                                                             required
                                                      />
                                                  </label>
                                                  <label>Address
                                                      <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                             type="text"
                                                             placeholder="Type your address"
                                                             required
                                                      />
                                                  </label>
                                                  <label>City
                                                      <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                             type="text"
                                                             placeholder="Type your city"
                                                             required
                                                      />
                                                  </label>
                                                  <label>Postal code
                                                      <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                             type="number"
                                                             placeholder="Type your postal code"
                                                             required
                                                      />
                                                  </label>
                                                  <label>State
                                                      <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                             type="text"
                                                             placeholder="Type your state"
                                                             required
                                                      />
                                                  </label>
                                                  <label>Email address
                                                      <input className="w-full bg-stone-200 rounded py-2 px-4"
                                                             type="email"
                                                             placeholder="Type your email address"
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
                                                                       value={value}
                                                                       onChange={handleChange}/>
                                                      </div>
                                                  </label>
                                              </form>
                                          }
                                      </>
                                  </AccordionDetails>
                              </Accordion>

                          </div>
                                <div className="w-[50%] px-6 py-4">
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
                        </div>
                        <div className="w-[75vw] h-[15vh] flex items-center justify-between mx-auto">
                            <Link className="cursor-pointer py-2 px-4 rounded-full border text-gray-950 mr-4"
                                  href="/checkout/upload">&larr; Back
                            </Link>
                            <button className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
                                    type="button" onClick={pay}>Proceed to payment &rarr;</button>
                        </div>
                    </>
            }
        </>
    )
}