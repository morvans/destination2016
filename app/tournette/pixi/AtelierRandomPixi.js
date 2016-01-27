'use strict';

/**
 * @ngdoc service
 * @name escapefactoryAngularApp.ModelPage
 * @description
 * # ModelPage
 * Factory in the escapefactoryAngularApp.
 */
function AtelierRandomPixi() {
    PIXI.Container.call(this);
    var _width;
    Object.defineProperty(this, "width", {
        get: function () {
            return _width
        },
        set: function (width) {
            _width = width;
            this.invalidateSize();
        }
    });
    var _height;
    Object.defineProperty(this, "height", {
        get: function () {
            return _height
        },
        set: function (height) {
            _height = height;
            this.invalidateSize();
        }
    });
    var _data;
    Object.defineProperty(this, "data", {
        get: function () {
            return _data
        },
        set: function (data) {
            _data = data;
            this.invalidateData();
        }
    });
    var _timeline;
    Object.defineProperty(this, "timeline", {
        get: function () {
            return _timeline
        },
        set: function (timeline) {
            _timeline = timeline;
        }
    });
};


AtelierRandomPixi.prototype = Object.create(PIXI.Container.prototype);
AtelierRandomPixi.prototype.constructor = AtelierRandomPixi;

AtelierRandomPixi.prototype.init = function () {
};

AtelierRandomPixi.prototype.pause = function () {

  if (this.leftGallery) {
    this.leftGallery.pause();
  }
  if (this.middleGallery) {
    this.middleGallery.pause();
  }
  if (this.rightGallery) {
    this.rightGallery.pause();
  }

};

AtelierRandomPixi.prototype.invalidateData = function () {
    this.leftGallery = new AtelierGalleryPixi();
    this.leftGallery.init();
    this.leftGallery.data = this.data[0];
    this.addChild(this.leftGallery);

    this.middleGallery = new AtelierGalleryPixi();
    this.middleGallery.init();
    this.middleGallery.direction = 'topBottom';
    this.middleGallery.data = this.data[1];
    this.addChild(this.middleGallery);
    //
    this.rightGallery = new AtelierGalleryPixi();
    this.rightGallery.init();
    this.rightGallery.data = this.data[2];
    this.addChild(this.rightGallery);
    //
    this.invalidateSize();
};

AtelierRandomPixi.prototype.invalidateSize = function () {

    var middleWidth = 200;

    if (this.leftGallery) {
        this.leftGallery.width = (this.width - middleWidth) / 2;
        this.leftGallery.height = this.height;
        this.leftGallery.offset = (this.leftGallery.width + middleWidth) / 2;
    }
    if (this.middleGallery) {
        this.middleGallery.width = middleWidth;
        this.middleGallery.height = this.height;
        this.middleGallery.position.x = this.leftGallery.width ;
    }
    if (this.rightGallery) {
        this.rightGallery.width = (this.width - middleWidth) / 2;
        this.rightGallery.height = this.height;
        this.rightGallery.position.x = this.leftGallery.width  + middleWidth;
        this.rightGallery.offset = -  this.leftGallery.offset;
    }
};

AtelierRandomPixi.prototype.dispose = function () {
    if (this.leftGallery) {
        this.leftGallery.dispose();
    }
    if (this.middleGallery) {
        this.middleGallery.dispose();
    }
    if (this.rightGallery) {
        this.rightGallery.dispose();
    }
    this.parent.removeChild(this);
};

module.exports = AtelierRandomPixi;

