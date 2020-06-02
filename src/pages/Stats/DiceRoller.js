import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import redAttackDie from 'static/blender/redAttackDie.glb';
import blackAttackDie from 'static/blender/blackAttackDie.glb';
import whiteAttackDie from 'static/blender/whiteAttackDie.glb';

// class DiceRoller {
//   init() {
//     this.objects = [];
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(
//       75, window.innerWidth / window.innerHeight, 0.1, 1000
//     );
//     this.camera.position.z = 10;
//     this.scene.add(this.camera);
//     this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     this.renderer.gammaOutput = true;
//     this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//     this.controls.enableDamping = true;
//     this.controls.dampingFactor = 0.25;
//     this.controls.enableZoom = true;
//     this.camera.add(new THREE.DirectionalLight(0xffffff, 5));
//     const animate = () => {
//       requestAnimationFrame(animate);
//       this.fixMeshes();
//     	this.controls.update();
//     	this.renderer.render(this.scene, this.camera);
//     };
//     document.getElementById('three').appendChild(this.renderer.domElement);
//     animate();
//   }
//   fixMeshes() {
//     const offset = -3;
//     if (this.objects.length > 0) {
//       for (let i = 0; i < this.objects.length; i++) {
//         const mesh = this.objects[i];
//         mesh.position.x = (3 * i) + offset;
//         mesh.rotation.x += 0.05
//         mesh.rotation.y += 0.025
//       }
//     }
//   }
//   addObjectToScene(object) {
//     const handleLoad = gltf => {
//       const mesh = gltf.scene;
//       this.objects.push(mesh);
//       this.scene.add(mesh);
//     }
//     const loader = new GLTFLoader();
//     loader.load(object, handleLoad);
//   }
// };
// function Stats() {
//   const diceRoller = new DiceRoller();
//   useEffect(() => {
//     diceRoller.init();
//     diceRoller.addObjectToScene(redAttackDie);
//     diceRoller.addObjectToScene(blackAttackDie);
//     diceRoller.addObjectToScene(whiteAttackDie);
//   }, [diceRoller]);
//   return <div id="three" />;
// }

const maxRedLoops = 50;
const maxBlackLoops = 100;
const maxWhiteLoops = 150;
let redLoops = 0;
let blackLoops = 0;
let whiteLoops = 0;

function getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }

function getRandomSmallInt() { return Math.random(); }

class Stats extends React.Component {
  componentDidMount() {
    this.redAttackDice = [];
    this.blackAttackDice = [];
    this.whiteAttackDice = [];
    const { numRedAttack, numBlackAttack, numWhiteAttack } = this.props;
    this.sceneSetup();
    this.setupLights();
    for (let i = 0; i < numRedAttack; i++) this.addRed();
    for (let i = 0; i < numBlackAttack; i++) this.addBlack();
    for (let i = 0; i < numWhiteAttack; i++) this.addWhite();
    this.startAnimationLoop();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x243c47);
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );

    // set some distance from a cube that is located at z = 0
    this.camera.position.z = 5;
    this.scene.add(this.camera);
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.gammaOutput = true;
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  setupLights = () => {
    this.camera.add(new THREE.DirectionalLight(0xffffff, 5));
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  }

  addRed = () => {
    const handleLoad = gltf => {
      const mesh = gltf.scene;
      this.scene.add(mesh);
      this.redAttackDice.push(mesh);
    }
    const loader = new GLTFLoader();
    loader.load(redAttackDie, handleLoad);
  }
  addBlack = () => {
    const handleLoad = gltf => {
      const mesh = gltf.scene;
      this.scene.add(mesh);
      this.blackAttackDice.push(mesh);
    }
    const loader = new GLTFLoader();
    loader.load(blackAttackDie, handleLoad);
  }
  addWhite = () => {
    const handleLoad = gltf => {
      const mesh = gltf.scene;
      this.scene.add(mesh);
      this.whiteAttackDice.push(mesh);
    }
    const loader = new GLTFLoader();
    loader.load(whiteAttackDie, handleLoad);
  }

  // addObject = object => {
  //   const handleLoad = gltf => {
  //     const mesh = gltf.scene;
  //     this.scene.add(mesh);
  //     this.objects.push(mesh);
  //   }
  //   const loader = new GLTFLoader();
  //   loader.load(object, handleLoad);
  // }

  addCubes = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    let cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.objects.push(cube);
    cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.objects.push(cube);
  }

  startAnimationLoop = () => {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    const redResults = [[7, 1], [7, 3], [3, 3]];
    const blackResults = [[3, 3], [7, 3], [7, 1]];
    const whiteResults = [[1, 1], [5, 5], [7, 7]];
    for (let i = 0; i < this.redAttackDice.length && redLoops < maxRedLoops + 10; i++) {
      const object = this.redAttackDice[i];
      object.position.x = -2 + i * 2;
      object.position.y = -2;
      if (redLoops < maxRedLoops) {
        object.rotation.x += 0.25;
        object.rotation.y += 0.25;
      } else {
        object.rotation.x = THREE.Math.degToRad(angles[redResults[i][0]]);
        object.rotation.y = THREE.Math.degToRad(angles[redResults[i][1]]);
      }
    }
    for (let i = 0; i < this.blackAttackDice.length; i++) {
      const object = this.blackAttackDice[i];
      object.position.x = -2 + i * 2;
      object.position.y = 0;
      if (blackLoops < maxBlackLoops) {
        object.rotation.x += 0.25;
        object.rotation.y += 0.25;
      } else {
        object.rotation.x = THREE.Math.degToRad(angles[blackResults[i][0]]);
        object.rotation.y = THREE.Math.degToRad(angles[blackResults[i][1]]);
      }
    }
    for (let i = 0; i < this.whiteAttackDice.length; i++) {
      const object = this.whiteAttackDice[i];
      object.position.x = -2 + i * 2;
      object.position.y = 2;
      if (whiteLoops < maxWhiteLoops) {
        object.rotation.x += 0.25;
        object.rotation.y += 0.25;
      } else {
        object.rotation.x = THREE.Math.degToRad(angles[whiteResults[i][0]]);
        object.rotation.y = THREE.Math.degToRad(angles[whiteResults[i][1]]);
      }
    }
    redLoops++;
    blackLoops++;
    whiteLoops++;
    // const angles = [0, 45, 90, 135, 180, 225, 270, 315, 360];
    // const offsetX = -8;
    // const offsetY = -8;
    // let index = 0;
    // for (let i = 0; i < 9; i++) {
    //   for (let j = 0; j < 9; j++) {
    //     loops += 1;
    //     const object = this.objects[index++];
    //     if (object) {
    //       object.position.x = (j * 3) + offsetX;
    //       object.position.y = (i * 3) + offsetY;
    //       if (loops < maxLoops) {
    //         object.rotation.x += 0.25;
    //         object.rotation.y += 0.25;
    //       } else {
    //         object.rotation.x = THREE.Math.degToRad(90);
    //         object.rotation.y = THREE.Math.degToRad(90);
    //       }
    //     }
    //   }
    // }
    // const offset = -20;
    // for (let i = 0; i < this.objects.length; i++) {
    //   const object = this.objects[i];
    //   if (i < this.objects.length / 2 + 1) {
    //     object.position.x = (i * 2) + offset;
    //   } else {
    //     const j = this.objects.length - i;
    //     object.position.x = (j * 2) + offset
    //     object.position.y = 4;
    //   }
    // }
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  render() {
    return (
      <div
        ref={ref => (this.el = ref)}
        style={{
          width: 600,
          height: 600,
          marginTop: 8
        }}
      />
    );
  }
}

export default Stats;
