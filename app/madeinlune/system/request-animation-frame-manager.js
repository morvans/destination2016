(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name medicisAngularApp.responsiveService
     * @description
     * # responsiveService
     * Service in the medicisAngularApp.
     */
    angular.module('madeinlune.system')
        .service('requestAnimationFrameManager', RequestAnimationFrameManager);

    RequestAnimationFrameManager.$inject = [];

    function RequestAnimationFrameManager() {

        var requestAnimationFrameManager = {};

        var _contexts = {};

        requestAnimationFrameManager.start = function () {
            TweenLite.ticker.addEventListener("tick", onEnterFrame);
        }

        requestAnimationFrameManager.stop = function () {
            TweenLite.ticker.removeEventListener("tick", onEnterFrame);
        }

        function onEnterFrame() {
            if (_contexts) {
                for (var key in _contexts) {
                    var context = _contexts[key];
                    if (typeof context.onEnterFrame == 'function') {
                        context.onEnterFrame();
                    }
                }
            }
        }

        requestAnimationFrameManager.addContext = function (key, context) {
            if (!_contexts[key]) {
                _contexts[key] = context;
            }
        }

        requestAnimationFrameManager.removeContext = function (key) {
            if (_contexts[key]) {
                delete _contexts[key];
            }
        }

        return requestAnimationFrameManager;
    }
})();
