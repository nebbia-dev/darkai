import ToothConfig from "@/app/components/ToothConfig";

export default function Selection() {
    return (
        <>
            <div
                className="w-[40vw] h-[90vh] flex flex-col align-center justify-center text-center bg-white my-auto rounded text-black">
                <p>Welcome to the DARKAI Grillz Configurator</p>
                <p>Choose the grillz perfect for you!</p>
                <div className="flex">
                    <ToothConfig tooth='ilsdx'/>
                    <ToothConfig tooth='ilssx'/>
                </div>
            </div>

        </>
    )
}