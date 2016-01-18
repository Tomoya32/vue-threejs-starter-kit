import THREE from 'three';
import WAGNER from '@superguigui/wagner';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import Vignette from '@superguigui/wagner/src/passes/vignette/VignettePass';
import Bloom from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import Config from './helpers/Config';
import DAT from 'dat-gui';

export default class PostProcessing {

  constructor( renderer, scene, camera, options = {} ) {

    let defaultOptions = {
      "width": options.width || window.innerWidth,
      "height": options.height || window.innerHeight,
      "gui": options.gui || null
    };

    this.options  = defaultOptions;

  	this.renderer  = renderer;
  	this.scene     = scene;
  	this.camera    = camera;
  	this.composer  = new WAGNER.Composer( this.renderer );
    this.composer.setSize(this.options.width * Config.PixelRatio, this.options.height * Config.PixelRatio);

    this.fxaaPass   = {
      name: "fxaa",
      pass: new FXAAPass(),
      active: false
    };
    this.vignettePass = {
      name: "vignette",
      pass: new Vignette(1.3, 1.5),
      active: false
    };
    this.bloomPass = {
      name: "bloom",
      pass: new Bloom({
        blurAmount: 2,
        applyZoomBlur: true,
        zoomBlurStrength: 0.2,
        blendMode: 4,
        useTexture: true
      }),
      active: false
    };


    this.shaders = [ this.fxaaPass, this.vignettePass, this.bloomPass ];

    if ( this.options.gui ) {
      this.GUI = options.gui;
      this.initGUI();
    }

    this.addListeners();

  }

  getRenderer() {
    return this.composer.renderer;
  }

  destructTheWorld(){
    this.kaboom               = true;
    this.invertStepTransition = false;
  }

  render( elapsed, ts, tick ) {

    this.composer.reset();

    this.composer.render(this.scene, this.camera);

    this.shaders.forEach((shader) => {
      if (shader.active) {
          this.composer.pass(shader.pass);
      }
    })

  	this.composer.toScreen();

  }

  initGUI() {
    this.shaders.forEach((shaderItem, index) => {
      shaderItem.pass.name = shaderItem.name;
      let shaderFolder = this.GUI.addFolder(shaderItem.name);
      let shaderParams = shaderItem.pass.params;
      shaderFolder.add(shaderItem, 'active');
      for (let paramName in shaderParams) {
        if (shaderParams.hasOwnProperty(paramName)) {
          let paramType = this.toType(shaderParams[paramName]);
          if (paramType === 'number' ||
              paramType === 'boolean' ||
              paramType === 'string') {
              shaderFolder.add(shaderParams, paramName);
          } else if (paramType === 'object') {
            let paramFolder = shaderFolder.addFolder(paramName);
            for (let subParamName in shaderParams[paramName]) {
              if (shaderParams[paramName].hasOwnProperty(subParamName)) {
                let subParamType = this.toType(shaderParams[paramName][subParamName]);
                if (subParamType === 'number' ||
                    subParamType === 'boolean' ||
                    subParamType === 'string') {
                    paramFolder.add(shaderParams[paramName], subParamName);
                }
              }
            }
          }
        }
      }
    })
  }

  addListeners() {
    window.addEventListener( 'resize', this.onWindowResize.bind( this ), false );
  }

  onWindowResize() {
    this.composer.setSize(this.options.width * Config.PixelRatio , this.options.height * Config.PixelRatio);
  }

  toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

}
