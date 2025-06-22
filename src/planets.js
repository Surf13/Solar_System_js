/*
    * Planets.js

    * This file contains functions to create and return different planets in a Three.js scene.
*/


/*    * getPlanet
    * Takes a planet name as input and returns the corresponding planet object.
    * If the planet name is not recognized, it returns an empty Object3D.
*/
function getPlanet(planet){
    var object;
    switch(planet){
        case 'earth':
            object = getEarth();
            break; 
        case 'mars':
            object = getMars();
            break;
        case 'venus':
            object = getVenus();
            break;
        case 'sun':
            object = getSun();
            break;
        case 'jupiter':
            object = getJupiter();
            break;
        case 'saturn':
            object = getSaturn();
            break;
        case 'uranus':
            object = getUranus();
            break;
        case 'neptune':
            object = getNeptune();
            break;  
        case 'mercury':
            object = getMercury();
            break;
        default:
            console.warn('Unknown planet: ' + planet);
            object = new THREE.Object3D();
            break;
    }

    return object;
}

/*
    * getSun
    * Creates a sun object with a texture and returns it.
*/
function getSun(){
    const geometry = new THREE.IcosahedronGeometry(10,5);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_sun.jpg"),
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity: 1
    });
    const planet_sun = new THREE.Mesh(geometry,material);
    planet_sun.name = 'sun';
    planet_sun.position.set(0,0,0);
    planet_sun.castShadow = true;
    planet_sun.receiveShadow = true;

    return planet_sun;  
}

/*
    * getEarth
    * Creates an Earth system with the planet, moon, and related features.
*/
function getEarth(){
    const group = new THREE.Group();
    group.name = 'earth_system';
    const earth_group = new THREE.Group();
    earth_group.name = 'earth_group';
    const earth = new THREE.Group();
    earth.name = 'earth';
    earth.rotation.z = -23.4 * Math.PI/180;
    earth_group.add(earth);

        //Sunlight
    const sun_light = new THREE.DirectionalLight(0xffffff,1.2);
	sun_light.position.set(-5,5.5,5.5);
	earth_group.add(sun_light);

    //Planet
    const geometry = new THREE.IcosahedronGeometry(1,5);
    const material = new THREE.MeshStandardMaterial({
        wireframe: false,
        roughness: 0.5,
        map: new THREE.TextureLoader().load("../assets/textures/2k_earth_daymap.jpg"),
        blending: THREE.AdditiveBlending 
    });

    const planet_earth = new THREE.Mesh(geometry,material);
    planet_earth.name = 'earth';
    earth.add(planet_earth);

    //Planet Lights
    var lightMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_earth_nightmap.jpg"), 
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: .5,
        depthWrite: false
    });

    var lightMesh = new THREE.Mesh(geometry,lightMaterial);
    earth.add(lightMesh);

    //Clouds
     var cloudMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_earth_clouds.jpg"), 
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: .3,
        depthWrite: false
    });

    var cloudMesh = new THREE.Mesh(geometry,cloudMaterial);
    cloudMesh.scale.setScalar(1.01);
    cloudMesh.name="earth_Clouds";
    planet_earth.add(cloudMesh);

    //Aura (Frenal Material on top of clouds)
    var aura = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
            color: 'rgb(109, 187, 220)',
            transparent: true,
            scale: 1.05,
            blending: THREE.AdditiveBlending,
            opacity: .15,
            depthWrite: false
        })
    );
    planet_earth.add(aura);

    //Moon Orbit
    var moon_geometry = new THREE.IcosahedronGeometry(.25,5);
    var moon_material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_moon.jpg"),
    });
    var moon = new THREE.Mesh(moon_geometry, moon_material);
    moon.name = 'moon';
    moon.rotation.x = 5* Math.PI / 180;
    moon.position.set(3.5, 0, 0);
    moon.receiveShadow = true;
    earth_group.add(moon);
    earth_group.position.z = 40;
    group.add(earth_group);
    return group;
}

/*    * getMars
    * Creates a Mars object with a texture and returns it.
*/
function getMars(){
    var planet_group = new THREE.Group();
    planet_group.name = 'mars_group';
    const geometry = new THREE.IcosahedronGeometry(0.53,5);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_mars.jpg"),
        roughness: 0.5,
        metalness: 0.1
    });
    const planet_mars = new THREE.Mesh(geometry,material);
    planet_mars.name = 'mars';
    planet_mars.position.z = 50;
    planet_group.add(planet_mars);
    return planet_group;
}

