let glslify = require('glslify');

export default class ShaderChunk {

  constructor() {

    this.shaders = {};
    this.shaders['alphamap_fragment']          = glslify('./ShaderChunk/alphamap_fragment.glsl');
    this.shaders['alphamap_pars_fragment']     = glslify('./ShaderChunk/alphamap_pars_fragment.glsl');
    this.shaders['alphatest_fragment']         = glslify('./ShaderChunk/alphatest_fragment.glsl');
    this.shaders['aomap_fragment']             = glslify('./ShaderChunk/aomap_fragment.glsl');
    this.shaders['aomap_pars_fragment']        = glslify('./ShaderChunk/aomap_pars_fragment.glsl');
    this.shaders['bumpmap_pars_fragment']      = glslify('./ShaderChunk/bumpmap_pars_fragment.glsl');
    this.shaders['color_fragment']             = glslify('./ShaderChunk/color_fragment.glsl');
    this.shaders['color_pars_fragment']        = glslify('./ShaderChunk/color_pars_fragment.glsl');
    this.shaders['color_pars_vertex']          = glslify('./ShaderChunk/color_pars_vertex.glsl');
    this.shaders['color_vertex']               = glslify('./ShaderChunk/color_vertex.glsl');
    this.shaders['common']                     = glslify('./ShaderChunk/common.glsl');
    this.shaders['defaultnormal_vertex']       = glslify('./ShaderChunk/defaultnormal_vertex.glsl');
    this.shaders['envmap_fragment']            = glslify('./ShaderChunk/envmap_fragment.glsl');
    this.shaders['envmap_pars_fragment']       = glslify('./ShaderChunk/envmap_pars_fragment.glsl');
    this.shaders['envmap_pars_vertex']         = glslify('./ShaderChunk/envmap_pars_vertex.glsl');
    this.shaders['envmap_vertex']              = glslify('./ShaderChunk/envmap_vertex.glsl');
    this.shaders['fog_fragment']               = glslify('./ShaderChunk/fog_fragment.glsl');
    this.shaders['fog_pars_fragment']          = glslify('./ShaderChunk/fog_pars_fragment.glsl');
    this.shaders['lightmap_fragment']          = glslify('./ShaderChunk/lightmap_fragment.glsl');
    this.shaders['lightmap_pars_fragment']     = glslify('./ShaderChunk/lightmap_pars_fragment.glsl');
    this.shaders['lights_lambert_pars_vertex'] = glslify('./ShaderChunk/lights_lambert_pars_vertex.glsl');
    this.shaders['lights_lambert_vertex']      = glslify('./ShaderChunk/lights_lambert_vertex.glsl');
    this.shaders['lights_phong_fragment']      = glslify('./ShaderChunk/lights_phong_fragment.glsl');
    this.shaders['lights_phong_pars_fragment'] = glslify('./ShaderChunk/lights_phong_pars_fragment.glsl');
    this.shaders['lights_phong_pars_vertex']   = glslify('./ShaderChunk/lights_phong_pars_vertex.glsl');
    this.shaders['lights_phong_vertex']        = glslify('./ShaderChunk/lights_phong_vertex.glsl');
    this.shaders['linear_to_gamma_fragment']   = glslify('./ShaderChunk/linear_to_gamma_fragment.glsl');
    this.shaders['logdepthbuf_fragment']       = glslify('./ShaderChunk/logdepthbuf_fragment.glsl');
    this.shaders['logdepthbuf_pars_fragment']  = glslify('./ShaderChunk/logdepthbuf_pars_fragment.glsl');
    this.shaders['logdepthbuf_pars_vertex']    = glslify('./ShaderChunk/logdepthbuf_pars_vertex.glsl');
    this.shaders['logdepthbuf_vertex']         = glslify('./ShaderChunk/logdepthbuf_vertex.glsl');
    this.shaders['map_fragment']               = glslify('./ShaderChunk/map_fragment.glsl');
    this.shaders['map_pars_fragment']          = glslify('./ShaderChunk/map_pars_fragment.glsl');
    this.shaders['map_particle_fragment']      = glslify('./ShaderChunk/map_particle_fragment.glsl');
    this.shaders['map_particle_pars_fragment'] = glslify('./ShaderChunk/map_particle_pars_fragment.glsl');
    this.shaders['morphnormal_vertex']         = glslify('./ShaderChunk/morphnormal_vertex.glsl');
    this.shaders['morphtarget_pars_vertex']    = glslify('./ShaderChunk/morphtarget_pars_vertex.glsl');
    this.shaders['morphtarget_vertex']         = glslify('./ShaderChunk/morphtarget_vertex.glsl');
    this.shaders['normalmap_pars_fragment']    = glslify('./ShaderChunk/normalmap_pars_fragment.glsl');
    this.shaders['shadowmap_fragment']         = glslify('./ShaderChunk/shadowmap_fragment.glsl');
    this.shaders['shadowmap_pars_fragment']    = glslify('./ShaderChunk/shadowmap_pars_fragment.glsl');
    this.shaders['shadowmap_pars_vertex']      = glslify('./ShaderChunk/shadowmap_pars_vertex.glsl');
    this.shaders['shadowmap_vertex']           = glslify('./ShaderChunk/shadowmap_vertex.glsl');
    this.shaders['skinbase_vertex']            = glslify('./ShaderChunk/skinbase_vertex.glsl');
    this.shaders['skinning_pars_vertex']       = glslify('./ShaderChunk/skinning_pars_vertex.glsl');
    this.shaders['skinning_vertex']            = glslify('./ShaderChunk/skinning_vertex.glsl');
    this.shaders['skinnormal_vertex']          = glslify('./ShaderChunk/skinnormal_vertex.glsl');
    this.shaders['specularmap_fragment']       = glslify('./ShaderChunk/specularmap_fragment.glsl');
    this.shaders['specularmap_pars_fragment']  = glslify('./ShaderChunk/specularmap_pars_fragment.glsl');
    this.shaders['uv2_pars_fragment']          = glslify('./ShaderChunk/uv2_pars_fragment.glsl');
    this.shaders['uv2_pars_vertex']            = glslify('./ShaderChunk/uv2_pars_vertex.glsl');
    this.shaders['uv2_vertex']                 = glslify('./ShaderChunk/uv2_vertex.glsl');
    this.shaders['uv_pars_fragment']           = glslify('./ShaderChunk/uv_pars_fragment.glsl');
    this.shaders['uv_pars_vertex']             = glslify('./ShaderChunk/uv_pars_vertex.glsl');
    this.shaders['uv_vertex']                  = glslify('./ShaderChunk/uv_vertex.glsl');
    this.shaders['worldpos_vertex']            = glslify('./ShaderChunk/worldpos_vertex.glsl');
  }

  shaderParse(glsl) {
    return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, (a, b) => {
      return this.shaders[b] + '\n';
    });
  }
}
