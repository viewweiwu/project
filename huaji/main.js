(() => {
    let ctrl = {
        init() {
            this.initRenderer();
            this.initScene();
            this.initCamera();
            this.initWall();
            this.renderer.render(this.scene, this.camera);
        },
        initRenderer() {
            this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("mainCanvas") });
            this.renderer.setClearColor(0 * 000000);
        },
        initScene() {
            this.scene = new THREE.Scene();
        },
        initCamera() {
            let camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 1, 10);
            camera.position.set(0, 0, 5);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.camera = camera;
            this.scene.add(camera);
        },
        initWall() {
            let wall = new THREE.Mesh(new THREE.PlaneGeometry(4, 4),
                new THREE.MeshBasicMaterial({
                    color: 0x66ccff,
                    wireframe: true
                })
            );
            this.scene.add(wall);
        }
    }

    ctrl.init();
})();