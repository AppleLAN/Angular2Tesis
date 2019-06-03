/*******************************
        Define Sub-Tasks
*******************************/

module.exports = function(gulp) {

  var
    // rtl
    buildRTL     = require('../../../semantic/tasks/rtl/build'),
    watchRTL     = require('../../../semantic/tasks/rtl/watch')
  ;

  gulp.task('watch-rtl', 'Build all files as RTL', watchRTL);
  gulp.task('build-rtl', 'Watch files as RTL ', buildRTL);

};
