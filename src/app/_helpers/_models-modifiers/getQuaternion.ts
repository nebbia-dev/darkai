import * as THREE from "three";

export default function getQuaternion(mesh:any, upper:boolean, pave?:boolean|undefined, central?:boolean|undefined) {
    const quat = mesh.getWorldQuaternion(new THREE.Quaternion());
    const quat2 = new THREE.Quaternion(quat.x, quat.z, -quat.y, quat.w);
    // per gli upper -1.58, per i lower -1.59
    if(upper) {
        if(pave && central) {
            mesh.rotation.x = -1.57;
        } else if(pave && !central) {
            mesh.rotation.x = -1.56;
        } else {
            mesh.rotation.x = -1.58;
        }
    } else {
        if(pave) {
            mesh.rotation.x = -1.61;
        } else {
            mesh.rotation.x = -1.59;
        }
    }
    return quat2;
}