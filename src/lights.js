/* Light Helper Functions */

function getPointLight(intensity){
	var light = new THREE.PointLight(0xffffff,intensity);
	light.castShadow = true;

	return light;
}

function getSpotLight(intensity, color){
    color = color === undefined ? 'rgb(255, 255, 255)' : color;

	var light = new THREE.SpotLight(color,intensity);
	light.castShadow = true;
    light.penumbra = 0.5;

	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
        light.shadow.bias = 0.001;

	return light;
}

function getDirectionalLight(intensity){
    var light = new THREE.DirectionalLight(0xffffff,intensity);
    light.castShadow = true;

    light.shadow.camera.left   = -40;
    light.shadow.camera.bottom = -40;
    light.shadow.camera.right  =  40;
    light.shadow.camera.top    =  40;

    light.shadow.mapSize.width = 4096;

    return light;
}

function getAmbientLight(intensity){
    var light = new THREE.AmbientLight('rgb(10,30,50)',intensity);

    return light;
}

function getHemisohereLight(intensity){
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

    return light;
}

function getRectAreaLight(intensity, width,height){
    var light = new THREE.RectAreaLight(0xffffff,intensity, width,height);

    //light.position.set(5,5,0);
    //light.lookAt(0,0,0);

    return light;
}