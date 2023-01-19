var canvas = document.getElementById("renderCanvas"); // Get the canvas element

if (BABYLON.Engine.isSupported()) {
    var ENGINE = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    var createScene = function () {
        var scene = new BABYLON.Scene(ENGINE);

        // Camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.9;
        camera.lowerRadiusLimit = 30;
        camera.upperRadiusLimit = 150;
        camera.attachControl(canvas, true);

        // light
        var light = new BABYLON.HemisphericLight("light",
            new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        //map
        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("src/assets/earth.jpg", scene);

        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "src/assets/worldHeightMap.jpg", 200, 200, 250, 0, 10, scene, false);
        ground.material = groundMaterial;

        //cloud test
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
        
        var pcs= new BABYLON.PointsCloudSystem("pcs", 1, scene) 

        pcs.addVolumePoints(sphere, 10000);
        pcs.buildMeshAsync().then(() => sphere.dispose());

        //return
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