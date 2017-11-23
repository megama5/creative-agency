"use strict";
const DEV = 0;
const PRODACT = 1;
const mode = DEV; 

const plugins = {
    jquery : {
        path: 'node_modules/jquery/',
        jsFilePath: function(){ return this.path + 'dist/jquery.min.js';},
    },
    popper: {
        //for bootstrap 4
        path : 'node_modules/popper.js/',
        jsFilePath: function(){ return this.path + 'dist/umd/popper.min.js';},
    },
    bootstrap : {
        path : 'node_modules/bootstrap/',
        jsFilePath: function(){ return this.path + 'dist/js/bootstrap.min.js';},
    },
    ionicons : {
        path : 'components/ionicons/',
        jsFilePath: function(){ return '';},
    },
    slickslider :{
        path : 'node_modules/slick-carousel/slick/',
        jsFilePath: function(){ return this.path + 'slick.min.js';},
    },
}

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    concat = require("gulp-concat"),
    wiredep = require('wiredep')({
        directory: [  // enable import in my .scss file
            'node_modules/**',
            'components/**'
        ],
    });
    
const PATH = wiredep;

//for autoprefixer
const compatability = [
    'last 3 versions',
    'iOS 7'
];

// include this js file into project in current order
const pluginsJs = [];
/**
* additional includes can ba dun with push and shift array commands
*/
for(var element in plugins){
    pluginsJs.push( plugins[element].jsFilePath() );
}

const beforeDefaultTasks = [
    'sass', 
    'javascript', 
    //'browser-sync' //don't need this
    ];


/****************************************************/
/*******************Tasks****************************/
/****************************************************/

//Compile scss to css
gulp.task('sass', function () {
    return gulp.src('./assets/src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(
            {
                outputStyle: 'compressed',
                includePaths:PATH.scss,
            }
        ).on('error', sass.logError))
        .pipe(autoprefixer(
            {
            browsers: compatability,
            cascade: false,
            })
        )
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/dist/css'));
});


gulp.task('javascript', function (cb) {
    pluginsJs.push('assets/src/javascript/scripts.js');
    pluginsJs.push('assets/src/javascript/map.js');

    pump([
            gulp.src(pluginsJs)
            .pipe(concat('global.js')),
            uglify(),
            gulp.dest('assets/dist/javascript')
        ],
        cb
    );
});

gulp.task('browser-sync', function () {
    browserSync.init(['./*.html', './assets/dist/css/style.css'], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', beforeDefaultTasks, function () {
    gulp.watch('./assets/src/scss/**/*.*', ['sass']);
    gulp.watch('./assets/src/javascript/scripts.js', ['javascript']);
});