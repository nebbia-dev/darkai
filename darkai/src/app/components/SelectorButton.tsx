export default function SelectorButton({click, disabled, selection, adjust}) {
    return (
        <button className="rounded-2xl bg-stone-200 pb-2 px-1 pt-1"
                onClick={click}
                disabled={disabled}
        >
            <img src={`/png/${selection}.png`} alt={`${selection} texture`} className={`${adjust ? 'rounded-2xl w-[103px] h-[84px] object-cover' : ''}`}/>
            <span className="pt-2 inline-block">{selection[0].toUpperCase() + selection.slice(1)}</span>
        </button>
    )
}