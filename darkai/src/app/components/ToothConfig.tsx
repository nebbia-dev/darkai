import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";
import StoneSelector from "@/app/components/StoneSelector";

export default function ToothConfig({tooth}) {
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    const changeJewelType = useTeethStore((state) => state.setType);
    let title;

    if(tooth.length === 4) {
        title = 'Canino';

        if(tooth[1] === 's') {
            title += ' superiore';
        } else {
            title += ' inferiore';
        }

        if(tooth[2] === 'd') {
            title += ' destro';
        } else {
            title += ' sinistro';
        }

    } else if(tooth.length === 5) {
        title = 'Incisivo';

        if(tooth[1] === 'c') {
            title += ' centrale';
        } else {
            title += ' laterale';
        }

        if(tooth[2] === 's') {
            title += ' superiore';
        } else {
            title += ' inferiore';
        }

        if(tooth[3] === 'd') {
            title += ' destro';
        } else {
            title += ' sinistro';
        }
    }

    console.log('oh no')
    return (
        <div className="w-100">
            <h3 className="text-left px-4 font-bold">{title}</h3>
            <div className="w-100 flex gap-8">
                <div className="p-4">
                    <p className="text-left">Base</p>
                    <div className="w-[48px] h-[48px] bg-yellow-200"
                         onClick={() => changeMaterial(tooth, 'gold')}></div>
                    <div className="w-[48px] h-[48px] bg-pink-300"
                         onClick={() => changeMaterial(tooth, 'rose')}></div>
                    <div className="w-[48px] h-[48px] bg-zinc-400"
                         onClick={() => changeMaterial(tooth, 'white')}></div>
                    <DiamondToggler tooth={tooth}/>
                </div>
                <div className="p-4 whitespace-nowrap">
                    <p className="text-left">Jewel</p>
                    <div className="w-[48px] h-[48px]"
                         onClick={() => changeJewelType(tooth, 'full')}>Full
                    </div>
                    {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                        <div className="w-[48px] h-[48px]"
                          onClick={() => changeJewelType(tooth, 'bar')}>Bar
                        </div>
                    }
                    {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                        <>
                            <div className="w-[48px] h-[48px]"
                                 onClick={() => changeJewelType(tooth, 'frame')}>Frame
                            </div>
                        </>
                    }
                    {(tooth === 'cidx' || tooth === 'cisx') &&
                        <>
                            <div className="w-[48px] h-[48px]"
                                 onClick={() => changeJewelType(tooth, 'bigBar')}>Big Bar
                            </div>
                        </>
                    }
                </div>
                {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                    <div className="p-4">
                        <p className="text-left">Stones</p>
                        <StoneSelector tooth={tooth}/>
                    </div>
                }
            </div>
        </div>
)
}
