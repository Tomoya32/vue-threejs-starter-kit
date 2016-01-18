import THREE from 'three';
import UniformsLib from './UniformsLib';
import UniformsUtils from './UniformsUtils';
import ShaderChunk from './ShaderChunk';

let shaderChunk = new ShaderChunk();
let uniformsUtils = new UniformsUtils();

export default {

  /**
  * Webgl Shader Library for three.js
  *
  * @author alteredq / http://alteredqualia.com/
  * @author mrdoob / http://mrdoob.com/
  * @author mikael emtinger / http://gomo.se/
  */

	'basic': {

		uniforms: uniformsUtils.merge( [

			UniformsLib[ "common" ],
			UniformsLib[ "aomap" ],
			UniformsLib[ "fog" ],
			UniformsLib[ "shadowmap" ]

		] ),

		vertexShader: [

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "uv_pars_vertex" ],
			shaderChunk.shaders[ "uv2_pars_vertex" ],
			shaderChunk.shaders[ "envmap_pars_vertex" ],
			shaderChunk.shaders[ "color_pars_vertex" ],
			shaderChunk.shaders[ "morphtarget_pars_vertex" ],
			shaderChunk.shaders[ "skinning_pars_vertex" ],
			shaderChunk.shaders[ "shadowmap_pars_vertex" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				shaderChunk.shaders[ "uv_vertex" ],
				shaderChunk.shaders[ "uv2_vertex" ],
				shaderChunk.shaders[ "color_vertex" ],
				shaderChunk.shaders[ "skinbase_vertex" ],

			"	#ifdef USE_ENVMAP",

				shaderChunk.shaders[ "beginnormal_vertex" ],
				shaderChunk.shaders[ "morphnormal_vertex" ],
				shaderChunk.shaders[ "skinnormal_vertex" ],
				shaderChunk.shaders[ "defaultnormal_vertex" ],

			"	#endif",

				shaderChunk.shaders[ "begin_vertex" ],
				shaderChunk.shaders[ "morphtarget_vertex" ],
				shaderChunk.shaders[ "skinning_vertex" ],
				shaderChunk.shaders[ "project_vertex" ],
				shaderChunk.shaders[ "logdepthbuf_vertex" ],

				shaderChunk.shaders[ "worldpos_vertex" ],
				shaderChunk.shaders[ "envmap_vertex" ],
				shaderChunk.shaders[ "shadowmap_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "color_pars_fragment" ],
			shaderChunk.shaders[ "uv_pars_fragment" ],
			shaderChunk.shaders[ "uv2_pars_fragment" ],
			shaderChunk.shaders[ "map_pars_fragment" ],
			shaderChunk.shaders[ "alphamap_pars_fragment" ],
			shaderChunk.shaders[ "aomap_pars_fragment" ],
			shaderChunk.shaders[ "envmap_pars_fragment" ],
			shaderChunk.shaders[ "fog_pars_fragment" ],
			shaderChunk.shaders[ "shadowmap_pars_fragment" ],
			shaderChunk.shaders[ "specularmap_pars_fragment" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	vec3 outgoingLight = vec3( 0.0 );",
			"	vec4 diffuseColor = vec4( diffuse, opacity );",
			"	vec3 totalAmbientLight = vec3( 1.0 );", // hardwired
			"	vec3 shadowMask = vec3( 1.0 );",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],
				shaderChunk.shaders[ "map_fragment" ],
				shaderChunk.shaders[ "color_fragment" ],
				shaderChunk.shaders[ "alphamap_fragment" ],
				shaderChunk.shaders[ "alphatest_fragment" ],
				shaderChunk.shaders[ "specularmap_fragment" ],
				shaderChunk.shaders[ "aomap_fragment" ],
				shaderChunk.shaders[ "shadowmap_fragment" ],

			"	outgoingLight = diffuseColor.rgb * totalAmbientLight * shadowMask;",

				shaderChunk.shaders[ "envmap_fragment" ],

				shaderChunk.shaders[ "linear_to_gamma_fragment" ],

				shaderChunk.shaders[ "fog_fragment" ],

			"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );",

			"}"

		].join( "\n" )

	},

	'lambert': {

		uniforms: uniformsUtils.merge( [

			UniformsLib[ "common" ],
			UniformsLib[ "fog" ],
			UniformsLib[ "lights" ],
			UniformsLib[ "shadowmap" ],

			{
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) }
			}

		] ),

		vertexShader: [

			"#define LAMBERT",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

			"	varying vec3 vLightBack;",

			"#endif",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "uv_pars_vertex" ],
			shaderChunk.shaders[ "uv2_pars_vertex" ],
			shaderChunk.shaders[ "envmap_pars_vertex" ],
			shaderChunk.shaders[ "lights_lambert_pars_vertex" ],
			shaderChunk.shaders[ "color_pars_vertex" ],
			shaderChunk.shaders[ "morphtarget_pars_vertex" ],
			shaderChunk.shaders[ "skinning_pars_vertex" ],
			shaderChunk.shaders[ "shadowmap_pars_vertex" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				shaderChunk.shaders[ "uv_vertex" ],
				shaderChunk.shaders[ "uv2_vertex" ],
				shaderChunk.shaders[ "color_vertex" ],

				shaderChunk.shaders[ "beginnormal_vertex" ],
				shaderChunk.shaders[ "morphnormal_vertex" ],
				shaderChunk.shaders[ "skinbase_vertex" ],
				shaderChunk.shaders[ "skinnormal_vertex" ],
				shaderChunk.shaders[ "defaultnormal_vertex" ],

				shaderChunk.shaders[ "begin_vertex" ],
				shaderChunk.shaders[ "morphtarget_vertex" ],
				shaderChunk.shaders[ "skinning_vertex" ],
				shaderChunk.shaders[ "project_vertex" ],
				shaderChunk.shaders[ "logdepthbuf_vertex" ],

				shaderChunk.shaders[ "worldpos_vertex" ],
				shaderChunk.shaders[ "envmap_vertex" ],
				shaderChunk.shaders[ "lights_lambert_vertex" ],
				shaderChunk.shaders[ "shadowmap_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform vec3 emissive;",
			"uniform float opacity;",

			"uniform vec3 ambientLightColor;",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

			"	varying vec3 vLightBack;",

			"#endif",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "color_pars_fragment" ],
			shaderChunk.shaders[ "uv_pars_fragment" ],
			shaderChunk.shaders[ "uv2_pars_fragment" ],
			shaderChunk.shaders[ "map_pars_fragment" ],
			shaderChunk.shaders[ "alphamap_pars_fragment" ],
			shaderChunk.shaders[ "envmap_pars_fragment" ],
			shaderChunk.shaders[ "fog_pars_fragment" ],
			shaderChunk.shaders[ "shadowmap_pars_fragment" ],
			shaderChunk.shaders[ "specularmap_pars_fragment" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	vec3 outgoingLight = vec3( 0.0 );",	// outgoing light does not have an alpha, the surface does
			"	vec4 diffuseColor = vec4( diffuse, opacity );",
			"	vec3 totalAmbientLight = ambientLightColor;",
			"	vec3 shadowMask = vec3( 1.0 );",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],
				shaderChunk.shaders[ "map_fragment" ],
				shaderChunk.shaders[ "color_fragment" ],
				shaderChunk.shaders[ "alphamap_fragment" ],
				shaderChunk.shaders[ "alphatest_fragment" ],
				shaderChunk.shaders[ "specularmap_fragment" ],
				shaderChunk.shaders[ "shadowmap_fragment" ],

			"	#ifdef DOUBLE_SIDED",

			"		if ( gl_FrontFacing )",
			"			outgoingLight += diffuseColor.rgb * ( vLightFront * shadowMask + totalAmbientLight ) + emissive;",
			"		else",
			"			outgoingLight += diffuseColor.rgb * ( vLightBack * shadowMask + totalAmbientLight ) + emissive;",

			"	#else",

			"		outgoingLight += diffuseColor.rgb * ( vLightFront * shadowMask + totalAmbientLight ) + emissive;",

			"	#endif",

				shaderChunk.shaders[ "envmap_fragment" ],

				shaderChunk.shaders[ "linear_to_gamma_fragment" ],

				shaderChunk.shaders[ "fog_fragment" ],

			"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );",

			"}"

		].join( "\n" )

	},

	'phong': {

		uniforms: uniformsUtils.merge( [

			UniformsLib[ "common" ],
			UniformsLib[ "aomap" ],
			UniformsLib[ "lightmap" ],
			UniformsLib[ "emissivemap" ],
			UniformsLib[ "bumpmap" ],
			UniformsLib[ "normalmap" ],
			UniformsLib[ "displacementmap" ],
			UniformsLib[ "fog" ],
			UniformsLib[ "lights" ],
			UniformsLib[ "shadowmap" ],

			{
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
				"specular" : { type: "c", value: new THREE.Color( 0x111111 ) },
				"shininess": { type: "f", value: 30 }
			}

		] ),

		vertexShader: [

			"#define PHONG",

			"varying vec3 vViewPosition;",

			"#ifndef FLAT_SHADED",

			"	varying vec3 vNormal;",

			"#endif",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "uv_pars_vertex" ],
			shaderChunk.shaders[ "uv2_pars_vertex" ],
			shaderChunk.shaders[ "displacementmap_pars_vertex" ],
			shaderChunk.shaders[ "envmap_pars_vertex" ],
			shaderChunk.shaders[ "lights_phong_pars_vertex" ],
			shaderChunk.shaders[ "color_pars_vertex" ],
			shaderChunk.shaders[ "morphtarget_pars_vertex" ],
			shaderChunk.shaders[ "skinning_pars_vertex" ],
			shaderChunk.shaders[ "shadowmap_pars_vertex" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				shaderChunk.shaders[ "uv_vertex" ],
				shaderChunk.shaders[ "uv2_vertex" ],
				shaderChunk.shaders[ "color_vertex" ],

				shaderChunk.shaders[ "beginnormal_vertex" ],
				shaderChunk.shaders[ "morphnormal_vertex" ],
				shaderChunk.shaders[ "skinbase_vertex" ],
				shaderChunk.shaders[ "skinnormal_vertex" ],
				shaderChunk.shaders[ "defaultnormal_vertex" ],

			"#ifndef FLAT_SHADED", // Normal computed with derivatives when FLAT_SHADED

			"	vNormal = normalize( transformedNormal );",

			"#endif",

				shaderChunk.shaders[ "begin_vertex" ],
				shaderChunk.shaders[ "displacementmap_vertex" ],
				shaderChunk.shaders[ "morphtarget_vertex" ],
				shaderChunk.shaders[ "skinning_vertex" ],
				shaderChunk.shaders[ "project_vertex" ],
				shaderChunk.shaders[ "logdepthbuf_vertex" ],

			"	vViewPosition = - mvPosition.xyz;",

				shaderChunk.shaders[ "worldpos_vertex" ],
				shaderChunk.shaders[ "envmap_vertex" ],
				shaderChunk.shaders[ "lights_phong_vertex" ],
				shaderChunk.shaders[ "shadowmap_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"#define PHONG",

			"uniform vec3 diffuse;",
			"uniform vec3 emissive;",
			"uniform vec3 specular;",
			"uniform float shininess;",
			"uniform float opacity;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "color_pars_fragment" ],
			shaderChunk.shaders[ "uv_pars_fragment" ],
			shaderChunk.shaders[ "uv2_pars_fragment" ],
			shaderChunk.shaders[ "map_pars_fragment" ],
			shaderChunk.shaders[ "alphamap_pars_fragment" ],
			shaderChunk.shaders[ "aomap_pars_fragment" ],
			shaderChunk.shaders[ "lightmap_pars_fragment" ],
			shaderChunk.shaders[ "emissivemap_pars_fragment" ],
			shaderChunk.shaders[ "envmap_pars_fragment" ],
			shaderChunk.shaders[ "fog_pars_fragment" ],
			shaderChunk.shaders[ "lights_phong_pars_fragment" ],
			shaderChunk.shaders[ "shadowmap_pars_fragment" ],
			shaderChunk.shaders[ "bumpmap_pars_fragment" ],
			shaderChunk.shaders[ "normalmap_pars_fragment" ],
			shaderChunk.shaders[ "specularmap_pars_fragment" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	vec3 outgoingLight = vec3( 0.0 );",
			"	vec4 diffuseColor = vec4( diffuse, opacity );",
			"	vec3 totalAmbientLight = ambientLightColor;",
			"	vec3 totalEmissiveLight = emissive;",
			"	vec3 shadowMask = vec3( 1.0 );",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],
				shaderChunk.shaders[ "map_fragment" ],
				shaderChunk.shaders[ "color_fragment" ],
				shaderChunk.shaders[ "alphamap_fragment" ],
				shaderChunk.shaders[ "alphatest_fragment" ],
				shaderChunk.shaders[ "specularmap_fragment" ],
				shaderChunk.shaders[ "normal_phong_fragment" ],
				shaderChunk.shaders[ "lightmap_fragment" ],
				shaderChunk.shaders[ "hemilight_fragment" ],
				shaderChunk.shaders[ "aomap_fragment" ],
				shaderChunk.shaders[ "emissivemap_fragment" ],

				shaderChunk.shaders[ "lights_phong_fragment" ],
				shaderChunk.shaders[ "shadowmap_fragment" ],

				"totalDiffuseLight *= shadowMask;",
				"totalSpecularLight *= shadowMask;",

				"#ifdef METAL",

				"	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) * specular + totalSpecularLight + totalEmissiveLight;",

				"#else",

				"	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) + totalSpecularLight + totalEmissiveLight;",

				"#endif",

				shaderChunk.shaders[ "envmap_fragment" ],

				shaderChunk.shaders[ "linear_to_gamma_fragment" ],

				shaderChunk.shaders[ "fog_fragment" ],

			"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );",

			"}"

		].join( "\n" )

	},

	'points': {

		uniforms: uniformsUtils.merge( [

			UniformsLib[ "points" ],
			UniformsLib[ "shadowmap" ]

		] ),

		vertexShader: [

			"uniform float size;",
			"uniform float scale;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "color_pars_vertex" ],
			shaderChunk.shaders[ "shadowmap_pars_vertex" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				shaderChunk.shaders[ "color_vertex" ],

			"	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

			"	#ifdef USE_SIZEATTENUATION",
			"		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );",
			"	#else",
			"		gl_PointSize = size;",
			"	#endif",

			"	gl_Position = projectionMatrix * mvPosition;",

				shaderChunk.shaders[ "logdepthbuf_vertex" ],
				shaderChunk.shaders[ "worldpos_vertex" ],
				shaderChunk.shaders[ "shadowmap_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform vec3 psColor;",
			"uniform float opacity;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "color_pars_fragment" ],
			shaderChunk.shaders[ "map_particle_pars_fragment" ],
			shaderChunk.shaders[ "fog_pars_fragment" ],
			shaderChunk.shaders[ "shadowmap_pars_fragment" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	vec3 outgoingLight = vec3( 0.0 );",
			"	vec4 diffuseColor = vec4( psColor, opacity );",
			"	vec3 shadowMask = vec3( 1.0 );",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],
				shaderChunk.shaders[ "map_particle_fragment" ],
				shaderChunk.shaders[ "color_fragment" ],
				shaderChunk.shaders[ "alphatest_fragment" ],
				shaderChunk.shaders[ "shadowmap_fragment" ],

			"	outgoingLight = diffuseColor.rgb * shadowMask;",

				shaderChunk.shaders[ "fog_fragment" ],

			"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );",

			"}"

		].join( "\n" )

	},

	'dashed': {

		uniforms: uniformsUtils.merge( [

			UniformsLib[ "common" ],
			UniformsLib[ "fog" ],

			{
				"scale"    : { type: "f", value: 1 },
				"dashSize" : { type: "f", value: 1 },
				"totalSize": { type: "f", value: 2 }
			}

		] ),

		vertexShader: [

			"uniform float scale;",
			"attribute float lineDistance;",

			"varying float vLineDistance;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "color_pars_vertex" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				shaderChunk.shaders[ "color_vertex" ],

			"	vLineDistance = scale * lineDistance;",

			"	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"	gl_Position = projectionMatrix * mvPosition;",

				shaderChunk.shaders[ "logdepthbuf_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			"uniform float dashSize;",
			"uniform float totalSize;",

			"varying float vLineDistance;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "color_pars_fragment" ],
			shaderChunk.shaders[ "fog_pars_fragment" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	if ( mod( vLineDistance, totalSize ) > dashSize ) {",

			"		discard;",

			"	}",

			"	vec3 outgoingLight = vec3( 0.0 );",
			"	vec4 diffuseColor = vec4( diffuse, opacity );",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],
				shaderChunk.shaders[ "color_fragment" ],

			"	outgoingLight = diffuseColor.rgb;", // simple shader

				shaderChunk.shaders[ "fog_fragment" ],

			"	gl_FragColor = vec4( outgoingLight, diffuseColor.a );",

			"}"

		].join( "\n" )

	},

	'depth': {

		uniforms: {

			"mNear": { type: "f", value: 1.0 },
			"mFar" : { type: "f", value: 2000.0 },
			"opacity" : { type: "f", value: 1.0 }

		},

		vertexShader: [

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "morphtarget_pars_vertex" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				shaderChunk.shaders[ "begin_vertex" ],
				shaderChunk.shaders[ "morphtarget_vertex" ],
				shaderChunk.shaders[ "project_vertex" ],
				shaderChunk.shaders[ "logdepthbuf_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform float mNear;",
			"uniform float mFar;",
			"uniform float opacity;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],

			"	#ifdef USE_LOGDEPTHBUF_EXT",

			"		float depth = gl_FragDepthEXT / gl_FragCoord.w;",

			"	#else",

			"		float depth = gl_FragCoord.z / gl_FragCoord.w;",

			"	#endif",

			"	float color = 1.0 - smoothstep( mNear, mFar, depth );",
			"	gl_FragColor = vec4( vec3( color ), opacity );",

			"}"

		].join( "\n" )

	},

	'normal': {

		uniforms: {

			"opacity" : { type: "f", value: 1.0 }

		},

		vertexShader: [

			"varying vec3 vNormal;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "morphtarget_pars_vertex" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

			"	vNormal = normalize( normalMatrix * normal );",

				shaderChunk.shaders[ "begin_vertex" ],
				shaderChunk.shaders[ "morphtarget_vertex" ],
				shaderChunk.shaders[ "project_vertex" ],
				shaderChunk.shaders[ "logdepthbuf_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform float opacity;",
			"varying vec3 vNormal;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],

			"}"

		].join( "\n" )

	},

	/* -------------------------------------------------------------------------
	//	Cube map shader
	 ------------------------------------------------------------------------- */

	'cube': {

		uniforms: { "tCube": { type: "t", value: null },
					"tFlip": { type: "f", value: - 1 } },

		vertexShader: [

			"varying vec3 vWorldPosition;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

			"	vWorldPosition = transformDirection( position, modelMatrix );",

			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				shaderChunk.shaders[ "logdepthbuf_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform samplerCube tCube;",
			"uniform float tFlip;",

			"varying vec3 vWorldPosition;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],

			"}"

		].join( "\n" )

	},

	/* -------------------------------------------------------------------------
	//	Cube map shader
	 ------------------------------------------------------------------------- */

	'equirect': {

		uniforms: { "tEquirect": { type: "t", value: null },
					"tFlip": { type: "f", value: - 1 } },

		vertexShader: [

			"varying vec3 vWorldPosition;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

			"	vWorldPosition = transformDirection( position, modelMatrix );",

			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				shaderChunk.shaders[ "logdepthbuf_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform sampler2D tEquirect;",
			"uniform float tFlip;",

			"varying vec3 vWorldPosition;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"void main() {",

				// "	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",
				"vec3 direction = normalize( vWorldPosition );",
				"vec2 sampleUV;",
				"sampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );",
				"sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;",
				"gl_FragColor = texture2D( tEquirect, sampleUV );",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],

			"}"

		].join( "\n" )

	},

	/* Depth encoding into RGBA texture
	 *
	 * based on SpiderGL shadow map example
	 * http://spidergl.org/example.php?id=6
	 *
	 * originally from
	 * http://www.gamedev.net/topic/442138-packing-a-float-into-a-a8r8g8b8-texture-shader/page__whichpage__1%25EF%25BF%25BD
	 *
	 * see also
	 * http://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/
	 */

	'depthRGBA': {

		uniforms: {},

		vertexShader: [

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "morphtarget_pars_vertex" ],
			shaderChunk.shaders[ "skinning_pars_vertex" ],
			shaderChunk.shaders[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				shaderChunk.shaders[ "skinbase_vertex" ],

				shaderChunk.shaders[ "begin_vertex" ],
				shaderChunk.shaders[ "morphtarget_vertex" ],
				shaderChunk.shaders[ "skinning_vertex" ],
				shaderChunk.shaders[ "project_vertex" ],
				shaderChunk.shaders[ "logdepthbuf_vertex" ],

			"}"

		].join( "\n" ),

		fragmentShader: [

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "logdepthbuf_pars_fragment" ],

			"vec4 pack_depth( const in float depth ) {",

			"	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );",
			"	const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );",
			"	vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", // "	vec4 res = fract( depth * bit_shift );",
			"	res -= res.xxyz * bit_mask;",
			"	return res;",

			"}",

			"void main() {",

				shaderChunk.shaders[ "logdepthbuf_fragment" ],

			"	#ifdef USE_LOGDEPTHBUF_EXT",

			"		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );",

			"	#else",

			"		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );",

			"	#endif",

				//"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );",
				//"float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );",
				//"gl_FragData[ 0 ] = pack_depth( z );",
				//"gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );",

			"}"

		].join( "\n" )

	},


	'distanceRGBA': {

		uniforms: {

			"lightPos": { type: "v3", value: new THREE.Vector3( 0, 0, 0 ) }

		},

		vertexShader: [

			"varying vec4 vWorldPosition;",

			shaderChunk.shaders[ "common" ],
			shaderChunk.shaders[ "morphtarget_pars_vertex" ],
			shaderChunk.shaders[ "skinning_pars_vertex" ],

			"void main() {",

				shaderChunk.shaders[ "skinbase_vertex" ],
				shaderChunk.shaders[ "begin_vertex" ],
				shaderChunk.shaders[ "morphtarget_vertex" ],
				shaderChunk.shaders[ "skinning_vertex" ],
				shaderChunk.shaders[ "project_vertex" ],
				shaderChunk.shaders[ "worldpos_vertex" ],

				"vWorldPosition = worldPosition;",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform vec3 lightPos;",
			"varying vec4 vWorldPosition;",

			shaderChunk.shaders[ "common" ],

			"vec4 pack1K ( float depth ) {",

			"   depth /= 1000.0;",
			"   const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );",
  			"	const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );",
   			"	vec4 res = fract( depth * bitSh );",
   			"	res -= res.xxyz * bitMsk;",
   			"	return res; ",

			"}",

			"float unpack1K ( vec4 color ) {",

			"	const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );",
			"	return dot( color, bitSh ) * 1000.0;",

			"}",

			"void main () {",

			"	gl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );",

			"}"

		].join( "\n" )

	}

};
