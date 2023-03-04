import * as THREE from "three";
import {
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshToonMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
    'textures/environmentMaps/2/px.jpg',
    'textures/environmentMaps/2/nx.jpg',
    'textures/environmentMaps/2/py.jpg',
    'textures/environmentMaps/2/ny.jpg',
    'textures/environmentMaps/2/pz.jpg',
    'textures/environmentMaps/2/nz.jpg',
])
const gradient3 = textureLoader.load("/textures/gradients/3.jpg");
const gradient5 = textureLoader.load("/textures/gradients/5.jpg");
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");

/**
 * Debug
 */

const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color.set('pink')
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;

// const material = new THREE.MeshMatcapMaterial
// material.matcap = matcapTexture;
// material.side = THREE.DoubleSide;
// material.wireframe = true;
// material.flatShading = true;

// const material = new THREE.MeshDepthMaterial();

// const material = new MeshLambertMaterial();

// const material = new MeshPhongMaterial();
// material.shininess = 11
// material.specular = new THREE.Color('red');

// gradient3.minFilter = THREE.NearestFilter;
// gradient3.magFilter = THREE.NearestFilter;
// const material = new MeshToonMaterial();
// material.gradientMap = gradient5;
// gradient5.magFilter = THREE.NearestFilter;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
// material.aoMap = doorAmbientOcclusionTexture;
// material.map = doorColorTexture;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.normalScale.set(0.5, 0.5)
material.envMap = environmentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, 'aoMapIntensity').min(0).max(1).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);
// gui.add(material, 'normalScale').min(0).max(1).step(0.0001);
console.log(material)




const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);

sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xfffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

sphere.position.x = -1.5;
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
//   sphere.rotation.y = 0.1 * elapsedTime;
//   plane.rotation.y = 0.1 * elapsedTime;
//   torus.rotation.y = 0.1 * elapsedTime;

//   sphere.rotation.x = 0.15 * elapsedTime;
//   plane.rotation.x = 0.15 * elapsedTime;
//   torus.rotation.x = 0.15 * elapsedTime;
  // Update controls
  controls.update();
//   material.displacementScale = Math.abs(Math.cos(elapsedTime * 2)) * 0.25

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
