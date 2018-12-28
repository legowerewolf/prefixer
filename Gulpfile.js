let gulp = require('gulp');
let ts = require('gulp-typescript');

let tsProject = ts.createProject("./tsconfig.json");

function build_typescript() {
    return tsProject.src()
        .pipe(tsProject())
        .on("error", (err) => { })
        .pipe(gulp.dest("build"));
}

function run_tests(done) {

    let prefixerModule = new require("./build/prefixer");

    let tests = [
        ////////////////////// Tests go here. //////////////////////
        /*
        Tests are just functions that return a true or a false.

        */
        {
            name: "Prefixer composition",
            test: () => {
                let prefixer = new prefixerModule.Prefixer();
                prefixer.update("Testing");
                prefixer.update("Test");
                return prefixer.prefix("T", "3.14") === "[T]       3.14"
            }
        }
        ///////////////////// End testing block ///////////////////
    ]

    let testPrefixer = new prefixerModule.Prefixer();
    tests.map(test => test.name).forEach((name) => { testPrefixer.update(name) });

    console.log("=".repeat(60));

    let pass = tests
        .map((test) => {
            let result = test.test();
            console.log(testPrefixer.prefix(test.name, `${result ? "Pass" : "Fail"}`));
            return result;
        })
        .reduce((accum, result) => { return accum && result }, true);

    console.log("=".repeat(60));

    done(!pass);
}

gulp.task("build", build_typescript);
gulp.task("test", gulp.series(build_typescript, run_tests));
gulp.task("start-watchers", () => {
    gulp.watch(tsProject.config.include, gulp.parallel("test"));
});
gulp.task("default", gulp.parallel("test", "start-watchers"));