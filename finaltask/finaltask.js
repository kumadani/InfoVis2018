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
        //streamline.setSeedPoint( seed_point );

        document.getElementById('seedpoint_x')
            .addEventListener('mousemove', function(){
            var value = +document.getElementById('seedpoint_x').value;
            document.getElementById('x_label').innerHTML = "seed_x: " +  value + "<br>";
        });
        
        document.getElementById('seedpoint_y')
            .addEventListener('mousemove', function(){
            var value = +document.getElementById('seedpoint_y').value;
            document.getElementById('y_label').innerHTML = "seed_y: " +  value + "<br>";
        });        
        document.getElementById('seedpoint_z')
            .addEventListener('mousemove', function(){
            var value = +document.getElementById('seedpoint_z').value;
            document.getElementById('z_label').innerHTML = "seed_z: " +  value + "<br>";
        });
             
        document.getElementById('change-seedpoint-button')
            .addEventListener('click', function() {
            var value_x = +document.getElementById('seedpoint_x').value;            
            var value_y = +document.getElementById('seedpoint_y').value;
            var value_z = +document.getElementById('seedpoint_z').value;
            seed_point = [value_x,value_y,value_z];
        });
        
        streamline.setSeedPoint( seed_point );
        
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
