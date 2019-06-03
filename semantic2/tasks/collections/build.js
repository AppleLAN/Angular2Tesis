/*******************************
        Define Sub-Tasks
*******************************/

module.exports = function(gulp) {

  var
    // build sub-tasks
    buildJS      = require('../../../semantic/tasks/build/javascript'),
    buildCSS     = require('../../../semantic/tasks/build/css'),
    buildAssets  = require('../../../semantic/tasks/build/assets')
  ;

  // in case these tasks are undefined during import, less make sure these are available in scope
  gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
  gulp.task('build-css', 'Builds all css from source', buildCSS);
  gulp.task('build-assets', 'Copies all assets from source', buildAssets);

};
