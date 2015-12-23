import THREE from 'three';
import Controls from 'orbit-controls';
import PostProcessing from './PostProcessing';

export default class Scene {

    constructor( options = {}) {

      let defaultOptions = {
        "active": options.active || true,
        "width": options.width || window.innerWidth,
        "height": options.height || window.innerHeight,
        "postprocessing": options.postprocessing || false,
        "backgroundOpacity": options.backgroundOpacity !== undefined ? options.backgroundOpacity : 1,
        "backgroundColor": options.backgroundColor || new THREE.Color( 0xffffff )
      };

      this.options = defaultOptions;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.composer = null;
      this.container = options.container || document.body;
      this.controls = null;
      this.keyboard = null;

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
      this.camera = new THREE.PerspectiveCamera( 45, this.options.width / this.options.height, 1, 10000 );


      this.target = new THREE.Vector3();
      this.camera.lookAt(this.target);


      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true
      });

      this.renderer.setClearColor( this.options.background.color, this.options.background.opacity );
      this.renderer.setSize( this.options.width, this.options.height );

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

      if (this.options.active) {

      let objectsLength = this.objects.length;
      for (let i = 0; i < objectsLength; i++) {
        this.objects[ i ].update( elapsed, ts, this.tick );
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

        if ( this.options.postprocessing ) {

          this.postprocessing.render();

        } else {

          this.renderer.render( this.scene, this.camera );

        }
    }

    addObject( object ) {

      this.scene.add( object.getMesh() );
      this.objects.push( object );

    }

    addPostProcessing() {

      this.postprocessing = new PostProcessing( this.renderer, this.scene, this.camera );

    }

    addListeners() {

    	window.addEventListener( 'resize', this.onWindowResize.bind( this ), false );

    }

    onWindowResize() {

    	this.options.width = window.innerWidth;
	    this.options.height = window.innerHeight;

	    this.camera.aspect = this.options.width / this.options.height;
	    this.camera.updateProjectionMatrix();

	    this.renderer.setSize( this.options.width, this.options.height );

    }

    getScene() {

    	return this.scene;

    }

}
