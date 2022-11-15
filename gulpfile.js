const gulp = require('gulp');
const jest = require('gulp-jest').default;



gulp.task('test', () => {
    return gulp.src('./src/').pipe(jest({
        preset: 'ts-jest',
        watch: true,
        automock: false,
        moduleDirectories: ["node_modules"]
    }))
}
);


