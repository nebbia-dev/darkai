export default function SelectorButtonPill({click, disabled, selection, active, stones} : {click: () => void, disabled: boolean, selection: string, active: boolean, stones: boolean}) {
    return (
        <button
            className={`
            ${active ? 'bg-gray-950 text-gray-50' : disabled ? 'bg-stone-300 text-stone-400' : 'bg-gray-50 text-gray-950'} 
            ${stones ? 'h-[100%]' : 'h-[15%] min-w-[200px]'} 
            ${stones && selection === 'diamond' ? 'col-span-2' : ''} 
            rounded-full py-1 pr-1 pl-4 flex items-center justify-between gap-4 text-sm min-[400px]:text-base min-[600px]:text-lg min-[800px]:text-xl min-[900px]:text-2xl`}
            onClick={click}
            disabled={disabled}>
            {selection[0].toUpperCase() + selection.slice(1)}
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
                } ${disabled ? 'opacity-50' : ''} inline-block ${stones && selection !== 'diamond' ? 'h-full aspect-square' : 'w-full max-w-[50%] h-full'} rounded-full`}></span>
        </button>

)
}