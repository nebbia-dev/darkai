import * as THREE from "three";
export default function resetUvs( geometry: THREE.BufferGeometry )
{
    const pos = geometry.getAttribute( 'position' ),
        uvs = geometry.getAttribute( 'uv' );

    for( let i= 0; i < pos.count; i++ )
    {
        // standard
        let x = pos.getX(i) / 4,
            y = pos.getY(i) / 4

        uvs.setXY( i, x, y );
    }

    uvs.needsUpdate = true;
}