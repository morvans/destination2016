require('./index.scss');
require('soundmanager2');
require('./madeinlune/system');

var angular = require('angular');


angular.module('quiz', [
    'madeinlune.system',
    require('./main')
]);

