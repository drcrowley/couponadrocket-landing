'use strict';

// Получение настроек папок из package.json
const pjson = require('./package.json');
const dirs = pjson.config.directories;

// Зависимости проекта
const gulp = require('gulp');
const jade = require('gulp-jade');
const prettify = require('gulp-prettify');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const newer = require('gulp-newer');
const jshint = require('gulp-jshint');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');
const spritesmith = require('gulp.spritesmith');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const ghPages = require('gulp-gh-pages');
const del = require('del');
const browserSync = require('browser-sync').create();
const fs = require('fs');

// Запуск `NODE_ENV=production npm start [задача]` приведет к сборке без sourcemaps
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

// Компиляция стилей
gulp.task('styles', function () {
  return gulp.src(dirs.source + '/styles/main.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 4 versions', 'IE 9'], cascade: false })
    ]))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulpIf(!isDev, csso()))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(dirs.build + '/styles'))
    .pipe(browserSync.stream());
});

// Компиляция шаблонов
gulp.task('templates', function () {
  return gulp.src([dirs.source + '/templates/**/*.jade', '!' + dirs.source + '/templates/_*/*.jade'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(dirs.build))
    .on('end', browserSync.reload);
});

// Линтер скриптов
gulp.task('lint', function() {
  return gulp.src(dirs.source + '/blocks/**/*.js')
    .pipe(jshint({
      curly: true,
      eqeqeq: false,
      eqnull: true,
      undef: false,
      unused: false,
      loopfunc: true,
      browser: true,
      jquery: true,
      globals: ['$']
    }))
    // Use gulp-notify as jshint reporter
    .pipe(notify({ message: function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }
      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }}));
});

// Сборка скриптов
gulp.task('scripts', gulp.series('lint', function () {
  return gulp.src([dirs.source + '/scripts/jquery.js', dirs.source + '/scripts/*.js', dirs.source + '/blocks/**/*.js' ])
  .pipe(gulpIf(isDev, sourcemaps.init()))
  .pipe(concat('script.js'))
  .pipe(gulpIf(!isDev, uglify()))
  .pipe(gulpIf(isDev, sourcemaps.write()))
  .pipe(gulp.dest(dirs.build + '/scripts'))
  .on('end', browserSync.reload);
}));

// Копирование и оптимизация изображений
gulp.task('images', function () {
  return gulp.src(dirs.source + '/images/*.{jpg,jpeg,gif,png,svg}', {since: gulp.lastRun('images')})
    .pipe(newer(dirs.build + '/images'))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(dirs.build + '/images'));
});

//Копирование шрифтов
gulp.task('fonts', function () {
  return gulp.src(dirs.source + '/fonts/*.{woff,woff2,ttf,eot,otf,svg}')
    .pipe(gulp.dest(dirs.build + '/fonts'));
});

//Копирование загружаемых файлов
gulp.task('uploads', function () {
  return gulp.src(dirs.source + '/uploads/*')
    .pipe(gulp.dest(dirs.build + '/uploads'));
});

// Генерация спрайтов
gulp.task('sprite', function (done) {
  var spriteData = gulp.src(dirs.source + '/icons/*.png').pipe(spritesmith({
    cssName: 'sprite.scss',
    cssVarMap: function (item) {
        // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
        if (item.name.indexOf('-hover') !== -1) {
            item.name = 'icon_' + item.name.replace('-hover', ':hover');
        // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
        } else {
            item.name = 'icon_' + item.name;
        }
    },
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png'
  }));

  spriteData.img.pipe(gulp.dest('./src/images'));
  spriteData.css.pipe(gulp.dest('./src/styles/base'));
  done();
});

// Очистка папки сборки
gulp.task('clean', function () {
  return del(dirs.build + '/**/*');
});

// Сборка всего
gulp.task('build', gulp.series(
  'clean',
  'sprite',
  gulp.parallel('styles', 'scripts', 'templates', 'fonts', 'images', 'uploads')
));

// Локальный сервер
gulp.task('serve', function () {
  browserSync.init({
      server: dirs.build,
      open: false,
      ghostMode: false,
      notify: false,
      timestamps: false
  });
});

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', function() {
  return gulp.src(dirs.build + '/**/*')
    .pipe(ghPages());
});

// Cлежение за изменениями
gulp.task('watch', function () {
  gulp.watch([dirs.source + '/styles/**/*.scss', dirs.source + '/blocks/**/*.scss'], gulp.series('styles'));
  gulp.watch([dirs.source + '/templates/**/*.jade', dirs.source + '/blocks/**/*.jade'], gulp.series('templates'));
  gulp.watch([dirs.source + '/scripts/**/*.js', dirs.source + '/blocks/**/*.js'], gulp.series('scripts'));
  gulp.watch([dirs.source + '/icons/*.{jpg,jpeg,gif,png,svg}'], gulp.series('sprite'));
  gulp.watch([dirs.source + '/images/*.{jpg,jpeg,gif,png,svg}'], gulp.series('images'));
  gulp.watch([dirs.source + '/fonts/*.{woff,woff2,ttf,eot,otf,svg}'], gulp.series('fonts'));
  gulp.watch([dirs.source + '/uploads/*'], gulp.series('uploads'));
});

// Локальный сервер, слежение
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));

// Задача по умолчанию
gulp.task('default', gulp.series('dev'));
