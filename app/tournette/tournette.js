'use strict';

var templateUrl = require('./tournette.html');


angular
  .module('quiz.tournette')
  .directive('tournette', Main);


Main.$inject = [];

function Main() {

  var directive = {
    scope: true,
    restrict: 'E',
    controller: 'TournetteController',
    controllerAs: 'tournetteController',
    templateUrl: templateUrl,
    link: {post: linkFunc},
    replace: true
  };

  return directive;

  function linkFunc(scope, element, attr, appGroundController) {

  }
}

