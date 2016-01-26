'use strict';

var AtelierGalleryPixi = require('./pixi/AtelierGalleryPixi');


angular
  .module('jackpot.tournette')
  .controller('TournetteController', TournetteController);


TournetteController.$inject = [];

function TournetteController() {


  var vm = this;

  function activate() {

    vm.gallery =
    {
      'type':'mediabox',
      'items': [{
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1672.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1723.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1724.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1672.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1723.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1724.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1672.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1723.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1724.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1725.JPG'}}]
      }, {
        'media': [{'styles': {'img-12-lg': 'data/galleries/01/DSC_1723.JPG'}}]
      }
      ]
    };


  }

  vm.revealGreetings = function revealGreetings(){



  };

  activate();

}

