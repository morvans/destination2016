var angular = require('angular');

require('soundmanager2');

angular.module('quiz.player').service('PlayerService', PlayerService);

PlayerService.$inject = ['$q'];

function PlayerService($q) {

    var service = this;

    service.initialize = function initialize() {

        var deferred = $q.defer();

        soundManager.setup({
            'url': '/data/swf/',
            onready: function () {
                deferred.resolve();
            },
            ontimeout: function () {
                deferred.reject();
            }
        });

        return deferred.promise;


    }

}