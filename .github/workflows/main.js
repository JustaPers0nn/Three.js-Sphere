import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap"
import "./style.css"

// Create a scene
const scene = new THREE.Scene();

// Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: '#00ff83' , roughness: "0.5" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Add light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);

// Create a camera with dynamic aspect ratio
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;
scene.add(camera);


// Create the renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2)
//controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true
controls.enablePan = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// Handle window resize renderer also
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();


//animating ui
const tl = gsap.timeline({defaults: { duration: 1 } })
tl.fromTo(mesh.scale,{z: 0, x: 0, y: 0,} , { z: 1, x: 1 , y: 1,})
tl.fromTo("nav", {y: -1000}, {y: 7})
tl.fromTo(".title", {opacity: 0} ,{opacity: 1})

//mouse while draging sphere animating color 
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / window.innerWidth) * 255),
      Math.round((e.pageY / window.innerHeight) * 255),
      150,
    ];

    // Animate the color change on the mesh material
    gsap.to(mesh.material.color, {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
    });
  }
});
