import * as THREE from "three";
export default function resetUvs( geometry: THREE.BufferGeometry, molar:boolean, type?:string, side?:'sx'|'dx' )
{
    const pos = geometry.getAttribute( 'position' ),
        uvs = geometry.getAttribute( 'uv' );

    for( let i= 0; i < pos.count; i++ )
    {
        let x,y,z;

        if(type === 'cross' || type === 'tribal'){
            x = pos.getX(i) / 2;
            y = pos.getY(i) / 2;
            z = pos.getZ(i) / 4;
        } else if(type === 'barDC') {
            x = pos.getX(i) / 40;
            y = pos.getY(i) / 40;
            z = pos.getZ(i) / 40
        } else if(type === 'barDC_lat') {
            x = pos.getX(i) / 30;
            y = pos.getY(i) / 30;
            z = pos.getZ(i) / 30
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