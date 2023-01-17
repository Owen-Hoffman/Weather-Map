var canvas = document.getElementById("renderCanvas"); // Get the canvas element

if (BABYLON.Engine.isSupported()) {
    var ENGINE = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    var createScene = function () {
        // Creates a basic Babylon Scene object
        var scene = new BABYLON.Scene(ENGINE);
        // Creates and positions a free camera
        var camera = new BABYLON.FreeCamera("camera1",
            new BABYLON.Vector3(0, 5, -10), scene);
        // Targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        // Creates a light, aiming 0,1,0 - to the sky
        var light = new BABYLON.HemisphericLight("light",
            new BABYLON.Vector3(0, 1, 0), scene);
        // Dim the light a small amount - 0 to 1
        light.intensity = 0.7;
        // Built-in 'sphere' shape.
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere",
            { diameter: 2, segments: 32 }, scene);
        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;
        // Built-in 'ground' shape.
        var ground = BABYLON.MeshBuilder.CreateGround("ground",
            { width: 6, height: 6 }, scene);
        return scene;
    };

    var scene = createScene(); //Call the createScene function
    // Register a render loop to repeatedly render the scene

    ENGINE.runRenderLoop(function () {
        scene.render();
    });
    // Watch for browser/canvas resize events
} else {
    altert("BROWSER NOT SUPPORTED");
}

window.addEventListener("resize", function () {
    ENGINE.resize();
});