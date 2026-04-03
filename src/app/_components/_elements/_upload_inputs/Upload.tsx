import UploadFile from "@/app/_components/_elements/_upload_inputs/UploadFile";
import {useTeethStore} from "@/app/_stores/teeth";
import {State} from "@/app/_types/State";
export default function Upload() {
    const setScanImage = useTeethStore((state:State) => state.setScanImage);

    function getData(newFile:File) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(newFile);
        reader.onload = () => {
            setScanImage(reader.result as ArrayBuffer, newFile.type);
        };
    }

    return(
        <>
            <div className="w-full flex gap-2 mb-2">
                <UploadFile theme="dark" sendData={getData}/>
                <div className="pl-6 pr-4 py-4 rounded border border-gray-950/[33%] w-[66%] h-[100px] lg:h-[176px]">
                    <div className="flex lg:items-center lg:justify-center h-full overflow-y-auto text-center pr-2">
                        <p> If you don't have your dental scan right now, you can still proceed with checkout.
                            You can send us your dental scan in .stl format later at <br/>
                            <span className="font-semibold">support@darkai-lab.com</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full text-center rounded border border-red-500 bg-red-500/25 px-6 py-4">
                <p>Reminder: to create your dental jewels we must have your dental scan</p>
            </div>
        </>
    )
}