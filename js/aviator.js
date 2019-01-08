var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
};

window.addEventListener('load', init, false);

function init() {
  // set up scene, camera, renderer
  createScene();
  createLights();
  createPlane();
  createSea();
  createSky();
  loop();
}

// three.js variables
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, height,
    width, renderer, container;

function createScene() {
  height = window.innerHeight;
  width = window.innerWidth;

  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  aspectRatio = width / height;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = 0;
  camera.position.y = 100;
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize(width, height);

  renderer.shadowMap.enabled = true;

  container = document.getElementById('world');
  container.appendchild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
  height = window.innerHeight;
  width = window.innerWidth;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

var hemisphereLight, shadowLight;

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);

  shadowLight.position(150, 350, 350);

}

function loop() {
	renderer.render(scene, camera);

	requestAnimationFrame(loop);
}
