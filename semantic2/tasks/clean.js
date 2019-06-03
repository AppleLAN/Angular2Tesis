/*******************************
          Clean Task
*******************************/

var
  del    = require('del'),
  config = require('../../semantic/tasks/config/user'),
  tasks  = require('../../semantic/tasks/config/tasks')
;

// cleans distribution files
module.exports = function(callback) {
  return del([config.paths.clean], tasks.settings.del, callback);
};