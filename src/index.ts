import {
    DirectionalLight, Mesh,
    MeshBasicMaterial,
    PerspectiveCamera, PlaneBufferGeometry,
    Renderer, Scene,
    SphereBufferGeometry, Vector3,
    WebGLRenderer
} from "three";

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "dat.gui";

let canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new WebGLRenderer({canvas});
const camera = new PerspectiveCamera(40, 2, 0.1, 2000);
const controls = new OrbitControls(camera, renderer.domElement);
const gui = new GUI();

controls.target.set(0, 5, 0);
controls.update();


camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const scene = new Scene();

const sphere = new Mesh(new SphereBufferGeometry(20, 1000), new MeshBasicMaterial({color: 0x449900}));
const createReferenceFrame = ()=>{
    const plane1 = new Mesh(new PlaneBufferGeometry(1000,1000,50,50), new MeshBasicMaterial({
        wireframe:true
    }));
    const plane2 = new Mesh(new PlaneBufferGeometry(1000,1000,50,50), new MeshBasicMaterial({
        wireframe:true
    }));
    plane2.rotation.x = (Math.PI/2)

    return {plane1,plane2}
}

const referencePlanes = createReferenceFrame()

scene.add(sphere,referencePlanes.plane1,referencePlanes.plane2);

{

    let light = new DirectionalLight("0xFFFFFF", 1);
    scene.add(light);
}


function resizeRendererToDisplaySize(renderer: Renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }

    return needResize;
}


const velocity = new Vector3(.1,.1,.1);

//@ts-ignore
window.velocity = velocity

//@ts-ignore
window.THREE = THREE


function render() {


    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    sphere.position.add(velocity)

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);


