var gulp = require('gulp');
var copy = require('copy');

gulp.task('default', defaultTask);

function defaultTask(done) {
  // Place code for your default task here
  copy('./src/**/*.tsTemplate', 'generators', done);
}
