(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name madeinlune.interactions:mouseMove
     * @description
     * # mouseMove
     */


    angular
        .module('madeinlune.system')
        .directive('toggleFullScreen', ToggleFullScreen);


    ToggleFullScreen.$inject = ['$document'];

    function ToggleFullScreen($document) {

        var directive = {
            scope: true,
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attr, ctrl) {

            $document[0].addEventListener('webkitfullscreenchange', onFullScreenChange);
            $document[0].addEventListener('mozfullscreenchange', onFullScreenChange);
            $document[0].addEventListener('fullscreenchange', onFullScreenChange);

            scope.isFullScreen = false;

            scope.toggleFullscreen = function () {
                if (!scope.isFullScreen) {
                    scope.isFullScreen = true;
                    launchIntoFullscreen($document[0].documentElement);
                } else {
                    scope.isFullScreen = false;
                    exitFullscreen();
                }
            }

            function onFullScreenChange() {
                scope.isFullScreen = document.fullScreen ||
                    document.mozFullScreen ||
                    document.webkitIsFullScreen;
            }

            function launchIntoFullscreen(element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            function exitFullscreen() {
                if ($document[0].exitFullscreen) {
                    $document[0].exitFullscreen();
                } else if ($document[0].mozCancelFullScreen) {
                    $document[0].mozCancelFullScreen();
                } else if ($document[0].webkitExitFullscreen) {
                    $document[0].webkitExitFullscreen();
                }
            }

            scope.$on('$destroy', function () {
            });

        }
    }
})();

