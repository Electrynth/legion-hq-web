import React, { useEffect } from 'react';
import * as THREE from 'three';
import face from 'static/hit.jpg';
// import flower from 'static/flower.jpg';

function createMesh() {
  const loader = new THREE.TextureLoader();
  // const loader = new THREE.ImageLoader();
  const image1 = loader.load(face);
  const image2 = loader.load(face);
  const image3 = loader.load(face);
  const image4 = loader.load(face);
  const image5 = loader.load(face);
  const image6 = loader.load(face);
  const image7 = loader.load(face);
  const image8 = loader.load(face);
  const material = new THREE.MeshBasicMaterial({ map: image1 });
  let materials = [
    material,material,material,material,
    material,material,material,material
  ];
  const geometry = new THREE.OctahedronBufferGeometry(1, 0);
  geometry.clearGroups();
  geometry.addGroup(0, 3, 0);
  geometry.addGroup(3, 3, 1);
  geometry.addGroup(6, 3, 2);
  geometry.addGroup(9, 3, 3);
  geometry.addGroup(12, 3, 4);
  geometry.addGroup(15, 3, 5);
  geometry.addGroup(18, 3, 6);
  geometry.addGroup(21, 3, 7);
  geometry.faceVertexUvs = [[
    [ new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(1,1) ],
    [ new THREE.Vector2(0,0), new THREE.Vector2(1,1), new THREE.Vector2(1,0) ],
    [ new THREE.Vector2(0,0), new THREE.Vector2(1,0), new THREE.Vector2(0.5,1) ],
    [ new THREE.Vector2(1,0), new THREE.Vector2(0,0), new THREE.Vector2(0.5,1) ],
    [ new THREE.Vector2(0,0), new THREE.Vector2(1,0), new THREE.Vector2(0.5,1) ],
    [ new THREE.Vector2(1,0), new THREE.Vector2(0,0), new THREE.Vector2(0.5,1) ],
  ]]
  const mesh = new THREE.Mesh(geometry, materials);
  return mesh;
}

function init() {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('three').appendChild(renderer.domElement);
  const mesh = createMesh();
  scene.add(mesh);
  const animate = function () {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
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
}

export default Info;

// function Info2() {
//   useEffect(() => {
//     const loader = new THREE.TextureLoader();
//     const texture0 = loader.load(face);
//     const geometry = new THREE.OctahedronBufferGeometry(1, 0);
//     geometry.clearGroups();
//     geometry.addGroup(0, 3, 0);
//     geometry.addGroup(3, 3, 1);
//     geometry.addGroup(6, 3, 2);
//     geometry.addGroup(9, 3, 3);
//     geometry.addGroup(12, 3, 4);
//     geometry.addGroup(15, 3, 5);
//     geometry.addGroup(18, 3, 6);
//     geometry.addGroup(21, 3, 7);
//
//     // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const materials = new THREE.MeshFaceMaterial([
//       new THREE.MeshBasicMaterial({ color: 'red' }),
//       new THREE.MeshBasicMaterial({ color: 'orange' }),
//       new THREE.MeshBasicMaterial({ color: 'yellow' }),
//       new THREE.MeshBasicMaterial({ color: 'green' }),
//       new THREE.MeshBasicMaterial({ color: 'blue' }),
//       new THREE.MeshBasicMaterial({ color: 'purple' }),
//       new THREE.MeshBasicMaterial({ color: 'pink' }),
//       new THREE.MeshBasicMaterial({ map: texture0 })
//     ]);
//     const mesh = new THREE.Mesh(geometry, materials);
//     scene.add(mesh);
//     const animate = function () {
//       requestAnimationFrame(animate);
//       mesh.rotation.x += 0.01;
//       mesh.rotation.y += 0.01;
//       renderer.render(scene, camera);
//     };
//     animate();
//   }, []);
//   return (
//     <div style={{ padding: 8, display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
//       <div id="three" />
//     </div>
//   );
// }
