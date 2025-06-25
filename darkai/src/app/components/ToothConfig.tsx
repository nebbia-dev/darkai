import {useTeethStore} from "@/app/stores/teeth";
import DiamondToggler from "@/app/components/DiamondToggler";

export default function ToothConfig({tooth}) {
    const changeMaterial = useTeethStore((state) => state.setMaterial);
    const changeJewelType = useTeethStore((state) => state.setType);
    console.log('oh no')
    return (
        <div>
            <div className="p-4">
                <p className="text-left">{tooth.toUpperCase()} Material</p>
                <div className="w-[48px] h-[48px] bg-yellow-200"
                     onClick={() => changeMaterial(tooth, 'gold')}></div>
                <div className="w-[48px] h-[48px] bg-pink-300"
                     onClick={() => changeMaterial(tooth, 'rose')}></div>
                <div className="w-[48px] h-[48px] bg-zinc-400"
                     onClick={() => changeMaterial(tooth, 'white')}></div>
                <DiamondToggler tooth={tooth}/>
            </div>
            <div className="p-4">
                <p className="text-left">{tooth.toUpperCase()} Geometry</p>
                <div className="w-[48px] h-[48px]"
                     onClick={() => changeJewelType(tooth, 'full')}>Full
                </div>
                {(tooth === 'ilsdx' || tooth === 'ilssx') &&
                    <div className="w-[48px] h-[48px]"
                      onClick={() => changeJewelType(tooth, 'bar')}>Bar
                    </div>
                }
                {(tooth === 'csdx' || tooth === 'cssx' || tooth === 'cidx' || tooth === 'cisx') &&
                    <div className="w-[48px] h-[48px]"
                         onClick={() => changeJewelType(tooth, 'frame')}>Frame
                    </div>
                }
            </div>
        </div>
)
}