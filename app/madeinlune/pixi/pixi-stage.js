(function () {
    'use strict';

  var templateUrl = require('./pixi-stage-view.html');


  angular.module('madeinlune.pixi')
        .directive('pixiStage', PixiStage);

    PixiStage.$inject = ['$parse', '$window', 'requestAnimationFrameManager'];

    function PixiStage($parse, $window, requestAnimationFrameManager) {
        return {
            link: function postLink(scope, element, attrs) {

                var stageObject,
                    _dataWatcher,
                    _attributeWatcher,
                    _elementHeightWatcher,
                    _randomId = Math.random() * 0xFFFFFF;
                var stageColor;
                if (attrs.stageColor) {
                    stageColor = 0x000000 + parseInt(attrs.stageColor, 16);
                } else {
                    stageColor = 0x000000;
                }

                _elementHeightWatcher = scope.$watch(function () {
                    return element[0].offsetHeight;
                }, function () {
                    scope.invalidateSize();
                    _elementHeightWatcher();
                });

                var transparent;
                if (attrs.transparent) {
                    transparent = scope.$eval(attrs.transparent);
                } else {
                    transparent = false;
                }
                var antialias;
                if (attrs.antialias) {
                    antialias = scope.$eval(attrs.antialias);
                } else {
                    antialias = false;
                }
                var stage = new PIXI.Container();

                var renderer = PIXI.autoDetectRenderer(element[0].offsetWidth, element[0].offsetHeight, {transparent: transparent, backgroundColor: stageColor, antialias: antialias, resolution: 1});

                element[0].appendChild(renderer.view);

                scope.onEnterFrame = function () {
                    renderer.render(stage);
                }

                requestAnimationFrameManager.addContext('pixiStage' + _randomId, scope);

                if (!attrs.stageClass) {
                    alert('no stageClass!');
                    return;
                }

                stageObject = new window[attrs.stageClass]();
                //if (stageObject.addEventListener) {
                stageObject.on('pixiEvent', onPixiEvent);
                //}
                stageObject.width = element[0].offsetWidth;
                stageObject.height = element[0].offsetHeight;
                stageObject.init();
                stage.addChild(stageObject);

                for (var attributeName in attrs) {
                    if (stageObject.hasOwnProperty(attributeName)) {
                        createContextWatcher(attributeName);
                    }
                }

                function createContextWatcher(attributeName) {
                    _attributeWatcher = scope.$watch(function () {
                        return scope.$eval(attrs[attributeName]);
                    }, function (newValue, oldValue) {
                        stageObject[attributeName] = newValue;
                    });
                }

                function onPixiEvent(event) {
                    var type = event.type;
                    if (attrs[type]) {
                        var invoker = $parse(attrs[type]);
                        invoker(scope, {$event: event.data});
                    }
                }

                function invalidatePixiData(pixiData) {
                    if (stageObject.hasOwnProperty('data')) {
                        stageObject.data = pixiData;
                    }
                }

                if (attrs.pixiData) {
                    _dataWatcher = scope.$watch(function () {
                        return scope.$eval(attrs.pixiData);
                    }, function (newValue, oldValue) {
                        invalidatePixiData(newValue);
                    });
                }

                invalidatePixiData(scope.$eval(attrs.pixiData));

                var w = angular.element($window);

                w.bind('resize', function () {
                    scope.invalidateSize();
                });

                scope.invalidateSize = function () {
                    renderer.resize(element[0].offsetWidth, element[0].offsetHeight);
                    if (stageObject) {
                        stageObject.width = element[0].offsetWidth;
                        stageObject.height = element[0].offsetHeight;
                    }
                }

                scope.$on('$destroy', function () {
                    if (stageObject.dispose) {
                        stageObject.dispose();
                    }
                    if (_dataWatcher) {
                        _dataWatcher();
                    }
                    if (_attributeWatcher) {
                        _attributeWatcher();
                    }
                    if (_elementHeightWatcher) {
                        _elementHeightWatcher();
                    }
                    requestAnimationFrameManager.removeContext('pixiStage' + _randomId);
                });

                scope.invalidateSize();

            },
            templateUrl: templateUrl,
            replace: true,
            restrict: 'EA',
            scope: false
        };
    }
})();
