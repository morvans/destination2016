var angular = require('angular');

require('soundmanager2');

angular.module('jackpot.player').service('PlayerService', PlayerService);

PlayerService.$inject = ['$q', '$log'];

function PlayerService($q, $log) {

  var service = this;

  var ready = false;

  var pending, pendingSound;

  service.initialize = function initialize() {

    var deferred = $q.defer();

    soundManager.setup({
      'url': '/data/swf/',
      'preferFlash': false,
      'debugMode': true,
      'onready': function () {
        ready = true;
        deferred.resolve();
        if(pending){
          service.prepare(pending);
        }
      },
      'ontimeout': function () {
        deferred.reject();
      }
    });

    return deferred.promise;


  };

  service.prepare = function prepare(url) {
    if (ready) {
      if(pendingSound){
        pendingSound.destruct();
      }
      pendingSound = soundManager.createSound({'url':url, 'autoPlay':false, 'autoLoad': true});
      $log.debug('♫ Prepared sound: ' + pendingSound.id);
      pending = null;
    }else{
      $log.debug('♫ PlayerService not ready. Pending: ' + url);
      pending = url;
    }
  };

  service.play = function play() {
    if (pendingSound) {
      var playingSound = pendingSound;
      pendingSound = null;
      $log.debug('♫ Play ' + playingSound.id);
      playingSound.play({'onfinish':function(){
        $log.debug('♫ Cleanup ' + playingSound.id);
        playingSound.destruct();
      }});
    }
  };


}
