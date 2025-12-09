import * as THREE from "three";

export default function getOrigin(mesh:any) {
    const box = new THREE.Box3().setFromObject(mesh);
    return box.getCenter(new THREE.Vector3());
}