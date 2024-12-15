import {gsap} from "../../node_modules/gsap/index.js";
import * as THREE from './libraries/three.module.js';

document.addEventListener('DOMContentLoaded', function(){
  var button_enter = document.getElementById('button_enter');
  var enter_container = document.getElementById('enter_container');  

  setTimeout(() => {
    button_enter.classList.add('button-enter');
    button_enter.classList.remove('op-0');
    enter_container.classList.add('enter-container');
    enter_container.classList.remove('op-0');
  }, 3000);  

});
  
  const raycaster = new THREE.Raycaster();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(85, innerWidth / innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  const container_canva = document.getElementById("app");

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  container_canva.appendChild(renderer.domElement);
  camera.position.z = 50;

  const planeGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
  const planeMaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading,
    vertexColors: true
  });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  
  scene.add(planeMesh);
  const { array } = planeMesh.geometry.attributes.position;
  const randomValues = [];
  for (let i = 0; i < Object.keys(array).length; i++){
    
    if(i % 3 === 0){
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i] = x + (Math.random() - 0.5)*3;
    array[i + 1] = y + (Math.random() - 0.5)*3;
    array[i + 2] = z + (Math.random() - 0.5)*3;
    }
    randomValues.push(Math.random() * Math.PI*2);
  }

  planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;

  planeMesh.geometry.attributes.position.randomValues = randomValues;

  const colors = [];
  for(let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
    colors.push(0, 0.6, 0);   
  }

  planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

  const light = new THREE.
    DirectionalLight(0x4697FF, 1);
  light.position.set(0, 1, 1);
  scene.add(light);

  const backLight = new THREE.
    DirectionalLight(0x4697FF, 1);
    backLight.position.set(0, 0, -1);
  scene.add(backLight);

  const mouse = {
    x: undefined,
    y: undefined
  }

  let frame = 0;
  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // planeMesh.rotation.x += -0.01;
    raycaster.setFromCamera(mouse, camera);
    frame += 0.01;
    
    const { array, originalPosition, randomValues } = planeMesh.geometry.attributes.position;
    for(let i = 0; i < array.length; i+=3){
      array[i] = originalPosition[i] + Math.cos(frame + randomValues[i])*0.001;
      array[i+1] = originalPosition[i+1] + Math.sin(frame + randomValues[i+1])*0.003;
    }

    planeMesh.geometry.attributes.position.needsUpdate = true;
    
    const intersects = raycaster.intersectObject(planeMesh);
    if(intersects.length > 0){
      const {color} = intersects[0].object.geometry.attributes;
      
      color.needsUpdate = true;

      const initialColor = {
        r: 0,
        g: 0.1,
        b: 0
      };
      const hoverColor = {
        r: 0,
        g: 0.5,
        b: 0
      };

      gsap.to(hoverColor, {
        r: initialColor.r,
        g: initialColor.g,
        b: initialColor.b,
        duration:1,
        onUpdate: () => {
          color.setX(intersects[0].face.a, hoverColor.r);
          color.setY(intersects[0].face.a, hoverColor.g);
          color.setZ(intersects[0].face.a, hoverColor.b);
          color.setX(intersects[0].face.b, hoverColor.r);
          color.setY(intersects[0].face.b, hoverColor.g);
          color.setZ(intersects[0].face.b, hoverColor.r);
          color.setX(intersects[0].face.c, hoverColor.r);
          color.setY(intersects[0].face.c, hoverColor.g);
          color.setZ(intersects[0].face.c, hoverColor.r);
          color.needsUpdate = true;
        }
      })

    }
  }

  animate();

  let button_enter = document.getElementById("button_enter");

  button_enter.addEventListener("click", function(){
    for(let i = 0; i < 130; i++){
      setTimeout(() => {
        planeMesh.rotation.x += -0.01;
        camera.position.z += -0.3;
        camera.position.y += 0.2;
       
      }, i*9);
      
    }
    setTimeout(() => {
      for(let i = 0; i < 2000; i++){
        setTimeout(() => {
          camera.position.z += -0.3;
          camera.position.y += 0.01;
        }, i*3);
      }
      
    }, 1200);

    setTimeout(() => {
      container_canva.classList.add('opacity-zero');
    }, 1000);

    setTimeout(()=>{container_canva.innerHTML = "";}, 2700);

    setTimeout(() => {
      
      var background_space = document.getElementById('background_space');
      background_space.classList.add('enter-space');
      background_space.classList.remove('d-none');
      var main_weather_container = document.getElementById('main');
      main_weather_container.classList.add('main_weather_container');
      main_weather_container.classList.remove('d-none');
      var main_weather_container_1 = document.getElementById('crystal_weather_container_1');
      main_weather_container_1.classList.add('main_weather_container_1');
      main_weather_container_1.classList.remove('d-none');
      var main_weather_container_2 = document.getElementById('crystal_weather_container_2');
      main_weather_container_2.classList.add('main_weather_container_2');
      main_weather_container_2.classList.remove('d-none');

    }, 3000);
    
  }, false);

 addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth)*2-1;
  mouse.y = -(event.clientY / innerHeight)*2+1;
  // console.log(mouse);
 });