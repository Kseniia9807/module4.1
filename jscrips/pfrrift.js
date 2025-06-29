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
camera.position.set(4, 5, 16);
 

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;

controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
//groundMesh.receiveShadow = true;
//scene.add(groundMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 8, 100, 0.22, 1);
directionalLight.position.set(0.75, 3.71518, 1.027);
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.0001;
scene.add(directionalLight);
//const ambientLight = new THREE.AmbientLight(0x404040, 10, 100, 0.22, 1); // Soft gray ambient light
//ambientLight.castShadow = true;
//ambientLight.position.set()
   //scene.add(ambientLight);
   const spotLight = new THREE.SpotLight(0xffffff, 1, 100, 0.22, 1);
   spotLight.position.set(0, 40, 0);
   spotLight.castShadow = true;
   spotLight.shadow.bias = -0.0001;
   scene.add(spotLight);
   const ambientLight = new THREE.AmbientLight(0x404040, 9, 100, 0.22, 1); // Soft gray ambient light
      scene.add(ambientLight);


const loader = new GLTFLoader().setPath('');
loader.load('3Dmodels/audio2.glb', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

 

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  //mesh.position.set(3, 1.05, 0);
  mesh.rotation.set( 0, -1.4, 0.2)
  scene.add(mesh);
  


  

 
  


});


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  pivot.rotation.y += 0.01;
}

animate();