import {SVGProps} from "react";

export function Close(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" {...props}>{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}<g fill="none" stroke="#0000008a" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="m14.5 9.5l-5 5m0-5l5 5" /></g></svg>
    )
}