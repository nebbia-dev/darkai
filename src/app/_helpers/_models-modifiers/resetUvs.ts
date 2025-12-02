import * as THREE from "three";
export default function resetUvs( geometry: THREE.BufferGeometry )
{
    const pos = geometry.getAttribute( 'position' ),
        nor = geometry.getAttribute( 'normal' ),
        uvs = geometry.getAttribute( 'uv' );

    for( let i= 0; i < pos.count; i++ )
    {
        let x = pos.getX(i) / 5,
            y = pos.getY(i) / 5

        uvs.setXY( i, y, x );
    }

    uvs.needsUpdate = true;
}