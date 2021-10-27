import {Mesh, MeshBasicMaterial, SphereBufferGeometry, Vector3} from "three";
import {Renderable} from "./renderable";

export class SphereObject implements Renderable {
    private _sphere = new Mesh(new SphereBufferGeometry(20, 1000), new MeshBasicMaterial({color: 0x449900}));
    private _velocity = new Vector3(.1, .1, .1);

    setVelocity(vector3: Vector3) {
        this._velocity.set(vector3.x, vector3.y, vector3.z)
    }

    update() {
        this._sphere.position.add(this._velocity);
    }


    getSphere() {
        return this._sphere;
    }


}