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
        .directive('toggleMusic', ToggleMusic);


    ToggleMusic.$inject = ['audioManager'];

    function ToggleMusic(audioManager) {

        var directive = {
            scope: true,
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attr, ctrl) {

            scope.mute = audioManager.mute;

            scope.toggleMute = function(){
                scope.mute = audioManager.toggleMute();
            }

        }
    }
})();

