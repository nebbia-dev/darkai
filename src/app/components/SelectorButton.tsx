export default function SelectorButton({click, disabled, selection, adjust, active} : {click: () => void, disabled: boolean, selection: string, adjust: boolean, active: boolean}) {
    return (
        <button type="button" className={`rounded-2xl ${active ? 'bg-stone-400' : 'bg-stone-200'} pb-2 px-1 pt-1 cursor-pointer`}
                onClick={click}
                disabled={disabled}
        >
            <img src={`/optionsIcons/${selection}.webp`} alt={`${selection} texture`} className={`${adjust ? 'w-[103px] h-[84px] object-cover' : ''} ${disabled ? 'opacity-50' : ''} bg-gray-50 rounded-2xl`}/>
            <span className={`pt-2 inline-block ${disabled ? 'text-stone-400' : 'text-gray-950'}`}>{selection[0].toUpperCase() + selection.slice(1)}</span>
        </button>
    )
}