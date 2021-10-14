const {src, dest, watch ,task, parallel,series} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const imgMin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();


/**DEVELOPMENT TASKS**/
    //sass 
    function scssTask(){
        return src('./src/sass/main.scss', { sourcemaps: true })
          .pipe(sass())
          .pipe(postcss([cssnano()]))
       .pipe(prefix('last 2 versions'))
          .pipe(dest('./src/css'));
         
      }    


    //browser sync tasks

    const browserSyncServe =(cb)=>{
        browsersync.init({
            server:{
                baseDir:"./src"
            }
        });
        cb();
    }
    //server reload
    const browserSyncReload = (cb)=>{
        browsersync.reload();
        cb();
    }

    //watch tasks
    const watchTask = ()=>{
        watch('./src/*.html', browserSyncReload);
        watch('./src/sass/**',series(scssTask,browserSyncReload))
    }
    task('default',series(scssTask,browserSyncServe,watchTask))



    /**PRE-DEPLOY TASKS**/
    // minify imgs
    const minify = async ()=>{
// minify images 
    src("./src/images/*").pipe(imgMin()).pipe(dest("./src/images"))
// minify js 
src("./src/js/*").pipe(terser()).pipe(dest("./src/js/"))
    }

    //copy files to dist folder
const copyToDist= async ()=>{

    src("./src/**/*").pipe(dest("dist"))
}

task('build',series(minify,copyToDist));