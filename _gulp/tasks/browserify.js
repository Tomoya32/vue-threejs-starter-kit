var gulp       = require('gulp');
var buffer     = require('vinyl-buffer');
var babelify   = require('babelify');
var watchify   = require('watchify');
var browserify = require('browserify');
var concat     = require('gulp-concat');
var minify     = require('gulp-minify')
var glslify    = require('glslify');
var notify     = require('gulp-notify');
var _          = require('lodash');
var uglify     = require('gulp-uglify');
var rename     = require("gulp-rename");
var source     = require('vinyl-source-stream');
var reload     = require("browser-sync").reload;
var gulpif     = require('gulp-if');
var glob       = require('glob');
var reload     = require('browser-sync').reload;
var vueify     = require('vueify');
var config     = require('../config').browserify;
var babelCfg   = require('../config').babel;
var watch      = require('../config').watch;
var jsCfg      = require('../config').javascript;

gulp.task('browserify', function(){
    bundle( jsCfg.default );
});

gulp.task('browserify:dev', function(){
    bundle( jsCfg.dev );
});

gulp.task('browserify:build', function(){
    bundle( jsCfg.build );
});

function bundle( jsConfig ){


  function rebundle() {


    return glob(config.entries, {
          ignore: config.ignore
      }, function(err, files) {

        if(err) console.log("ERROR", err);

        files.map(function(entry) {

          var options = config.opts;

          options.entries = [ entry ];

          return browserify( options )
              .transform(vueify).on('error', handleError)
              .transform({ global: true }, glslify).on('error', handleError)
              .transform(babelify.configure( babelCfg.options )).on('error', handleError)
              .bundle().on('error', handleError)
              .pipe(source(entry)).on('error', handleError)
              .pipe( rename(function (path) {

                  if ( ruleExists( config.removePath ) && config.keepArborescence ) {

                      path.dirname = path.dirname.replace( config.removePath, "" );

                  }

                  if ( !config.keepArborescence ) {

                     path.dirname = "";

                  }

                  if ( ruleExists( config.renameDir ) ) {

                      path.dirname = config.renameDir + path.dirname;

                  }

                  return path;
              }))
              .pipe(gulp.dest( config.destPath )).on('error', handleError)
              .pipe(reload({
        				stream: true,
        				once: true
        			}));
          });

    });
  };

  rebundle();

};

function ruleExists( rule ) {
  return (  rule !== null
          || rule !== undefined
          || rule !== 'undefined'
          )
          &&
          ( typeof rule == "string"
          && rule !== ""
          ) ? true : false;
};

function handleError(error){
  console.log('ERROR: ' + error);
};
