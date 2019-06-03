/*******************************
          Version Task
*******************************/

var
  release = require('../../semantic/tasks/config/project/release')
;

module.exports = function(callback) {
  console.log(release.title + ' ' + release.version);
};