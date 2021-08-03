const {src, dist, watch ,task, parallel} = require("gulp");

/**DEVELOPMENT TASKS**/
    //sass watch 
    //browser sync 
    //

/**PRE-DEPLOY TASKS**/


task("minfy", async ()=>{
//minify images 
    src("./src/images/*").pipe(imgMin())
//minify js 
src("./src/js/*").pipe()
// concat sass compile to css minify
src("./src/sass/*").pipe(concat()).pipe(sass()).pipe(minCss())

});
//source maps
task("sourceMap",async()=>{
    console.log("learn more about source maps");
})

//copy all files from src to dist
task("copySourceFilesToDist", async ()=>{
    src('./src').pipe(dest('dist'))
    });




// DEPLOY //
/*runs all the tasks , but runs similar tasks together
* saves time 
*/
task("deploy",series( parallel(sourceMaps,minify),copySourceFilesToDist));

