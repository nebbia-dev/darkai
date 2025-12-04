import * as THREE from "three";
export default function resetUvs( geometry: THREE.BufferGeometry, molar:boolean )
{
    const pos = geometry.getAttribute( 'position' ),
        uvs = geometry.getAttribute( 'uv' );

    for( let i= 0; i < pos.count; i++ )
    {
        let x = pos.getX(i) / 4,
            y = pos.getY(i) / 4,
            z = pos.getZ(i) / 4

        if(molar) {
            uvs.setXY( i, z, y );
        } else {
            uvs.setXY( i, x, y );
        }
    }

    uvs.needsUpdate = true;
}