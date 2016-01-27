'use strict';

require('gsap');

var templateUrl = require('./stage.html');

angular
  .module('jackpot.stage')
  .directive('stage', Stage);

Stage.$inject = [];

function Stage() {

  return {
    scope: true,
    restrict: 'E',
    controller: 'StageController',
    controllerAs: 'stageController',
    templateUrl: templateUrl,
    link: {post: linkFunc},
    replace: true
  };

  function linkFunc(scope, element, attr, stageController, $window) {

    var renderer,stage;

    renderer = PIXI.autoDetectRenderer(element[0].offsetWidth, element[0].offsetHeight, {transparent: true, antialias: true, resolution: 1});
    element[0].appendChild(renderer.view);

    stage = new PIXI.Container();

    var w = angular.element($window);
    w.bind('resize', function () {
      invalidateSize();
    });

    scope.$watch(function () {
      return element[0].offsetHeight;
    }, function () {
      invalidateSize();
    });

    stageController.initializeStage(stage);
    invalidateSize();

    TweenLite.ticker.addEventListener("tick", function(){
      renderer.render(stage);
    });


    function invalidateSize () {
      var scale = element[0].offsetWidth / 680;
      stage.scale.x = stage.scale.y = scale;
      renderer.resize( element[0].offsetWidth, element[0].offsetWidth);
    }
  }
}

