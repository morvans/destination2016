'use strict';

var AtelierGalleryPixi = require('./pixi/AtelierGalleryPixi');

var _ = require('lodash');

angular
  .module('jackpot.tournette')
  .controller('TournetteController', TournetteController);


TournetteController.$inject = [];

function TournetteController() {


  var vm = this;

  function activate() {

    var items = [{
      'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1672sq.JPG'}}]
    }, {
      'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1724sq.JPG'}}]
    }, {
      'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1725sq.JPG'}}]
    }, {
      'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1723sq.JPG'}}]
    }
    ];

    vm.doubleGallery = [{
      'type': 'mediabox',
      'items': []
    }, {
      'type': 'mediabox',
      'items': []
    }, {
      'type': 'mediabox',
      'items': []
    }];

    for(var i = 0; i < 3; i++){
      vm.doubleGallery[i].items = vm.doubleGallery[i].items.concat(_.shuffle(items),_.shuffle(items),_.shuffle(items),_.shuffle(items));
      vm.doubleGallery[i].items.push(items[items.length-1]);
    }

  }



  vm.revealGreetings = function revealGreetings(){



  };

  activate();

}

