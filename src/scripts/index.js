import '../styles/index.scss';

import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * .9, window.innerHeight * .9);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);

var controls = new OrbitControls(camera, renderer.domElement);

var scene = new THREE.Scene();

scene.background = new THREE.Color(0x857738);
scene.fog = new THREE.Fog(scene.background, 1, 5000);

const svgMarkup = '<svg><path d="M15 0 L7 20 L22 20 Z" /></svg>';
const loader = new SVGLoader();
const svgData = loader.parse(svgMarkup);
var material = new THREE.MeshPhongMaterial({ color: 0x999999 });

const svgGroup = new THREE.Group();
svgData.paths.forEach((path, i) => {
    const shapes = path.toShapes(true);
  
    // Each path has array of shapes
    shapes.forEach((shape, j) => {
      // Finally we can take each shape and extrude it
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 20,
        bevelEnabled: false
      });
  
      // Create a mesh and add it to the group
      const mesh = new THREE.Mesh(geometry, material);
  
      svgGroup.add(mesh);
    });
  });
scene.add(svgGroup);
// var material = new THREE.MeshPhongMaterial({ color: 0x999999 });
// var shape = new THREE.Shape();
// shape.moveTo(0, 0);
// shape.lineTo(0, width);
// shape.lineTo(length, width);
// shape.lineTo(length, 0);
// shape.lineTo(0, 0);

// var extrudeSettings = {
//     steps: 1,
//     depth: width,
//     bevelEnabled: false
// };

// var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
// var mesh = new THREE.Mesh(geometry, material);

// var light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(-1, 2, 4);


// scene.add(light);
// scene.add(mesh);

function render(time) {
    time *= 0.001;  // convert time to seconds
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

