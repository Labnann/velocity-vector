import * as THREE from "three";
import {
    DirectionalLight,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Renderer,
    Scene,
    SphereBufferGeometry,
    Vector3,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "dat.gui";
import {createReferenceFrame} from "./createReferenceFrame";


const camera = new PerspectiveCamera(40, 2, 0.1, 2000);
const controls = new OrbitControls(camera, document.querySelector("#c") as HTMLCanvasElement);
const gui = new GUI();

controls.target.set(0, 5, 0);
controls.update();


camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const scene = new Scene();

const sphere = new Mesh(new SphereBufferGeometry(20, 1000), new MeshBasicMaterial({color: 0x449900}));

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



class RenderHandler{

    private canvas = document.querySelector("#c") as HTMLCanvasElement;
    private renderer = new WebGLRenderer({canvas:this.canvas});
    private scene;
    private camera;

    constructor(scene: Scene, camera: PerspectiveCamera) {
        this.scene = scene;
        this.camera = camera;
    }


     render =()=> {


        if (resizeRendererToDisplaySize(this.renderer)) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        sphere.position.add(velocity)

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render);
    }


}

const renderHandler = new RenderHandler(scene,camera);
renderHandler.render()






