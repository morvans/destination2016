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
        .directive('pageVisibility', PageVisibility);


    PageVisibility.$inject = ['$document', '$rootScope', 'requestAnimationFrameManager'];

    function PageVisibility($document, $rootScope, requestAnimationFrameManager) {

        var directive = {
            scope: true,
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attr, ctrl) {

            var hidden = "hidden";
            var state;

            function activate() {



                // Standards:
                if (hidden in $document[0]) {
                    $document[0].addEventListener("visibilitychange", onchange);
                } else if ((hidden = "mozHidden") in $document[0]) {
                    $document[0].addEventListener("mozvisibilitychange", onchange);
                } else if ((hidden = "webkitHidden") in $document[0]) {
                    $document[0].addEventListener("webkitvisibilitychange", onchange);
                } else if ((hidden = "msHidden") in $document[0]) {
                    $document[0].addEventListener("msvisibilitychange", onchange);
                    // IE 9 and lower:
                } else if ("onfocusin" in $document[0]) {
                    $document[0].onfocusin = $document[0].onfocusout = onchange;
                    // All others:
                } else {
                    window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
                }

                // set the initial state (but only if browser supports the Page Visibility API)
                if ($document[0][hidden] !== undefined) {
                    onchange({type: $document[0][hidden] ? "blur" : "focus"});
                }
            }

            function onchange(evt) {
                var v = "visible", h = "hidden",
                    evtMap = {
                        focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
                    };

                evt = evt || window.event;
                if (evt.type in evtMap) {
                    state = evtMap[evt.type];
                } else {
                    state = this[hidden] ? "hidden" : "visible";
                }

                if(state=='visible'){
                    requestAnimationFrameManager.start();
                }else{
                    requestAnimationFrameManager.stop();
                }

                //systemService.documentVisibility = state;
                $rootScope.$emit('PageVisibility:pageVisibilityUpdated', state);
            }

            activate();
        }
    }
})();

