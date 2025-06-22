var simulationParams = {
    Speed_Up_Rotation: 10,
	Speed_Up_Orbit: 10,
};

/* * Solar System Simulation using Three.js
 * This code initializes a 3D solar system simulation with planets, moons, and the sun.
 * It uses Three.js for rendering and dat.GUI for user interface controls.
*/
function init() {	
	var scene = new THREE.Scene();
	var gui = new dat.GUI();
	var clock = new THREE.Clock();

		// load the environment map
	const scene_background = new THREE.TextureLoader().load("../assets/textures/space.jpg");
	scene.background = scene_background;
	
		//Lights 
	var lights = getHemisohereLight(1);
	scene.add(lights);

	//Solar System
		const solar_system = new THREE.Group();
	solar_system.name = 'solar_system';
	scene.add(solar_system);
	
		//Earth
	const earth = getPlanet('earth');
	solar_system.add(earth);
		
		//Mars
	const mars = getPlanet('mars');
	solar_system.add(mars);
		
		//Venus
	const venus = getPlanet('venus');
	solar_system.add(venus);
		
		//Jupiter
	const jupiter = getPlanet('jupiter');
	solar_system.add(jupiter);
		
		//Saturn
	const saturn = getPlanet('saturn');
	solar_system.add(saturn);
		
		//Uranus
	const uranus = getPlanet('uranus');
	solar_system.add(uranus);
		
		//Neptune
	const neptune = getPlanet('neptune');
	solar_system.add(neptune);
		
		//Mercury
	const mercury = getPlanet('mercury');
	solar_system.add(mercury);
		
		// Sun
	var sun = getSun();
	solar_system.add(sun);
	
	//Camera Controls
		// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	
		// camera GUI
	var cameraYPosition = new THREE.Group();
    var cameraZPosition = new THREE.Group();
    var cameraXPosition = new THREE.Group();

	cameraYPosition.name = 'cameraYPosition';
	cameraZPosition.name = 'cameraZPosition';
	cameraXPosition.name = 'cameraXPosition';

	cameraZPosition.add(camera);
	cameraYPosition.add(cameraZPosition);
	cameraXPosition.add(cameraYPosition);

	camera.position.z = 0;
	camera.position.x = 300;
	camera.position.y = 200;
	scene.add(camera);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var folder1 = gui.addFolder('Camera Position');
	folder1.add(camera.position, 'x', -500, 500).name('Camera X');
	folder1.add(camera.position, 'y', 0, 500).name('Camera Y');
	folder1.add(camera.position, 'z', -500, 500).name('Camera Z');
	folder1.open();

	var folder2 = gui.addFolder('Planet Simulation');
	folder2.add(simulationParams, 'Speed_Up_Orbit', 0, 10000).name('Orbit_Speed');
	folder2.add(simulationParams, 'Speed_Up_Rotation', 0, 100).name('Rotation_Speed');
	folder2.open();
	
		// renderer
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	update(renderer, scene, camera, controls, clock); //Animation Loop

	return scene;
}

function update(renderer, scene, camera, controls, clock) {
	controls.update();
	var time = clock.getElapsedTime();
	var solar_system = scene.getObjectByName('solar_system');
	
	//Planet Animation
	const rotationPeriods = {
		mercury: 58.646,
		venus: -243.018, 
		earth: 1,
		moon: 27.3,
		mars: 1.026,
		jupiter: 0.4135,
		saturn: 0.444,
		uranus: -0.718, 
		neptune: 0.671,
		sun: 25 
	};
	var simulated_days = time * simulationParams.Speed_Up_Rotation * .0001;	
	const radiansPerDay = 2 * Math.PI;

	    //Earth Animation
	var earth = solar_system.getObjectByName('earth');
	earth.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.earth);
	var clouds = earth.getObjectByName("earth_Clouds");
	clouds.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.earth) * 0.1; // slower than planet
		//Moon Animation

	var moon = solar_system.getObjectByName("moon");
	moon.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.moon);
	const moonAngularSpeed = 0.1826;
	moon.position.x = -1.6 * Math.cos(time * moonAngularSpeed);
	moon.position.z = 1.4 * Math.sin(time * moonAngularSpeed);
	
		//Venus Animation
	var venus_group = solar_system.getObjectByName('venus_group');
	var venus = venus_group.getObjectByName('venus');
	venus.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.venus);
	var atmo_venus = venus_group.getObjectByName('venus_atmo');
	atmo_venus.material.opacity = Math.abs(noise.simplex2(time*.05, time*.05)) ;
	
		//Jupiter Animation
	var jupiter_group = solar_system.getObjectByName('jupiter_group');
	var jupiter = jupiter_group.getObjectByName('jupiter');
	jupiter.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.jupiter);

		//Saturn Animation
	var saturn_group = solar_system.getObjectByName('saturn_group');
	var saturn = saturn_group.getObjectByName('saturn');
	saturn.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.saturn);
	var rings = saturn_group.getObjectByName('saturn_rings');
	rings.rotation.z += 0.0002;
		
		//Uranus Animation
	var uranus_group = solar_system.getObjectByName('uranus_group');
	var uranus = uranus_group.getObjectByName('uranus');	
	uranus.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.uranus);
		
		//Neptune Animation
	var neptune_group = solar_system.getObjectByName('neptune_group');
	var neptune = neptune_group.getObjectByName('neptune');
	neptune.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.neptune);
	
		//Mercury Animation
	var mercury_group = solar_system.getObjectByName('mercury_group');
	var mercury = mercury_group.getObjectByName('mercury');
	mercury.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.mercury);
	
		//Sun Animation
	var sun = solar_system.getObjectByName('sun');
	sun.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.sun);
		
		//Mars Animation
	const mars_group = solar_system.getObjectByName('mars_group');
	const mars = mars_group.getObjectByName('mars');
	mars.rotation.y += radiansPerDay * (simulated_days / rotationPeriods.mars);

	//Simulate Days for Orbit Animation(Different from Rotation)
	simulated_days = time * simulationParams.Speed_Up_Orbit * .01;	

	//Orbit Animation
	var mercury_orbit = solar_system.getObjectByName('mercury_group');
	mercury_orbit.rotation.y += simulated_days/88 ;

	var venus_orbit = solar_system.getObjectByName('venus_group');
	venus_orbit.rotation.y += simulated_days/225 ;

	var earth_orbit = solar_system.getObjectByName('earth_system');
	earth_orbit.rotation.y += simulated_days/365 ;

	var mars_orbit = solar_system.getObjectByName('mars_group');
	mars_orbit.rotation.y += simulated_days/687 ;

	var jupiter_orbit = solar_system.getObjectByName('jupiter_group');
	jupiter_orbit.rotation.y += simulated_days/4333 ;

	var saturn_orbit = solar_system.getObjectByName('saturn_group');
	saturn_orbit.rotation.y += simulated_days/10759 ;

	var uranus_orbit = solar_system.getObjectByName('uranus_group');
	uranus_orbit.rotation.y += simulated_days/30687 ;

	var neptune_orbit = solar_system.getObjectByName('neptune_group');
	neptune_orbit.rotation.y += simulated_days/60190 ;


	//Renderer
	renderer.render(scene, camera);

	requestAnimationFrame(function() {

		update(renderer, scene, camera, controls, clock);
	});
} 


var scene = init(); // Initialize the scene
