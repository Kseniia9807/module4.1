import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const modelPaths = [
  '3Dmodels/instrumentrender6.glb',
  '3Dmodels/audio2.glb',
  '3Dmodels/instrument6.3.glb',
  '3Dmodels/instrumentrender6.glb',
];

const numModels = modelPaths.length;
let currentModelIndex = 0;

const modelContainers = Array.from(document.querySelectorAll('.model-container'));

if (modelContainers.length !== numModels) {
    console.error("Mismatch between number of model containers in HTML and numModels.");
}

const scenes = [];
const renderers = [];
const cameras = [];
const controls = [];
const modelMeshes = [];

 const modelParams = [
  {
    cameraPos: new THREE.Vector3(4, 5, 11),
    lightPos: new THREE.Vector3(0, 25, 0),
    modelPos: new THREE.Vector3(-0.5, 1.05, 0), 
    modelRotation: new THREE.Euler(-0.3, 0.3, 0.1),
  },
  {
    cameraPos: new THREE.Vector3(7, 2, 15),
    lightPos: new THREE.Vector3(10, 25, 10),
    modelPos: new THREE.Vector3(0, 0.9, 0), 
    modelRotation: new THREE.Euler( 0, -1.1, 0.1),
  },
  {
    cameraPos: new THREE.Vector3(0, 5, 10),
    lightPos: new THREE.Vector3(5, 25, 18),
    modelPos: new THREE.Vector3(0, -0.5, 0),
    modelRotation: new THREE.Euler(-0.3, 0, 0),
  },
    {
    cameraPos: new THREE.Vector3(2, 8, 5),
    lightPos: new THREE.Vector3(-3, 20, 2),
    modelPos: new THREE.Vector3(-1, 1, 0), 
    modelRotation: new THREE.Euler(-0.5, -0.2, 0),
  },
  
];


function initThreeScene(container, index) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xF5F5F5);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);

    let controlObject;

    if (index >= 0 && index < modelParams.length) {
        camera.position.copy(modelParams[index].cameraPos);

        controlObject = new OrbitControls(camera, renderer.domElement);
        controlObject.enableDamping = true;
        controlObject.enablePan = false;
        controlObject.minDistance = 5;
        controlObject.maxDistance = 20;
        controlObject.minPolarAngle = 0.5;
        controlObject.autoRotate = false;
        controlObject.target = new THREE.Vector3(0, 1, 0);
        controlObject.update();

        const spotLight = new THREE.SpotLight(0xffffff, 900, 100, 0.22, 1);
        spotLight.position.copy(modelParams[index].lightPos);
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0001;
        scene.add(spotLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 50);
        scene.add(ambientLight);
    } else {
        console.error(`Invalid model index: ${index}`);
    }

    return { renderer, scene, camera, controls: controlObject };
}




function loadModel(index, scene) {
  const loader = new GLTFLoader();
  loader.load(modelPaths[index], (gltf) => {
    const mesh = gltf.scene;
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

   
    if (index < modelParams.length) {
      mesh.position.copy(modelParams[index].modelPos);
      mesh.rotation.copy(modelParams[index].modelRotation);
    }

    scene.add(mesh);
    modelMeshes[index] = mesh;
    renderers[index].render(scene, cameras[index]);
  }, undefined, (error) => {
      console.error("Error loading model:", error);
  });
}



modelContainers.forEach((container, index) => {
  const { renderer, scene, camera, controls: controlObject } = initThreeScene(container, index); // Pass the index
  renderers.push(renderer);
  scenes.push(scene);
  cameras.push(camera);
  controls.push(controlObject);
  loadModel(index, scene);
});



function showModel(index) {
  modelContainers.forEach((container, i) => {
    container.style.display = i === index ? 'block' : 'none';
  });
}


document.getElementById('nextButton').addEventListener('click', () => {
  currentModelIndex = (currentModelIndex + 1) % numModels;
  showModel(currentModelIndex);
});

document.getElementById('prevButton').addEventListener('click', () => {
  currentModelIndex = (currentModelIndex - 1 + numModels) % numModels;
  showModel(currentModelIndex);
});

showModel(0);



function animate() {
  requestAnimationFrame(animate);
  const visibleIndex = modelContainers.findIndex(c => c.style.display !== 'none');
    if (visibleIndex !== -1) {
        controls[visibleIndex].update();
        renderers[visibleIndex].render(scenes[visibleIndex], cameras[visibleIndex]);
    }
}

animate();



