'use strict';

var _ = require('lodash');
var angular = require('angular');
var PIXI = require('pixi.js');

angular.module('jackpot.stage')
  .controller('StageController', StageController);

StageController.$inject = ['$rootScope', '$q', '$log', 'PlayerService'];

function StageController($rootScope, $q, $log, PlayerService) {

  var attempt = [];
  var attemptCount = 0;

  var vm = this;

  var items = [
    require('../data/galleries/01/DSC_1672sq.JPG'),
    require('../data/galleries/01/DSC_1724sq.JPG'),
    require('../data/galleries/01/DSC_1725sq.JPG'),
    require('../data/galleries/01/DSC_1723sq.JPG')
  ];

  var failSounds = [
    require('../data/sounds/ko/sam-again-1.mp3'),
    require('../data/sounds/ko/sam-ohnon-1.mp3'),
    require('../data/sounds/ko/sam-ohnon-2.mp3'),
    require('../data/sounds/ko/sarah-dommage.mp3'),
    require('../data/sounds/ko/sarah-fail.mp3'),
    require('../data/sounds/ko/sarah-ohnon.mp3'),
    require('../data/sounds/ko/simon-again.mp3'),
    require('../data/sounds/ko/simon-dommage.mp3'),
    require('../data/sounds/ko/sol-again-1.mp3'),
    //require('../data/sounds/ko/sol-again-2.mp3'),
    require('../data/sounds/ko/sol-again-3.mp3'),
    require('../data/sounds/ko/sol-why-1.mp3')
  ];

  var successSounds = [
    require('../data/sounds/ok/bravo4-05.mp3'),
    require('../data/sounds/ok/bravo4-01.mp3'),
    require('../data/sounds/ok/bravo4-02.mp3'),
    require('../data/sounds/ok/bravo4-03.mp3'),
    require('../data/sounds/ok/bravo4-04.mp3'),
    require('../data/sounds/ok/bravo4-06.mp3'),
    require('../data/sounds/ok/bravo4-07.mp3'),
    require('../data/sounds/ok/all-bravo-gagne+ba-1.mp3'),
    require('../data/sounds/ok/all-ouais+ba-1.mp3'),
    require('../data/sounds/ok/all-ouais-1.mp3'),
    require('../data/sounds/ok/all-super-1.mp3'),
    require('../data/sounds/ok/sol-bravo-1.mp3'),
    require('../data/sounds/ok/sol-champion+all-1.mp3')
  ];

  var middlePartWidth = 200;
  var pictureWidth = 680;
  var pictureHeight = 680;
  var gap = 8;

  var stage;
  var sprites;

  var timeline;

  var direction = '';

  function activate() {

    $rootScope.$on('randomClicked', function () {
      random();
    });

  }

  vm.initializeStage = function initializeStage(st) {

    stage = st;

    var maskLeft = new PIXI.Graphics();
    maskLeft.clear();
    maskLeft.beginFill(0, 0);
    maskLeft.drawRect(0, 0, (pictureWidth - middlePartWidth) / 2 - gap / 2, pictureHeight);
    maskLeft.endFill();

    var maskMiddle = new PIXI.Graphics();
    maskMiddle.clear();
    maskMiddle.beginFill(0, 0);
    maskMiddle.drawRect((pictureWidth - middlePartWidth) / 2 + gap / 2, 0, middlePartWidth - gap, pictureHeight);
    maskMiddle.endFill();

    var maskRight = new PIXI.Graphics();
    maskRight.clear();
    maskRight.beginFill(0, 0);
    maskRight.drawRect((pictureWidth - middlePartWidth) / 2 + middlePartWidth + gap / 2, 0, (pictureWidth - middlePartWidth) / 2 - gap / 2, pictureHeight);
    maskRight.endFill();

    stage.addChild(maskLeft);
    stage.addChild(maskMiddle);
    stage.addChild(maskRight);

    var masks = [maskLeft, maskMiddle, maskRight];
    sprites = [null, null, null];

    preload().then(function (resources) {

      for (var i = 0; i < 3; i++) {
        sprites[i] = _.map(resources, function (item) {
          var texture = PIXI.Texture.fromImage(item.url);
          var textureWidth = texture.baseTexture.width;
          var textureHeight = texture.baseTexture.height;
          var sprite = new PIXI.extras.TilingSprite(texture, textureWidth, textureHeight);
          sprite._texture = texture;
          sprite.alpha = 0;
          var filter = new PIXI.filters.BlurYFilter();
          filter.blur = 0;
          //filter.passes = 10;
          sprite.filters = [filter];

          sprite.mask = masks[i];

          stage.addChild(sprite);

          return sprite;
        });

      }

    }).then(function(){
      random();
    });

    PlayerService.initialize();

  };

  function random() {


    if (timeline) {
      timeline.stop();
    }

    timeline = new TimelineMax({onComplete: attemptFinished});

    var spriteIndices = _.map(sprites[0], function (item, index) {
      return index;
    });
    var spriteIndex;

    attempt = [];

    for (var i = 0; i < 3; i++) {

      _.forEach(sprites[i], function (sprite) {
        sprite.alpha = 0;
      });

      if (attemptCount < 4) {
        spriteIndex = _.random(0, spriteIndices.length - 1);
        spriteIndex = spriteIndices.splice(spriteIndex, 1);
      }
      else if (attemptCount == 4) {
        if (i == 0) {
          spriteIndex = _.random(0, sprites[i].length - 1);
        }
      }
      else {
        spriteIndex = _.random(0, sprites[i].length - 1);
      }

      attempt.push(spriteIndex);

      var itemTimeline = new TimelineMax();
      //starts
      var sprite = sprites[i][spriteIndex];
      sprite.alpha = 1;
      var enterDuration = 2;
      //var pauseDuration = 3;
      if (direction == 'topBottom') {
        itemTimeline.add(TweenLite.fromTo(sprite.tilePosition, enterDuration + i, {y: 0}, {
          y: sprite._texture.baseTexture.height * 10,
          ease: 'Power1.easeOut'
        }), 0);
      } else {
        itemTimeline.add(TweenLite.fromTo(sprite.tilePosition, enterDuration + i, {y: 0}, {
          y: -sprite._texture.baseTexture.height * 10,
          ease: 'Power1.easeOut'
        }), 0)
      }
      //itemTimeline.add(TweenLite.fromTo(sprite, enterDuration, {alpha: 0}, {alpha: 1, ease: 'Power3.easeInOut'}), 0);
      itemTimeline.add(TweenMax.fromTo(sprite.filters[0], enterDuration + i, {blur: 200}, {blur: 0, yoyo: true}), 0);

      timeline.insert(itemTimeline);

    }

    $log.debug('⚒ (' + attemptCount + ') : ' + attempt);

    if (attemptCount == 4) {
      PlayerService.prepare(successSounds[0]);
    } else {
      prepareRandomSoundFrom(isSuccess() ? successSounds : failSounds);
    }

    timeline.play();

  }

  function attemptFinished() {
    attemptCount++;
    if (isSuccess(attempt)) {
      $rootScope.$broadcast('attemptSucceeded');
    }else{
      $rootScope.$broadcast('attemptFailed');
    }
    PlayerService.play();
  }

  function isSuccess(){
    return attempt[0] === attempt[1] && attempt[1] === attempt[2];
  }


  function prepareRandomSoundFrom(from){
    if(from.length > 0){
      var url = from[_.random(0, from.length - 1)];
      PlayerService.prepare(url);
    }
  }

  function preload() {

    var deferred = $q.defer();

    var loader = new PIXI.loaders.Loader();
    loader.add(_.map(items, function (item) {
      return {url: item, crossOrigin: true, loadType: 2};
    }));
    loader.load(function (loader, resources) {
      deferred.resolve(resources);
    });

    return deferred.promise;

  }

  activate();

}
