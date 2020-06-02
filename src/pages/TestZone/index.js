import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import redAttackDie from './blender/redAttackDie.glb';
import blackAttackDie from './blender/blackAttackDie.glb';
import whiteAttackDie from './blender/whiteAttackDie.glb';

function createScene() {
  const scene = new THREE.Scene();
  return scene;
}

function createCamera(scene) {
  const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  camera.position.set(5, 5, 5);
  scene.add(camera);
  return camera;
}

function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaOutput = true;
  return renderer;
}

function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  return controls;
}

function addObject(scene, object) {
  const handleLoad = gltf => {
    const mesh = gltf.scene;
    scene.add(mesh)
  };
  const loader = new GLTFLoader();
  loader.load(object, handleLoad);
}

function addLights(scene, camera) {
  const pointLight = new THREE.DirectionalLight(0xffffff, 5);
  camera.add(pointLight);
}

function init() {
  const scene = createScene();
  const camera = createCamera(scene);
  const renderer = createRenderer();
  const controls = createControls(camera, renderer);
  addLights(scene, camera);
  addObject(scene, redAttackDie);
  addObject(scene, blackAttackDie);
  addObject(scene, whiteAttackDie);
  const animate = () => {
    requestAnimationFrame(animate);
  	controls.update();
  	renderer.render(scene, camera);
  };
  document.getElementById('three').appendChild(renderer.domElement);
  animate();
}

function Info() {
  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ padding: 8, display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
      <div id="three" />
    </div>
  );
};

export default Info;
