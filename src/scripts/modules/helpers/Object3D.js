import THREE from 'three';

let glslify = require('glslify');

export default class Object3D {

  constructor() {

    this.vertexShader = glslify('../../../vertex-shaders/simple.vert');
    this.fragmentShader = glslify('../../../fragment-shaders/simple.frag');

    this.material = new THREE.ShaderMaterial({
        uniforms: {
            time: { type: "f", value: 0 }
        },
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
        shading: THREE.FlatShading,
        wireframe: true,
        wireframeLinewidth: 1
    });
    this.geometry = new THREE.SphereGeometry( 10, 32, 32 );
    this.mesh = new THREE.Mesh( this.geometry, this.material );

  }

  getMesh() {
    return this.mesh;
  }

  update( elapsed, ts, tick ) {

    this.material.uniforms["time"].value = elapsed * 0.0008;

  }

}
