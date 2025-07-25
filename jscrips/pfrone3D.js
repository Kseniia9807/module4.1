import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xF5F5F5);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;

controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

//const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
//groundGeometry.rotateX(-Math.PI / 2);
//const groundMaterial = new THREE.MeshStandardMaterial({
  //color: 0x555555,
  //side: THREE.DoubleSide
//});
//const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
//groundMesh.castShadow = false;
//groundMesh.receiveShadow = true;
//scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 900, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);
const ambientLight = new THREE.AmbientLight(0x404040, 50, 100, 0.22, 1); // Soft gray ambient light
   scene.add(ambientLight);

const loader = new GLTFLoader().setPath('');
loader.load('3Dmodels/instrumentrender6.glb', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

 

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(-0.5, 1.05, 0);
  mesh.rotation.set(-0.3, 0.3, 0.1)
  scene.add(mesh);

  

 
  

  // ** YOU MUST DETERMINE THIS VECTOR CORRECTLY **
  // This vector points from the model's center to its front face.
  // Experiment with different values to find the correct orientation for YOUR model.


  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

//window.addEventListener('resize', () => {
  //camera.aspect = window.innerWidth / window.innerHeight;
  //camera.updateProjectionMatrix();
  //renderer.setSize(window.innerWidth, window.innerHeight);
//});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();




