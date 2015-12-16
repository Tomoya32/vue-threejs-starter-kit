import THREE from 'three';
import Controls from 'orbit-controls';
import PostProcessing from './PostProcessing';

export default class Scene {

    constructor( options = {} ) {

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.composer = null;
      this.container = options.container || document.body;
      this.controls = null;
      this.keyboard = null;

      this.params = {
      active: options.active || true,
        height: options.height || window.innerHeight,
        width: options.width || window.innerWidth,
        postprocessing: options.postprocessing || false
      };

      this.mouse = {
        x: null,
        y: null
      };

      this.objects = [];

      this.clock = null;

    }

    init() {

      this.addListeners();

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 45, this.params.width / this.params.height, 1, 10000 );


      this.target = new THREE.Vector3();
      this.camera.lookAt(this.target);


      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true
      });

      this.renderer.setClearColor( 0x000000, 1 );
      this.renderer.setSize( this.params.width, this.params.height );

      this.addPostProcessing();

      this.container.appendChild( this.renderer.domElement );

      this.controls = new Controls({
        distance: 80
      });

      this.clock = Date.now();
      this.tick = 0;

      this.animate();

    }

    animate( ts ) {

      this.tick += 0.1;
      let elapsed = Date.now() - this.clock;
      window.requestAnimationFrame( this.animate.bind(this) );

      if (this.params.active) {

      let objectsLength = this.objects.length;
      for (let i = 0; i < objectsLength; i++) {
        this.objects[ i ].update( elapsed, ts, tick );
      };

      }

      this.render( ts );
    }

    render() {

        const position = this.camera.position.toArray();
        const direction = this.target.toArray();
        this.controls.update(position, direction);
        this.camera.position.fromArray(position);
        this.camera.lookAt(this.target.fromArray(direction));

        if ( this.params.postprocessing ) {

          this.postprocessing.render();

        } else {

          this.renderer.render( this.scene, this.camera );

        }
    }

    addPostProcessing() {

      this.postprocessing = new PostProcessing( this.renderer, this.scene, this.camera );

    }

    addListeners() {

    	window.addEventListener( 'resize', this.onWindowResize.bind( this ), false );

    }

    onWindowResize() {

    	this.params.width = window.innerWidth;
	    this.params.height = window.innerHeight;

	    this.camera.aspect = this.params.width / this.params.height;
	    this.camera.updateProjectionMatrix();

	    this.renderer.setSize( this.params.width, this.params.height );

    }

    getScene() {

    	return this.scene;

    }

}
