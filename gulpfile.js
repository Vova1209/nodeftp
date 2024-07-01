var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

/** Configuration **/
var user = 'username';
var password = 'password';
var host = '91.223.223.132';
var port = 21;
var localFilesGlob = ['build/**']; // Уточнено шлях для всіх файлів у папці build
var remoteFolder = '/home/vdymyrpp/test'; // <- Вказує папку для завантаження

function getFtpConnection() {
	    return ftp.create({
		            host: '91.223.223.132',
		            port: '21',
		            user: 'vdymyrpp',
		            password: '27sGsei_fcjT',
		            parallel: 5,
		            log: gutil.log
		        });
}

function deployFTP() {
	    var conn = getFtpConnection();

	    return gulp.src(localFilesGlob, { base: '.', buffer: false })
	        .pipe(conn.newer(remoteFolder)) // only upload newer files
	        .pipe(conn.dest(remoteFolder));
}

// Експортуйте завдання як окремі функції
 gulp.task('ftp-deploy', deployFTP);
 gulp.task('default', gulp.series('ftp-deploy'));
