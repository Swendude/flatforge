import '../styles/index.scss';

import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { SVG } from '@svgdotjs/svg.js';
import * as SVGSon from 'svgson';
import { parsePathNode } from './parse.js';

// CONFIG

let config = {
    defaultCameraPosition: [0, 0, 500],
    colors: {
        white: new THREE.Color(0xf8f8ff),
        blue: new THREE.Color(0x7575FF),
        black: new THREE.Color(0x000000),
        lblue: new THREE.Color(0xDBF1FF)
    },
    flatDesign: SVG('#flatDesign')
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
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(-1, 2, 4);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(2, 1, 4);
scene.add(light1, light2);

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

function findPaths(svgJson) {
    let paths = [];
    for (const i in svgJson.children) {
        let child = svgJson.children[i];
        if (child.name == 'path') {
            paths.push(svgJson.children[i]);
        }
        if (child.children) {
            paths = paths.concat(findPaths(child));
        }
    }
    return paths;
};

// SVG parsing and extruding
const loader = new THREE.FileLoader();
const svgLoader = new SVGLoader();
loader.load('public/flatmen_base.svg',
    function (svgData) {
        let material = new THREE.MeshPhongMaterial({ color: 0xe0e0e0 });
        SVGSon.parse(svgData).then(function (svgJson) {
            let paths = [];
            svgJson = svgJson;
            paths = findPaths(svgJson);
            paths.forEach((pathJson, i) => {
                let pathShape = parsePathNode(pathJson.attributes.d);
                pathShape.toShapes().forEach((shape, j) => {
                    let geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 10,
                    bevelEnabled: false
                    });
                    geometry.center();
                    geometry.translate(0, 0, 10 * i);
                    let mesh = new THREE.Mesh(geometry, material);
                    mesh.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));
                    scene.add(mesh);
                });
            });
        }, function () {
            console.log("Error in svg!");
        });

        // svgData.paths.forEach((path, i) => {
        //     config.flatDesign.svg(path.userData.node.outerHTML);
        //     let shapes = path.toShapes(true);
        //     let group = new THREE.Group();

        //     // Each path has array of shapes
        //     shapes.forEach((shape, j) => {
        //         // Finally we can take each shape and extrude it
        //         let geometry = new THREE.ExtrudeGeometry(shape, {
        //             depth: i + 10,
        //             bevelEnabled: false
        //         });
        //         geometry.center();
        //         geometry.translate(0, 0, 5 + i);

        //         // Create a mesh and add it to the group
        //         let mesh = new THREE.Mesh(geometry, material);
        //         mesh.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));
        //         group.add(mesh);
        //     });
        //     groupsgroup.add(group);
        // });
        // scene.add(groupsgroup);
    },
    function (xhr) { },
    function (error) { console.log(error); });


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
    camera.position.set(...config.defaultCameraPosition);
});