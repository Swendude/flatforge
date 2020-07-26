import '../styles/index.scss';

import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { SVG } from '@svgdotjs/svg.js';

// CONFIG

let config = {
    defaultCameraPosition: [0, 0, 500],
    colors: {
        white: new THREE.Color(0xf8f8ff),
        blue: new THREE.Color(0x7575FF),
        black: new THREE.Color(0x000000),
        lblue: new THREE.Color(0xDBF1FF)
    },
    flatDesign: SVG('#flatDesign'),
    sunPosition: 0
};

// SETUP

// Create renderer and scale to window
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas'),
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a camera and point it towards the object
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
camera.position.set(...config.defaultCameraPosition);

// Add orbit controls
let controls = new OrbitControls(camera, renderer.domElement);

// Create our main scene
let scene = new THREE.Scene();

// Create some nice lights
const sun = new THREE.DirectionalLight(0xf2f2f0, 0.85);
sun.position.set(0, 80, 0);
const light = new THREE.DirectionalLight(0xf7f6e4, 0.35);
light.position.set(30, 80, 300);
scene.add(sun, light);

// Axes helpers
var axesHelper = new THREE.AxesHelper(camera.far);
scene.add(axesHelper);

// Add a skybox
scene.background = config.colors.white;

// Add a grid
const tenUnitsGrid = new THREE.GridHelper(400, 40, config.colors.lblue, config.colors.lblue);
tenUnitsGrid.rotateX(toRad(90));
scene.add(tenUnitsGrid);
const hunderdUnitsGrid = new THREE.GridHelper(400, 4, config.colors.blue, config.colors.blue);
hunderdUnitsGrid.rotateX(toRad(90));
scene.add(hunderdUnitsGrid);

// Convert degrees to radians
function toRad(deg) {
    return deg * (Math.PI / 180);
}

// SVG parsing and extruding
const loader = new SVGLoader();
loader.load('public/flatmen_base.svg',
    function (svgData) {
        var groupsgroup = new THREE.Group();
        var material = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });

        svgData.paths.forEach((path, i) => {
            config.flatDesign.svg(path.userData.node.outerHTML);
            var shapes = path.toShapes(true);
            var group = new THREE.Group();

            // Each path has array of shapes
            shapes.forEach((shape, j) => {
                console.dir(shape);
                // Finally we can take each shape and extrude it
                var geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 10,
                    bevelEnabled: false
                });
                // geometry.center();
                geometry.center();
                geometry.translate(0, 0, 5);

                // geometry.rotateZ(toRad(180));

                // Create a mesh and add it to the group
                var mesh = new THREE.Mesh(geometry, material);
                mesh.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));
                group.add(mesh);
            });
            groupsgroup.add(group);
        });
        scene.add(groupsgroup);
    },
    function (xhr) { },
    function (error) { console.log(error); });


// UPDATE
function render(time) {
    time *= 0.001;  // convert time to seconds
    controls.update();
    renderer.render(scene, camera);
    
    sun.position.x = 100 * Math.sin(config.sunPosition);
    sun.position.z = 100 * Math.cos(config.sunPosition);
    
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
    camera.position.set(...config.defaultCameraPosition);
});

document.getElementById('sunPosition').addEventListener('input', (value) => {
    config.sunPosition = toRad(value.srcElement.value);
});