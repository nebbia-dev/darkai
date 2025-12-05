import * as THREE from "three";
export default function resetUvs( geometry: THREE.BufferGeometry, molar:boolean, signature?:string, side?:'sx'|'dx' )
{
    const pos = geometry.getAttribute( 'position' ),
        uvs = geometry.getAttribute( 'uv' );

    for( let i= 0; i < pos.count; i++ )
    {
        let x,y,z;

        if(signature === 'cross' || signature === 'tribal'){
            x = pos.getX(i) / 2;
            y = pos.getY(i) / 2;
            z = pos.getZ(i) / 4
        } else {
            x = pos.getX(i) / 4;
            y = pos.getY(i) / 4;
            z = pos.getZ(i) / 4;

            if(side === 'dx') {
                // vamp canine dx
                z -= x/4;
                y -= x/4;
            } else if(side === 'sx') {
                // vamp canine sx
                z += x/4;
                y += x/4;
            }
        }

        if(molar) {
            uvs.setXY( i, z, y );
        } else {
            uvs.setXY( i, x, y );
        }
    }

    uvs.needsUpdate = true;
}