'use strict';

require('../madeinlune/pixi');

window.AtelierGalleryPixi = require('./pixi/AtelierGalleryPixi');
window.AtelierStagePixi = require('./pixi/AtelierStagePixi');


module.exports = angular.module('jackpot.tournette', [
  'madeinlune.pixi'
]).name;

require('./tournette');
require('./TournetteController');
