'use strict';

var angular = require('angular');

module.exports = angular.module('jackpot.main', [
    require('../madeinlune/system'),
    require('../stage')
]).name;

require('./main');
require('./MainController');
