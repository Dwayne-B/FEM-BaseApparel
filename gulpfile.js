const {src, dest, watch ,task, parallel,series} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

/**DEVELOPMENT TASKS**/
    //sass 
    function scssTask(){
        return src('./src/sass/main.scss', { sourcemaps: true })
          .pipe(sass())
          .pipe(postcss([cssnano()]))
          .pipe(dest('./src/css', { sourcemaps: '.' }));
      }    
    // task("sass", async ()=>{
    //     src('./src/sass/*.scss',{sourcemaps:true}).pipe(sass()).pipe(postcss([cssnano()])).pipe(dest('dist',{sourcemaps:'.'}))
    // })
    //browser sync tasks

    //browser sync serve
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
        watch('./src/sass/*.scss',series(scssTask,browserSyncReload))
    }
    task('default',series(scssTask,browserSyncServe,watchTask))
// const watchTask = ()=>{
//     watch('*.html', browserSyncReload);
//     watch(['./src/scss/**/*.scss','./src/js/**/*.js'],
//     series('sassTask','jsTask'))
// }
/**PRE-DEPLOY TASKS**/


// task("minfy", async ()=>{
//minify images 
    // src("./src/images/*").pipe(imgMin())
//minify js 
// src("./src/js/*").pipe()
// concat sass compile to css minify
// src("./src/sass/*").pipe(concat()).pipe(sass()).pipe(minCss())

// });
// auto-prefixer
// postCSS
// task('prefix',async ()=>{

// })
//source maps
// task("sourceMap",async()=>{
//     console.log("learn more about source maps");
// })

//copy all files from src to dist
// task("copySourceFilesToDist", async ()=>{
//     src('./src').pipe(dest('dist'))
//     });




// DEPLOY //
/*runs all the tasks , but runs similar tasks together
* saves time 
*/
// task("deploy",series( parallel(sourceMaps,minify),copySourceFilesToDist));

