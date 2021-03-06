'use strict';

var templateUrl = require('./main.html');


angular
    .module('jackpot.main')
    .directive('main', Main);


Main.$inject = [];

function Main() {

    return {
        scope: true,
        restrict: 'E',
        controller: 'MainController',
        controllerAs: 'mainController',
        templateUrl: templateUrl,
        link: {post: linkFunc},
        replace: true
    };

    function linkFunc() {

        function activate() {
        }

        activate();

    }
}

