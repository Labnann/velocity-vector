import * as THREE from "three";
import {
    DirectionalLight,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    SphereBufferGeometry,
    Vector3
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "dat.gui";
import {createReferenceFrame} from "./createReferenceFrame";
import {RenderHandler} from "./renderHandler";


const camera = new PerspectiveCamera(40, 2, 0.1, 2000);
const controls = new OrbitControls(camera, document.querySelector("#c") as HTMLCanvasElement);
const gui = new GUI();

controls.target.set(0, 5, 0);
controls.update();


camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const scene = new Scene();

class SphereObject implements Renderable{
    private _sphere = new Mesh(new SphereBufferGeometry(20, 1000), new MeshBasicMaterial({color: 0x449900}));
    private _velocity = new Vector3(.1,.1,.1);

    setVelocity(vector3 :Vector3){
        this._velocity.set(vector3.x,vector3.y,vector3.z)
    }

    update() {
        this._sphere.position.add(this._velocity);
    }



    getSphere(){
        return this._sphere;
    }


}

const sphereObject = new SphereObject();

const sphere = sphereObject.getSphere();

const referencePlanes = createReferenceFrame()

scene.add(sphere,referencePlanes.plane1,referencePlanes.plane2);

{

    let light = new DirectionalLight("0xFFFFFF", 1);
    scene.add(light);
}





const velocity = new Vector3(.1,.1,.1);

//@ts-ignore
window.velocity = velocity

//@ts-ignore
window.THREE = THREE

export interface Renderable{
    update():void
}




const renderHandler = new RenderHandler(scene,camera);
renderHandler.addRenderable(sphereObject);

renderHandler.render()






