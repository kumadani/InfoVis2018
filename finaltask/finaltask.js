function main()
{
    var volume = new KVS.CreateTornadoData( 64, 64, 64 );
    var screen = new KVS.THREEScreen();

    screen.init(volume, {
        width: window.innerWidth * 0.8, 
        height: window.innerHeight, 
        targetDom: document.getElementById('display'), 
        enableAutoResize: false });

    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 0, 0, 0 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 2 );

        var seed_point = volume.objectCenter();
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime( 500 );
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth( 5 );
        streamline.setSeedPoint( seed_point );

        document.getElementById('seedpoint')
            .addEventListener('mousemove', function(){
            alert("hello world!");
        });
             
        document.getElementById('change-seedpoint-button')
            .addEventListener('click', function() {
            alert("hello world!");
        });
        
        
        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        screen.draw();

        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });
        
        window.addEventListener('resize', function() {
            screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
        });
    }
}
