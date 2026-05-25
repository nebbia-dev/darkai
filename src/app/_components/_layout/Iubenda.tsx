import Script from "next/script";

export default function Iubenda() {
    return (
        <div id="iubenda" className="w-full mt-4 text-lg lg:text-sm underline">
            <div className="w-[90%] lg:mt-0 mt-[148px] flex flex-col lg:flex-row items-center justify-center gap-2 mx-auto pb-4">
                <a href="https://www.iubenda.com/privacy-policy/77378144"
                   target="_blank" rel="noopener noreferrer"
                   className="" title="Privacy Policy ">Privacy
                    Policy</a>
                <a href="https://www.iubenda.com/privacy-policy/77378144/cookie-policy"
                   target="_blank" rel="noopener noreferrer"
                   className="" title="Cookie Policy ">Cookie
                    Policy</a>
                <Script
                    id="iubenda-core"
                    src="https://cdn.iubenda.com/iubenda.js"
                    strategy="lazyOnload"
                />
                <Script
                    id="iubenda-widget"
                    src="https://embeds.iubenda.com/widgets/f2d23e79-f6e0-4ca2-9474-f8e21f64e089.js"
                    strategy="lazyOnload"
                />
            </div>
        </div>
    )
}