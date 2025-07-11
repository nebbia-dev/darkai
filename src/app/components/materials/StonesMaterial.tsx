'use client'

import {useTeethStore} from "@/app/stores/teeth";

export default function StonesMaterial({color}) {
    const envMap = useTeethStore((state) => state.envMap);
        return (<meshBasicMaterial
            color={color === 'sapphire'
                ? 0x5773ff
                : color === 'ruby'
                    ? 0x9d0633
                    : color === 'amethyst'
                        ? 0x6c2593
                        : 0x0f6151}
            reflectivity={1}
            refractionRatio={1}
            envMap = {envMap}
            onUpdate={(self) => (self.needsUpdate = true)}
            attach='material'
        />)
    }