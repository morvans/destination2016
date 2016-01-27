var angular = require('angular');

'use strict';
module.exports = angular
  .module('madeinlune.system', [])
  .name;

require('./page-visibility');
require('./request-animation-frame-manager');
require('./toggle-full-screen');
require('./toggle-music');

