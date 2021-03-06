import * as _ from "lodash";
import {Scene,PerspectiveCamera,WebGLRenderer,BoxGeometry,MeshBasicMaterial,Mesh} from "three";

import './../styles/main.css';
import './../styles/appStyles.scss';

const scene = new Scene();

var camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//create the cube
var geometry = new BoxGeometry(1, 1, 1);
var material = new MeshBasicMaterial({ color: 0x00ff00 });
var cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

//animate the scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  renderer.render(scene, camera);
}
animate();
