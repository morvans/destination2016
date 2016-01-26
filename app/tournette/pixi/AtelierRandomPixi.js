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

AtelierRandomPixi.prototype.invalidateData = function () {
    this.leftGallery = new AtelierGalleryPixi();
    this.leftGallery.init();
    this.leftGallery.data = this.data[0];
    this.addChild(this.leftGallery);
    //
    this.rightGallery = new AtelierGalleryPixi();
    this.rightGallery.init();
    this.rightGallery.direction = 'topBottom';
    this.rightGallery.data = this.data[1];
    this.addChild(this.rightGallery);
    //
    this.invalidateSize();
};

AtelierRandomPixi.prototype.invalidateSize = function () {
    if (this.leftGallery) {
        this.leftGallery.width = this.width / 2;
        this.leftGallery.height = this.height;
    }
    if (this.rightGallery) {
        this.rightGallery.width = this.width / 2;
        this.rightGallery.height = this.height;
        this.rightGallery.position.x = this.width / 2;
    }
};

AtelierRandomPixi.prototype.dispose = function () {
    if (this.leftGallery) {
        this.leftGallery.dispose();
    }
    if (this.rightGallery) {
        this.rightGallery.dispose();
    }
    this.parent.removeChild(this);
};

module.exports = AtelierRandomPixi;

