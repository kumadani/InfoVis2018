function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    var light = new THREE.PointLight();
    light.position.set( 105, 105, 105 );
    screen.light = light;


    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue,light);
    screen.scene.add( surfaces);

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    screen.loop();
}
