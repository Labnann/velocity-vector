import {Mesh, MeshBasicMaterial, PlaneBufferGeometry} from "three";

export const createReferenceFrame = () => {
    const plane1 = new Mesh(new PlaneBufferGeometry(1000, 1000, 50, 50), new MeshBasicMaterial({
        wireframe: true
    }));
    const plane2 = new Mesh(new PlaneBufferGeometry(1000, 1000, 50, 50), new MeshBasicMaterial({
        wireframe: true
    }));
    plane2.rotation.x = (Math.PI / 2)

    return {plane1, plane2}
}