/*    * getVenus
    * Creates a Venus object with a texture and returns it.
*/
function getVenus(){
    var planet_group = new THREE.Group();
    planet_group.name = 'venus_group';
    const geometry = new THREE.IcosahedronGeometry(0.6052,5);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_venus_surface.jpg"),
        roughness: 1.5,
        metalness: 0.1
    });
    const planet_venus = new THREE.Mesh(geometry,material);
    planet_venus.name = 'venus';

    const atmo_material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_venus_atmosphere.jpg"),
        transparent: true,
        opacity: 1
    });
    const atmo_venus = new THREE.Mesh(geometry, atmo_material);
    atmo_venus.name = 'venus_atmo';
    atmo_venus.scale.setScalar(1.005);

    planet_venus.add(atmo_venus);
    planet_venus.position.z = 33;
    planet_group.add(planet_venus);

    return planet_group;
}

/*    * getJupiter
    * Creates a Jupiter object with a texture and returns it.
*/
function getJupiter(){
    var planet_group = new THREE.Group();
    planet_group.name = 'jupiter_group';
    //Jupiter
    const geometry = new THREE.IcosahedronGeometry(0.6052,5);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_jupiter.jpg"),
        roughness: 0.5,
        metalness: 0.1
    });
    const planet_jupiter = new THREE.Mesh(geometry,material);
    planet_jupiter.name = 'jupiter';
    planet_jupiter.position.z = 58;
    planet_group.add(planet_jupiter);
    return planet_group;
}

/*    * getSaturn
    * Creates a Saturn object with rings and returns it.
*/
function getSaturn(){
    var planet_group = new THREE.Group();
    planet_group.name = 'saturn_group';

    const geometry = new THREE.IcosahedronGeometry(0.5097,5);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_saturn.jpg"),
        roughness: 0.5,
        metalness: 0.1
    });
    const planet_saturn = new THREE.Mesh(geometry,material);
    planet_saturn.name = 'saturn';
    planet_group.add(planet_saturn);
    //Saturn Rings
    const ring_geometry = new THREE.RingGeometry(0.6, 1.2, 256 );
    const ring_material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_saturn_ring_alpha.png"),
        side: THREE.DoubleSide,
        metalness: 0.3,
        roughness: 0.9,
        transparent: true,
        opacity: 1
    });
    const saturn_ring = new THREE.Mesh(ring_geometry, ring_material);
    saturn_ring.name = 'saturn_rings';
    saturn_ring.rotation.x = -Math.PI / 2;
    saturn_ring.rotation.y = 26.7*Math.PI/180;
    saturn_ring.receiveShadow = true;
    planet_group.add(saturn_ring);
    saturn_ring.position.z = 64;
    planet_saturn.position.z = 64;
    return planet_group;
}

/*    * getUranus
    * Creates a Uranus object with a texture and returns it.
*/
function getUranus(){
    var planet_group = new THREE.Group();
    planet_group.name = 'uranus_group';
    //Uranus
    const geometry = new THREE.IcosahedronGeometry(3.98,5);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_uranus.jpg"),
        roughness: 1.5,
        metalness: 0.1,
        wireframe: false,

    });
    const planet_uranus = new THREE.Mesh(geometry,material);
    planet_uranus.name = 'uranus';
    planet_uranus.rotation.x = 97.77 * Math.PI / 180; 
    planet_uranus.position.z = 80;
    planet_group.add(planet_uranus);
    return planet_group;
}

/*    * getNeptune
    * Creates a Neptune object with a texture and returns it.
*/
function getNeptune(){
    var planet_group = new THREE.Group();
    planet_group.name = 'neptune_group';
    //Neptune
    const  geometry = new THREE.IcosahedronGeometry(3.86,5);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_neptune.jpg"),
        roughness: 1.5,
        metalness: .1,
        wireframe: false,
    });
    const planet_neptune = new THREE.Mesh(geometry,material);
    planet_neptune.name = 'neptune';
    planet_neptune.rotation.x = 28.32 * Math.PI / 180; 
    planet_neptune.position.z = -105;
    planet_group.add(planet_neptune);
    return planet_group;
}

/*    * getMercury
    * Creates a Mercury object with a texture and returns it.
*/
function getMercury(){
    var planet_group = new THREE.Group();
    planet_group.name = 'mercury_group';
    //Mercury
    const geometry = new THREE.IcosahedronGeometry(0.3825,5);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("../assets/textures/2k_mercury.jpg"),
        roughness: 0.5,
        metalness: 0.1
    });
    const planet_mercury = new THREE.Mesh(geometry,material);
    planet_mercury.name = 'mercury';
    planet_mercury.position.z = 15;
    planet_group.add(planet_mercury);
    return planet_group;
}

