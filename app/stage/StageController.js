'use strict';

var _ = require('lodash');
var angular = require('angular');
var PIXI = require('pixi.js');

angular.module('jackpot.stage')
  .controller('StageController', StageController);

StageController.$inject = ['$rootScope', '$q', '$log'];

function StageController($rootScope, $q, $log) {

  var attempt = [];
  var attemptCount = 0;

  var vm = this;

  var items = [
    require('../data/galleries/01/DSC_1672sq.JPG'),
    require('../data/galleries/01/DSC_1724sq.JPG'),
    require('../data/galleries/01/DSC_1725sq.JPG'),
    require('../data/galleries/01/DSC_1723sq.JPG')
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

      random();


    });


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

    $log.debug(attemptCount + ' > ' + attempt);

    timeline.play();
  }

  function attemptFinished() {
    $log.debug('attemptFinished');
    attemptCount++;
    if (_.every(attempt, function (item) {
        return item == attempt[0];
      })) {
      $log.debug('win');
    }else{
      $log.debug('loz');
    }
  }

  function preload() {

    var deferred = $q.defer();

    var loader = new PIXI.loaders.Loader();
    loader.add(_.map(items, function (item) {
      return {url: item, crossOrigin: true, loadType: 2};
    }));
    loader.load(function (loader, resources) {
      // resources is an object where the key is the name of the resource loaded and the value is the resource object.
      // They have a couple default properties:
      // - `url`: The URL that the resource was loaded from
      // - `error`: The error that happened when trying to load (if any)
      // - `data`: The raw data that was loaded
      // also may contain other properties based on the middleware that runs.
      deferred.resolve(resources);
    });

    return deferred.promise;

  }

  activate();

}
