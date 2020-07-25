import '../styles/index.scss';

import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

// setup
const renderer = new THREE.WebGLRenderer({
  canvas : document.getElementById('mainCanvas')
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
camera.position.set(0, 0, 300);
camera.lookAt(0, 0, 0);

let controls = new OrbitControls(camera, renderer.domElement);

let scene = new THREE.Scene();


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);

var axesHelper = new THREE.AxesHelper(camera.far);

scene.add(axesHelper);
scene.add(light);

var texture = new THREE.TextureLoader().load("public/space.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );
scene.background = texture;

function toRad(deg) {
  return deg * (Math.PI/180);
}

// SVG parsing an extruding
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
  function (xhr) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
  function (error) { console.log("Error!") ;});



//respond to window resizing
function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener("resize", resize, false);
resize();


// Update
function render(time) {
  time *= 0.001;  // convert time to seconds
  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

