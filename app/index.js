require('./index.scss');
require('./madeinlune/system');
require('jquery');

var angular = require('angular');

angular.module('jackpot', [
    'madeinlune.system',
    require('./main')
]);

