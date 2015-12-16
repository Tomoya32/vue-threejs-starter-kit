var src = 'src/';
var dest = 'dist/';
var server = {
  url: "http://localhost",
  port: 3000,
  entry: "server.js"
};
var proxy = 3001;

module.exports = {
  global: {

  },

  nodemon: {

    script: server.entry

  },

  javascript: {
    default: {
      concat: false,
      minify: false,
      watch: false
    },
    dev: {
      concat: true,
      concatOutput: "main.js",
      minify: true,
      watch: true
    },
    build: {
      concat: true,
      concatOutput: "main.js",
      minify: true,
      watch: false
    }
  },

  browserify: {
    opts: {
      debug: true,
      extensions: ['.js', '.es'],
      paths     : [src + 'scripts'],
      entries: [src + 'scripts/main.js'],
    },
    destPath: dest + "scripts/",
    // Glob pattern for the files you are looking for
    entries: src + 'scripts/**/*.js',
    // Files to ignore
    ignore: [ src + 'scripts/modules/**/*.*' ],
    // String to remove from the original arborescence path
    // Example : with removePath option set to "static"
    // all files matching "static/scripts/**/*.js"
    // will be copied to destPath + "scripts/**/*.js"
    removePath: null,
    // This option allows the developer to change the directory target
    // Example : static/scripts/main.js
    // With renameDir option set to "js",
    // The file will be in destPath + js/
    renameDir: "",
    // Option to keep arborescence of the files
    // Starting from the src specified
    // If set to false, files will be stored to the root of destPath
    // if set to false with renameDir option set,
    // files will be to the root of destPath + renameDir
    keepArborescence: false
  },

  browserSync: {

    server: {
      proxy: server,
      port: proxy,
      open: false,
      watchOptions: {
        debounceDelay: 1000
      }
    },

    standalone: {
      server: {
        baseDir: dest
      },
      open: false,
      watchOptions: {
        debounceDelay: 1000
      }
    }
  },

  clean: {
    javascript: [ dest + "scripts/!(vendors)" ],
    css: [ dest + "styles/" ]
  },

  html: {
    src:   dest + '*.html',
    opts: {
      cwd: dest
    }
  },

  css: {
    debug: {
      concat: false,
      minify: false
    },
    dev: {
      concat: true,
      minify: true
    },
    prod: {
      concat: true,
      minify: true
    },
    rules: [{
        sources: src + "styles/*.css",
        destPath: dest + "styles/",
        output: {
          concat: "main.css",
          minify: "main.min.css"
        }
    }]
  },


  babel: {
    src:      src + '{scripts,js}/**/*.{es,es6,js,babel}',
    dst:     dest + 'scripts/',
    options: {

    }
  },

  styles: {
    src:      src + 'styles/**/*.{scss,sass,css}',
    dest: dest + 'styles/',
    compatibility: [],
    options: {
      dev: {
        concatenate: true,
        minify: true,
        concatTarget: "main.css"
      },
      build: {
        concatenate: true,
        minify: true,
        concatTarget: "main.css"
      }
    },
    sassConfig: {

    }
  },

  watch: {

    files: [
      src + '**/*.{vue,js,es,css,scss,sass,html,frag,vert}'
    ]

  }

}
