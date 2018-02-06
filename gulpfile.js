const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const gulpIf = require('gulp-if');
const compass = require('gulp-compass');
const embedTemplates = require('gulp-angular-embed-templates');
const strip = require('gulp-strip-comments');
const transform = require('vinyl-transform');
const through2 = require('through2');
const shortid = require('shortid');
const replace = require('gulp-replace');

const createPath = function (isProd, suffix) {
    let result = `builds`;

    if(isProd)
        result = `${result}/production`;
    else
        result = `${result}/development`;

    if(suffix) {
        result = `${result}${suffix}`
    }

    return result;
};

const projectPaths = {
    html: ['app/**/*.html'],
    htmlRoot: ['app/*.html'],
    javascript: ['app/imports.js',
                 'app/*.js',
                 'app/**/*.js'],
    styles: ['app/*.scss',
             'app/**/.scss']
};

const cleanPaths = [`${createPath(false)}/*`, `${createPath(true)}`];

const prodOptionsForHTML = {
    collapseInlineTagWhitespace: false,
    collapseWhitespace: true,
    html5: true,
    decodeEntities: true,
    removeComments: true,
    processConditionalComments: true,
    processScripts: ['text/html'],
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeTagWhitespace: true,
    sortAttributes: true,
    sortClassName: true,
    trimCustomFragments: true,
    useShortDocType: true,
    ignoreCustomFragments: [/\{\{[.]*?\}\}/]
};

const htmlTask = function(isProd) {
    gulp.src(projectPaths.html)
        .on('error', gutil.log)
        .pipe(rename({dirname: ''}))
        .pipe(gulpIf(isProd, htmlmin(prodOptionsForHTML)))
        .pipe(gulp.dest(createPath(isProd, '/HTML')));
}

const htmlRootTask = function(isProd) {
    gulp.src(projectPaths.htmlRoot)
        .on('error', gutil.log)
        //.pipe(replace('{appToReplace}', 'app' + randomId))
        .pipe(gulpIf(isProd, htmlmin(prodOptionsForHTML)))
        .pipe(gulp.dest(createPath(isProd)));
}

const jsHelperFunc = function(file, enc, next) {
    browserify(({entries: file})).transform("babelify", { presets: ['es2015'] })
        .bundle((err, res) =>
        {
            if(err){
                console.log(err);
                return;
            }

            file.contents = res;
            next(null, file);
        })
};

const cleanTask = function() {
    console.log(cleanPaths[0]);
    del(cleanPaths).then(paths =>{
        console.log(`deleted all files in cleanPaths parameter!`);
    })
};

const jsTask = function(isProd)
{
    const skipFiles = function(file){
        return file.path.includes("assets\\js");
    }
    gulp.src(projectPaths.javascript)
        .pipe(strip({ safe: true }))
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .on('error', gutil.log)
        .pipe(through2.obj(jsHelperFunc))
        .pipe(strip({safe: true}))
        //.pipe(embedTemplates({skipFiles}))
        //.pipe(concat('app' + randomId + '.js'))
        .pipe(concat('app.js'))
        .pipe(gulpIf(isProd, buffer()))
        .pipe(gulpIf(isProd, uglify({ mangle: false })))
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(createPath(isProd, '/js')))
        .on('end', () =>
        {
            console.log('js task DONE')
        });
};

const compassTask = function(isProd)
{
    const compassOptions ={
        sass : 'app',
        css : createPath(isProd, '/js'),
        style : (isProd)? 'compressed': 'expanded',
        comments: !isProd,
        logging: !isProd,
        debug : !isProd,
        require: ['susy', 'breakpoint']
    };
    gulp.src(projectPaths.styles)
        .pipe(compass(compassOptions))
        .on('error', gutil.log);
};

const fontsTask = function(isProd)
{
    gulp.src(projectPaths.fonts)
        .on('error', gutil.log)
        .pipe(createPath(isProd, '/css/fonts'));
};

const imageTask = function(isProd)
{
    gulp.src(projectPaths.image)
        .on('error', gutil.log)
        .pipe(createPath(isProd, '/css/images'));
}

const allTasks = function(isProd)
{
    randomId = shortid.generate();
    console.log(cleanPaths[0]);
    del(cleanPaths).then(paths => {
        console.log('deleted all files in cleanPaths parameter, rebuilding now!');
        htmlTask(isProd);
        htmlRootTask(isProd);
        jsTask(isProd);
        compassTask(isProd);
        imageTask(isProd);
        fontsTask(isProd);
    });
};

//************************************************************************
                            // tasks
//************************************************************************

gulp.task('clean', () => {
    cleanTask();
});

gulp.task('html', () => {
    htmlTask(false);
});

gulp.task('htmlRoot', () => {
    htmlRootTask(false);
});

gulp.task('js', () => {
    jsTask(false);
});

gulp.task('compass', () => {
    compassTask(false);
});

gulp.task('image', () => {
    imageTask(false);
});

gulp.task('fonts', () => {
    fontsTask(false);
});

gulp.task('all', () => {
    allTasks(false);
});

gulp.task('forProd', () => {
    allTasks(true);
});

gulp.task('default', ['all'], function() {
    
    gulp.watch(projectPaths.html, ['html']);
    gulp.watch(projectPaths.htmlRoot, ['htmlRoot']);
    gulp.watch(projectPaths.javascript, ['js']);
    gulp.watch(projectPaths.styles, ['compass']);
    gulp.watch(projectPaths.image, ['image']);
    gulp.watch(projectPaths.fonts, ['fonts']);

});