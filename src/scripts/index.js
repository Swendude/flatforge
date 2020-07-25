import '../styles/index.scss';

import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

// SETUP

// Create renderer and scale to window
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas'),

});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a camera and point it towards the object
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
camera.position.set(0, 0, 500);

// Add orbit controls
let controls = new OrbitControls(camera, renderer.domElement);

// Create our main scene
let scene = new THREE.Scene();

// Create some nice lights
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(-1, 2, 4);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(2, 1, 4);
scene.add(light1, light2);

// Show the axes
var axesHelper = new THREE.AxesHelper(camera.far);
scene.add(axesHelper);

// Add a skybox
var texture = new THREE.TextureLoader().load("public/space.jpg");
scene.background = texture;

// Convert degrees to radians
function toRad(deg) {
    return deg * (Math.PI / 180);
}

// SVG parsing and extruding
const loader = new SVGLoader();
loader.load('public/flatmen_base.svg',
    function (svgData) {
        console.log("LOADED");
        const material = new THREE.MeshPhongMaterial({ color: 0xe0e0e0 });

        svgData.paths.forEach((path, i) => {
            const shapes = path.toShapes(true);
            console.log(shapes);
            // Each path has array of shapes
            shapes.forEach((shape, j) => {

                // Finally we can take each shape and extrude it
                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 20,
                    bevelEnabled: false
                });
                geometry.center();
                geometry.rotateZ(toRad(180));
                // Create a mesh and add it to the group
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
            });
        });
    },
    function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); },
    function (error) { console.log("Error!"); });


// UPDATE
function render(time) {
    time *= 0.001;  // convert time to seconds
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// EVENTS

// respond to window resizing
function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);
resize();

// handle reset view
document.getElementById('resetBtn').addEventListener('click', () => {
    camera.position.set(0, 0, 300);
});