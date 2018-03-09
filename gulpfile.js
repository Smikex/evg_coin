var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		fileinclude    = require('gulp-file-include');


// Default

gulp.task('default-common-js', function() {
	return gulp.src('app/js/common.js')
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/_default/js'));//поместить в папку с названием _default
});

gulp.task('default-js', ['default-common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/slick/dist/slick.min.js',
		'app/libs/matchHeight/dist/jquery.matchHeight-min.js',
		'app/libs/fancybox/dist/jquery.fancybox.js',
		'app/libs/fancybox/dist/jquery.fancybox.pack.js',

		'app/libs/upload/dist/jquery.ui.widget.js',
		'app/libs/upload/dist/jquery.iframe-transport.js',
		'app/libs/upload/dist/jquery.fileupload.js',
		'app/libs/upload/dist/jquery.fileupload-process.js',
		'app/libs/upload/dist/jquery.fileupload-image.js',
		'app/libs/upload/dist/jquery.fileupload-validate.js',
		'app/libs/upload/dist/upload-kit.min.js',


		'app/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/_default/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('default-browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app/_default'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('default-min-css', function() {
	return gulp.src('app/sass/all.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/_default/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('default-normal-css', function() {
	return gulp.src(['app/sass/fonts.sass','app/sass/main.sass','app/sass/media.sass'])
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('app/_default/css/normal'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('default-fileinclude', function() {
  gulp.src(['app/html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'app/html'
    }))
    .pipe(gulp.dest('app/_default'));
});

gulp.task('default-img-min', function() {
	return gulp.src(['app/img/**/*','app/img/**/**/*'])
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('app/_default/img')); 
});

gulp.task('default-fonts', function() {
	return gulp.src(['app/fonts/**/*','app/fonts/**/**/*'])
	.pipe(gulp.dest('app/_default/fonts')); 
});

gulp.task('default-watch', ['default-fileinclude','default-min-css','default-normal-css','default-js','default-browser-sync'], function() {
	gulp.watch('app/sass/*.sass', ['default-min-css']);
	gulp.watch('app/libs/**/*.js', ['default-js']);
	gulp.watch('app/html/*.html', ['default-fileinclude']);
	gulp.watch('app/_default/*.html', browserSync.reload);
});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['default-watch','default-img-min','default-fonts']);



// Normal
gulp.task('normal-js', function() {
	return gulp.src('app/js/common.js')
	.pipe(gulp.dest('app/_normal/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('normal-libs-js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery-3.3.1.min.js',
		'app/libs/maskedinput/jquery.maskedinput.min.js',
		'app/libs/bootstrap/dist/bootstrap.min.js',
		'app/libs/scrollbar/dist/jquery.mCustomScrollbar.js',
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/_normal/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('normal-browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app/_normal'//Обновляет стран браузера когда компилир html
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('normal-libs-min-css', function() {
	return gulp.src('app/sass/all.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/_normal/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('normal-css', function() {
	return gulp.src(['app/sass/fonts.sass','app/sass/main.sass','app/sass/media.sass', 'app/sass/icomoon.sass'])
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('app/_normal/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('normal-fileinclude', function() {
  gulp.src(['app/html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'app/html'
    }))
    .pipe(gulp.dest('app/_normal'));
});

gulp.task('normal-img-min', function() {
	return gulp.src(['app/img/**/*','app/img/**/**/*'])
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('app/_normal/img')); 
});

gulp.task('normal-fonts', function() {
	return gulp.src(['app/fonts/**/*','app/fonts/**/**/*'])
	.pipe(gulp.dest('app/_normal/fonts')); 
});

gulp.task('normal-watch', ['normal-fileinclude','normal-libs-min-css','normal-css','normal-js','normal-libs-js','normal-browser-sync'], function() {
	gulp.watch('app/sass/all.sass', ['normal-libs-min-css']);
	gulp.watch(['app/sass/fonts.sass','app/sass/main.sass','app/sass/media.sass', 'app/sass/icomoon.sass'], ['normal-css']);
	gulp.watch('app/libs/**/*.js', ['normal-libs-js']);
	gulp.watch('app/js/common.js', ['normal-js']);
	gulp.watch('app/html/*.html', ['normal-fileinclude']);
	gulp.watch('app/_normal/*.html', browserSync.reload);
});

gulp.task('normal', ['normal-watch','normal-img-min','normal-fonts']);
