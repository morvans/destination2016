'use strict';

module.exports = angular.module('quiz.main', [
    require('../player'),
    require('../tournette')
]).name;

require('./main');
require('./MainController');
