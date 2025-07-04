export default function SelectorButtonPill({click, disabled, selection, adjust, active}) {
    return (
        <button
            className={`${active ? 'bg-gray-950 text-gray-50' : 'bg-gray-50 text-gray-950'} min-w-[200px] rounded-full py-1 pl-1 pr-3 flex items-center justify-between`}
            onClick={click}
            disabled={disabled}>
            <span
                className={`${
                    selection === 'gold' 
                        ? 'bg-yellow-200' 
                        : selection === 'rose' 
                            ? 'bg-pink-200' 
                            : selection === 'white' 
                                ? 'bg-zinc-200'
                                : selection === 'diamond'
                                    ? 'bg-orange-200'
                                    : selection === 'sapphire'
                                        ? 'bg-blue-500'
                                        : selection === 'ruby'
                                            ? 'bg-red-500'
                                            : selection === 'emerald'
                                                ? 'bg-emerald-500'
                                                : selection === 'amethyst'
                                                    ? 'bg-violet-500'
                                                    : 'border-1'
                } inline-block w-8 h-8 rounded-full`}></span>
            {selection[0].toUpperCase() + selection.slice(1)}
        </button>

)
}