'use strict';

module.exports = angular.module('jackpot.stage', [
  require('../player')
]).name;

require('./stage');
require('./StageController');
