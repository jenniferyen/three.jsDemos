var container;

var camera, scene, renderer;

var geometry, group;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function init() {

    container = document.createElement( 'div' );
    container.id = "stage3d";
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 95, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.z = 500;

    scene = new THREE.Scene();

    var geometry = new THREE.CylinderGeometry( 0, 100, 100, 3 );
    var materials = [
    new THREE.MeshPhongMaterial({
    // light
    specular: '#b03b2e',
    // intermediate
    color: '#a31a0b',
    // dark
    emissive: '#7d1409',
    shininess: 50 ,
    transparent: true,
    opacity: 0.9,
    overdraw: true
}),
    new THREE.MeshPhongMaterial({
    // light
    specular: '#2fa4b1',
    // intermediate
    color: '#0b94a3',
    // dark
    emissive: '#0b7681',
    shininess: 50 ,
    transparent: true,
    opacity: 0.9,
    overdraw: true
})];

    group = new THREE.Object3D();

    for ( var i = 0; i < 350; i ++ ) {

        var mesh = new THREE.Mesh( geometry, materials[Math.floor(Math.random() * materials.length)] );
        mesh.position.x = Math.random() * 2000 - 1000;
        mesh.position.y = Math.random() * 2000 - 1000;
        mesh.position.z = Math.random() * 2000 - 1000;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.opacity = 50;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        group.add( mesh );


    }
    scene.add( group );

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    directionalLight.intensity = 0.2;
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;
    container.appendChild( renderer.domElement );


            //

            window.addEventListener( 'resize', onWindowResize, false );

        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 4;
            windowHalfY = window.innerHeight / 4;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        function onDocumentMouseMove(event) {

            mouseX = ( event.clientX - windowHalfX ) * 2;
            mouseY = ( event.clientY - windowHalfY ) * 2;

        }

        //

        function animate() {

            requestAnimationFrame( animate );
            render();

        }

        function render() {
           camera.position.x += ( mouseX - camera.position.x ) * .00090;
           camera.position.y += ( - mouseY - camera.position.y ) * .0090;

           camera.lookAt( scene.position );

            var currentSeconds = Date.now();
            // group.rotation.x = Math.sin( currentSeconds * 0.0007 ) * 0.5;
            // group.rotation.y = Math.sin( currentSeconds * 0.0003 ) * 0.5;
            // group.rotation.z = Math.sin( currentSeconds * 0.0002 ) * 0.5;

            renderer.render( scene, camera );

        }
