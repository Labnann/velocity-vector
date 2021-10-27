import {PerspectiveCamera, Renderer, Scene, WebGLRenderer} from "three";
import {Renderable} from "./index";

export class RenderHandler {

    private _canvas = document.querySelector("#c") as HTMLCanvasElement;
    private _renderer = new WebGLRenderer({canvas: this._canvas});
    private readonly _scene;
    private readonly _camera;

    private _renderables: Renderable[] = []

    constructor(scene: Scene, camera: PerspectiveCamera) {
        this._scene = scene;
        this._camera = camera;
    }

    private _resizeRendererToDisplaySize(renderer: Renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }

        return needResize;
    }


    render = () => {


        if (this._resizeRendererToDisplaySize(this._renderer)) {
            const canvas = this._renderer.domElement;
            this._camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this._camera.updateProjectionMatrix();
        }


        this._renderer.render(this._scene, this._camera);
        this._updateRenderables();

        requestAnimationFrame(this.render);
    }

    private _updateRenderables() {
        this._renderables.forEach(renderable => {
            renderable.update()
        })
    }

    public addRenderable(renderable: Renderable) {
        this._renderables.push(renderable);
    }


}