'use client'
import {Modal} from '@mui/material';
import {FormEvent, useState} from "react";
import {Write} from "@/app/_components/_icons/Write";
export default function WritingModal() {
    const [open, setOpen] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    function send(e:FormEvent) {
        e.preventDefault();
        setIsSending(true);
        setTimeout(() => {
            // TODO:
            // - set Nodemailer to SEND the email with the current configuration and the screenshot
            setIsSending(false);
            setSent(true);
        }, 1000)
    }

    function closeReset() {
        setSent(false);
        setOpen(false);
    }

    return (
        <>
            <button className="cursor-pointer" onClick={() => setOpen(true)}>
                <Write/>
            </button>
            <Modal
                open={open}
                onClose={closeReset}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <div className="absolute top-[50%] left-[50%] translate-[-50%] bg-gray-50 rounded py-8 px-12 w-128">
                    {isSending
                        ?
                        <div className="w-full text-center">
                            <span className="loader mb-8 inline-block mx-auto"></span>
                            <h2 className="text-gray-950 mx-auto">Sending...</h2>
                        </div>
                        : sent
                            ? <div>
                                <p className="text-gray-950">Your email has been sent!</p>
                                <div className="w-full text-right mt-6">
                                    <button className="cursor-pointer py-2 px-4 rounded-full border text-gray-950"
                                            type="button" onClick={closeReset}>Close
                                    </button>
                                </div>
                            </div>

                            : <div>
                                <p className="text-gray-950">Write an email to your customer</p>
                                <form className="flex flex-col gap-2 mt-6" onSubmit={(event) => send(event)}>
                                    <textarea className="w-full rounded bg-stone-200 py-2 px-4 h-[30dvh]" placeholder="Your email"
                                           required/>
                                    <div className="w-full text-right mt-4">
                                        <button
                                            className="cursor-pointer py-2 px-4 rounded-full border text-gray-950 mr-4"
                                            type="button" onClick={closeReset}>Close
                                        </button>
                                        <button
                                            className="cursor-pointer py-2 px-4 rounded-full bg-gray-950 text-gray-50"
                                            type="submit">Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                    }
                </div>
            </Modal>
        </>
    )
}