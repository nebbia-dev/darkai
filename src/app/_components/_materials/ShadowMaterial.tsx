import {useTexture} from "@react-three/drei";

export default function ShadowMaterial() {
    const shadow = useTexture({
        map: 'textures/dentiera_ombra.webp',
    });

    return(
        <meshBasicMaterial
            map={shadow.map}
            transparent={true}
            opacity={0.65}
        />
    )
}