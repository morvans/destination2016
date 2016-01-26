'use strict';

var AtelierGalleryPixi = require('./AtelierGalleryPixi');
var AtelierRandomPixi = require('./AtelierRandomPixi');

/**
 * @ngdoc service
 * @name escapefactoryAngularApp.ModelPage
 * @description
 * # ModelPage
 * Factory in the escapefactoryAngularApp.
 */
function AtelierStagePixi() {
    PIXI.Container.call(this);
    var _width;
    Object.defineProperty(this, "width", {
        get: function () {
            return _width;
        },
        set: function (width) {
            _width = width;
            this.invalidateSize();
        }
    });
    var _height;
    Object.defineProperty(this, "height", {
        get: function () {
            return _height;
        },
        set: function (height) {
            _height = height;
            this.invalidateSize();
        }
    });
    var _data;
    Object.defineProperty(this, "data", {
        get: function () {
            return _data;
        },
        set: function (data) {
            if (_data != data) {
                _data = data;
                this.invalidateData();
            }
        }
    });
    var _currentGallery;
    Object.defineProperty(this, "currentGallery", {
        get: function () {
            return _currentGallery;
        },
        set: function (currentGallery) {
            _currentGallery = currentGallery;
        }
    });
    var _userSlideIndex;
    Object.defineProperty(this, "userSlideIndex", {
        get: function () {
            return _userSlideIndex;
        },
        set: function (userSlideIndex) {
            _userSlideIndex = userSlideIndex;
            if (this.currentGallery) {
                this.currentGallery.userSlideIndex = _userSlideIndex;
            }
        }
    });
}


AtelierStagePixi.prototype = Object.create(PIXI.Container.prototype);
AtelierStagePixi.prototype.constructor = AtelierStagePixi;

AtelierStagePixi.prototype.init = function () {
};

AtelierStagePixi.prototype.dispose = function () {
    if (this.currentGallery) {
        this.currentGallery.dispose();
    }
};

AtelierStagePixi.prototype.invalidateData = function () {
    if (this.currentGallery) {
        this.oldGallery = this.currentGallery;
    }
    if (this.data.type == 'mediabox') {
        this.currentGallery = new AtelierGalleryPixi();
        this.currentGallery.init();

        this.addChild(this.currentGallery);
    } else {
        this.currentGallery = new AtelierRandomPixi();
        this.currentGallery.init();
        this.addChild(this.currentGallery);
        this.destroyCurrentGallery();
    }
    this.currentGallery.on('galleryStarted', this.onGalleryStarted.bind(this));
    this.currentGallery.on('galleryComplete', this.onGalleryComplete.bind(this));
    this.currentGallery.on('slideIndexChanged', this.onGallerySlideIndexUpdated.bind(this));
    this.currentGallery.data = this.data;
    //
    this.invalidateSize();
};

AtelierStagePixi.prototype.onGallerySlideIndexUpdated = function (event) {
    this.emit('pixiEvent', {type: 'newSlide', data: event.value});
};

AtelierStagePixi.prototype.onGalleryStarted = function () {
    this.destroyCurrentGallery();
};

AtelierStagePixi.prototype.onGalleryComplete = function () {
  this.currentGallery.pause();
    this.emit('pixiEvent', {type: 'galleryComplete'});
};

AtelierStagePixi.prototype.destroyCurrentGallery = function () {
    if (this.oldGallery) {
        this.oldGallery.off('galleryStarted', this.onGalleryStarted);
        this.oldGallery.off('galleryComplete', this.onGalleryComplete);
        this.oldGallery.off('slideIndexChanged', this.onGallerySlideIndexUpdated);
        this.oldGallery.dispose();
    }
}

AtelierStagePixi.prototype.invalidateSize = function () {
    if (this.currentGallery) {
        this.currentGallery.width = this.width;
        this.currentGallery.height = this.height;
    }
};

module.exports = AtelierStagePixi;
