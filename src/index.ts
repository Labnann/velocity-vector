import * as THREE from "three";
import {DirectionalLight, PerspectiveCamera, Scene, Vector3} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "dat.gui";
import {createReferenceFrame} from "./createReferenceFrame";
import {RenderHandler} from "./renderHandler";
import {SphereObject} from "./sphereObject";


const camera = new PerspectiveCamera(40, 2, 0.1, 2000);
const controls = new OrbitControls(camera, document.querySelector("#c") as HTMLCanvasElement);
const gui = new GUI();

controls.target.set(0, 5, 0);
controls.update();


camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const scene = new Scene();

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




const renderHandler = new RenderHandler(scene,camera);
renderHandler.addRenderable(sphereObject);

renderHandler.render()






