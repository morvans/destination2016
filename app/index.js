require('./index.scss');
require('./madeinlune/system');

var angular = require('angular');

angular.module('jackpot', [
    'madeinlune.system',
    require('./main')
]);

