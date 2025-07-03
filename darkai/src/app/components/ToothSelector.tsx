import elabToothName from "@/app/helpers/elabToothName";

export default function ToothSelector({tooth, click, active}) {
    return(
        <button className={`${active ? 'bg-gray-50' : ''} p-[1rem] rounded-full cursor-pointer w-full`} onClick={click}>
            {tooth}
        </button>
    )
}