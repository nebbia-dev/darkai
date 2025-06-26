import ToothConfig from "@/app/components/ToothConfig";

export default function Selection() {
    return (
        <>
            <div
                className="w-[40vw] h-[90vh] flex flex-col align-center justify-center text-center bg-white my-auto rounded text-black">
                <p>Welcome to the DARKAI Grillz Configurator</p>
                <p>Choose the grillz perfect for you!</p>
                <div className="flex flex-wrap overflow-y-auto">
                    {/*DENTI SUPERIORI*/}
                    <ToothConfig tooth='icsdx'/>
                    <ToothConfig tooth='icssx'/>
                    <ToothConfig tooth='ilsdx'/>
                    <ToothConfig tooth='ilssx'/>
                    <ToothConfig tooth='csdx'/>
                    <ToothConfig tooth='cssx'/>
                    {/*DENTI INFERIORI*/}
                    <ToothConfig tooth='icidx'/>
                    <ToothConfig tooth='icisx'/>
                    <ToothConfig tooth='ilidx'/>
                    <ToothConfig tooth='ilisx'/>
                    <ToothConfig tooth='cidx'/>
                    <ToothConfig tooth='cisx'/>
                </div>
            </div>

        </>
    )
}