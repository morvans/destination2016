'use strict';

var templateUrl = require('./main.html');


angular
    .module('quiz.main')
    .directive('main', Main);


Main.$inject = [];

function Main() {

    var directive = {
        scope: true,
        restrict: 'E',
        controller: 'MainController',
        controllerAs: 'mainController',
        templateUrl: templateUrl,
        link: {post: linkFunc},
        replace: true
    };

    return directive;

    function linkFunc(scope, element, attr, appGroundController) {

        function activate() {
        }

        activate();

    }
}

