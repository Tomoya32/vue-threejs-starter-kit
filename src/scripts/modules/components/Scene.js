import THREE from 'three';
import Controls from 'orbit-controls';
import Config from '../helpers/Config';
import PostProcessing from './PostProcessing';
import DAT from 'dat-gui';

export default class Scene {

  constructor( options = {} ) {

    let defaultOptions = {
      "active": options.active || true,
      "width": options.width || window.innerWidth,
      "height": options.height || window.innerHeight,
      "debug": options.debug || false,
      "gui": options.gui || false,
      "container": options.container || document.body,
      "postprocessing": options.postprocessing || false,
      "orbitControls": options.orbitControls !== undefined ? options.orbitControls : true,
      "backgroundOpacity": options.backgroundOpacity !== undefined ? options.backgroundOpacity : 1,
      "backgroundColor": options.backgroundColor || new THREE.Color( 0xdddddd )
    };

    this.options   = defaultOptions;
    this.scene     = null;
    this.camera    = null;
    this.renderer  = null;
    this.composer  = null;
    this.container = defaultOptions.container;
    this.controls  = null;
    this.keyboard  = null;
    this.mouse     = {
      x: null,
      y: null
    };
    this.objects   = [];
    this.clones    = [];
    this.clock     = null;
  }

  init() {

    this.addListeners();

    this.GUI = null;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, this.options.width / this.options.height, 1, 10000 );

    this.target = new THREE.Vector3();
    this.camera.lookAt(this.target);
    this.camera.position.set(0, 0, 100);

    let objectsLength = this.objects.length;
    for (let i = 0; i < objectsLength; i++) {
      this.scene.add( this.objects[ i ].getMesh() );
    };

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.renderer.setPixelRatio( Config.PixelRatio );
    this.renderer.setSize( this.options.width, this.options.height );
    this.renderer.setClearColor( this.options.backgroundColor, this.options.backgroundOpacity );
    this.renderer.shadowMap.enabled = true;

    this.container.appendChild( this.renderer.domElement );

    if (this.options.orbitControls) {
      this.controls = new Controls({
        distance: 100
      });
    } else {
      this.camera.position.set(0, 0, 100);
    }

    if (this.options.debug) {
      this.debugAxis( 200 );
    }

    if (this.options.gui) {
      this.GUI = new DAT.GUI();
    }

    this.clock = Date.now();
    this.tick = 0;

    if ( this.options.postprocessing ) {
      this.addPostProcessing();
    }
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

    this.render( elapsed, ts );
  }

  render( elapsed, ts ) {

    if (this.options.orbitControls) {
      let position = this.camera.position.toArray();
      let direction = this.target.toArray();
      this.controls.update(position, direction);
      this.camera.position.fromArray(position);
      this.camera.lookAt(this.target.fromArray(direction));
    }

    if ( this.options.postprocessing ) {
      this.postprocessing.render( elapsed, ts, this.tick );
    } else {
      this.renderer.render( this.scene, this.camera );
    }
  }

  addObject( object ) {
    this.objects.push( object );
  }

  addObjectToScene( object ) {
    this.objects.push( object );
    this.scene.add( object.getMesh() );
  }

  addObjectWireframe( object, color ) {
    let wireframe = new THREE.WireframeHelper( object, color );
    this.scene.add( wireframe );
  }

  addPostProcessing() {
    this.postprocessing = new PostProcessing( this.renderer, this.scene, this.camera, {
      gui: this.GUI
    });
  }

  addLight(light) {
    this.scene.add( light );
  }

  addListeners() {
  	window.addEventListener( 'resize', this.onWindowResize.bind( this ), false );
  }

  getScene() {
  	return this.scene;
  }

  getRenderer() {
    if ( this.options.postprocessing ) {
      return this.postprocessing.getRenderer();
    } else {
      return this.renderer;
    }
  }

  getObjects(){
    return this.objects;
  }

  onWindowResize() {
  	this.options.width = window.innerWidth;
    this.options.height = window.innerHeight;
    this.camera.aspect = this.options.width / this.options.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.options.width, this.options.height );
  }

  debugAxis(axisLength) {
    function v(x,y,z){
            return new THREE.Vector3(x,y,z);
    }

    let createAxis = (p1, p2, color) => {
      var line, lineGeometry = new THREE.Geometry(),
      lineMat = new THREE.LineBasicMaterial({color: color});
      lineGeometry.vertices.push(p1, p2);
      line = new THREE.Line(lineGeometry, lineMat);
      this.scene.add(line);
    }

    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
  }

}
