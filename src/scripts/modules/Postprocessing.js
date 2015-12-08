import WAGNER from '@superguigui/wagner';
import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';

export default class PostProcessing {

  constructor( renderer, scene, camera ) {

  	this.renderer = renderer;
  	this.scene = scene;
  	this.camera = camera;
  	this.composer = new WAGNER.Composer( this.renderer );
  	this.fxaaPass = new FXAAPass();
  	this.bloomPass = new BloomPass({
      blurAmount: 2,
      zoomBlurStrength: 0.99,
      applyZoomBlur: true
    });

  }

  render( scene, camera ) {

    this.renderer.autoClearColor = true;
    this.composer.reset();
  	this.composer.render(this.scene, this.camera);
  	this.composer.pass(this.fxaaPass);
    this.composer.pass(this.bloomPass);
  	this.composer.toScreen();

  }

}
