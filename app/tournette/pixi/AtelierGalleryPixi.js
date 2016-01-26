'use strict';

require("gsap");

var ImagesLoaderBuffer = require('../../madeinlune/pixi/images-loader-buffer');
var PIXI = require('pixi.js');
//var TimelineMax = require('gsap/src/uncompressed/TimelineMax');
//var TweenLite = require('gsap/src/uncompressed/TweenLite');

var is = require('is_js');


/**
 * @ngdoc service
 * @name escapefactoryAngularApp.ModelPage
 * @description
 * # ModelPage
 * Factory in the escapefactoryAngularApp.
 */
function AtelierGalleryPixi() {
    PIXI.Container.call(this);
    TweenLite.set(this, {alpha: 0});
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
    var _direction;
    Object.defineProperty(this, "direction", {
        get: function () {
            return _direction
        },
        set: function (direction) {
            _direction = direction;
        }
    });
    var _slideIndex;
    Object.defineProperty(this, "slideIndex", {
        get: function () {
            return _slideIndex;
        },
        set: function (slideIndex) {
            if (_slideIndex != slideIndex) {
                _slideIndex = slideIndex;
            }
        }
    });

    var _userSlideIndex;
    Object.defineProperty(this, "userSlideIndex", {
        get: function () {
            return _userSlideIndex;
        },
        set: function (userSlideIndex) {
            if (_userSlideIndex != userSlideIndex && userSlideIndex != this.slideIndex) {
                _userSlideIndex = userSlideIndex;
                this.slideIndex = userSlideIndex;
                this.slideLifeComplete = undefined;
                this.imagesLoaderBuffer.loadIndex(_userSlideIndex);
                if (this.currentTimeline) {
                    this.currentTimeline.kill();
                }
            }
        }
    });

    var _time;
    Object.defineProperty(this, "time", {
        get: function () {
            return _time;
        },
        set: function (time) {
            _time = time;
            this.timeline.time(_time, true);
        }
    });

    var _imageIndex;
    Object.defineProperty(this, "imageIndex", {
        set: function (imageIndex) {
            _imageIndex = imageIndex;
        }
    });

    var _slideLifeComplete;
    Object.defineProperty(this, "slideLifeComplete", {
        get: function () {
            return _slideLifeComplete;
        },
        set: function (slideLifeComplete) {
            _slideLifeComplete = slideLifeComplete;
            if (this.imagesLoaderBuffer && _slideLifeComplete == true && this.slideIndex == this.imagesLoaderBuffer.loaderIndex && this.paused == false) {
                this.createSlides(this.imagesLoaderBuffer.loadedUrls);
            }
        }
    });

    var _paused;
    Object.defineProperty(this, "paused", {
        get: function () {
            return _paused;
        },
        set: function (paused) {
            if (_paused != paused) {
                _paused = paused;
                this.invalidatePause();
            }
        }
    });

};


AtelierGalleryPixi.prototype = Object.create(PIXI.Container.prototype);
AtelierGalleryPixi.prototype.constructor = AtelierGalleryPixi;

AtelierGalleryPixi.prototype.init = function () {
};

AtelierGalleryPixi.prototype.invalidatePause = function () {
};

AtelierGalleryPixi.prototype.pause = function () {
    this.paused = true;
};

AtelierGalleryPixi.prototype.play = function () {
    this.paused = false;
    this.goNext();
};

AtelierGalleryPixi.prototype.createSlides = function (urls) {
    if (!this.shapeMask) {
        this.shapeMask = new PIXI.Graphics();
        this.addChild(this.shapeMask);
        this.mask = this.shapeMask;
    }
    //destroy previous slide
    if (this.gallerySprites.length > 1) {
        var slideToDestroy = this.gallerySprites.shift();
        this.removeChild(slideToDestroy);
        this.imagesLoaderBuffer.unloadContent(this.imagesLoaderBuffer.media[this.slideIndex].styles['img-12-lg'].url);
    }
    //creates new slide
    var urlsLength = urls.length;
    for (var i = 0; i < urlsLength; i++) {
        var url = urls[i];
        var texture = PIXI.Texture.fromImage(url.url);
        var textureWidth = texture.baseTexture.width;
        var textureHeight = texture.baseTexture.height;
        var sprite = new PIXI.extras.TilingSprite(texture, textureWidth, textureHeight);
        sprite.alpha = 0;
        var filter = new PIXI.filters.BlurYFilter();
        filter.blur = 0;
        //filter.passes = 10;
        sprite.filters = [filter];
        this.gallerySprites.push(sprite);
        this.addChild(sprite);
    }
    this.triggerEnterEffect(sprite);
    this.invalidateSize();
};

AtelierGalleryPixi.prototype.startPlaying = function (ancestor) {
    ancestor.emit('galleryStarted');
};

AtelierGalleryPixi.prototype.triggerEnterEffect = function (sprite) {
    this.emit('slideIndexChanged', {type: 'newSlide', value: {index: this.slideIndex}});
    this.slideLifeComplete = false;
    var spriteTexture = sprite.texture;
    var itemTimeline = new TimelineMax({onComplete: this.onSlideLifeComplete, onCompleteParams: [this]});
    //starts
    var enterDuration;
    if (this.contentReset == false) {
        enterDuration = 1;
        if (this.direction == 'topBottom') {
            itemTimeline.add(TweenLite.fromTo(sprite.tilePosition, enterDuration, {y: 0}, {y: spriteTexture.baseTexture.height * 10, ease: 'Power3.easeInOut'}), 0);
        } else {
            itemTimeline.add(TweenLite.fromTo(sprite.tilePosition, enterDuration, {y: 0}, {y: -spriteTexture.baseTexture.height * 10, ease: 'Power3.easeInOut'}), 0)
        }
        itemTimeline.add(TweenLite.fromTo(sprite, enterDuration, {alpha: 0}, {alpha: 1, ease: 'Power3.easeInOut'}), 0);
        itemTimeline.add(TweenMax.fromTo(sprite.filters[0], enterDuration, {blur: 200}, { blur: 0, yoyo: true}), 0);
    } else {
        enterDuration = 0.5;
        itemTimeline.add(TweenLite.fromTo(sprite, enterDuration, {alpha: 0}, {alpha: 1, ease: 'Power3.easeInOut'}), 0);
    }

    itemTimeline.addCallback(this.onSlideEnterComplete, "+=0", [this]);
    //console.log('this.timeline.duration() : '+this.timeline.duration());
    //pause
    var pauseDuration = 1;
    itemTimeline.set({}, {}, pauseDuration);
    itemTimeline.play();
    this.currentTimeline = itemTimeline;
};

AtelierGalleryPixi.prototype.onSlideLifeComplete = function (targetThis) {
    targetThis.slideLifeComplete = true;
};

AtelierGalleryPixi.prototype.onSlideEnterComplete = function (targetThis) {
    if (targetThis.paused == false) {
        targetThis.goNext();
    }
};

AtelierGalleryPixi.prototype.goNext = function () {
    this.imagesLoaderBuffer.loadNext();
    if(this.imagesLoaderBuffer.loaderComplete){
        this.emit('galleryComplete', {type: 'galleryComplete'});
    }
};

AtelierGalleryPixi.prototype.invalidateData = function () {
    var items = this.data.items ? this.data.items : this.data;
    var itemsLength = items.length;
    var item;
    var media;
    var mediaCollection = [];
    for (var i = 0; i < itemsLength; i++) {
        item = items[i];
        media = item.media[0];
        mediaCollection.push(media);
    }
    //
    this.reset();
    //
    if (!this.imagesLoaderBuffer) {
        this.imagesLoaderBuffer = new ImagesLoaderBuffer();
        this.imagesLoaderBuffer.loop = false;
        this.imagesLoaderBuffer.on('rangeLoaded', this.onRangeLoaded.bind(this));
        this.gallerySprites = [];
        TweenLite.to(this, 1, {alpha: 1});
    }
    this.imagesLoaderBuffer.media = mediaCollection;
    this.imagesLoaderBuffer.loadIndex(0);
};

AtelierGalleryPixi.prototype.reset = function () {
    this.contentReset = true;
    this.slideLifeComplete = undefined;
    this.pause();
};


AtelierGalleryPixi.prototype.onRangeLoaded = function () {
    //
    window.prerenderReady = true;
    //
    this.slideIndex = this.imagesLoaderBuffer.loaderIndex;
    if (this.slideLifeComplete == true || is.undefined(this.slideLifeComplete)) {
        this.createSlides(this.imagesLoaderBuffer.loadedUrls);
    }
    if (this.contentReset == true) {
        this.contentReset = false;
        this.paused = false;
        this.emit('galleryStarted');
    }
};

AtelierGalleryPixi.prototype.invalidateSize = function () {
    if (this.gallerySprites) {
        var gallerySpritesLength = this.gallerySprites.length;
        for (var i = 0; i < gallerySpritesLength; i++) {
            var sprite = this.gallerySprites[i];
            var scale = Math.max(this.width / sprite.width, this.height / sprite.height);
            sprite.scale.x = scale;
            sprite.x = (this.width - (sprite.width * scale)) / 2;
            sprite.scale.y = scale;
            sprite.y = (this.height - (sprite.height * scale)) / 2;
        }
    }
    if (this.shapeMask) {
        this.shapeMask.clear();
        this.shapeMask.beginFill();
        this.shapeMask.drawRect(0, 0, this.width, this.height);
        this.shapeMask.endFill();
    }
};

AtelierGalleryPixi.prototype.dispose = function () {
    this.reset();
    if (this.imagesLoaderBuffer) {
        this.imagesLoaderBuffer.off('rangeLoaded', this.onRangeLoaded.bind(this));
        this.imagesLoaderBuffer.dispose();
    }
    this.imagesLoaderBuffer = null;
    TweenLite.to(this, 1, {alpha: 0.2, onComplete: this.onDisposeEffectComplete.bind(this)});
    TweenLite.killDelayedCallsTo(this.startPlaying);
};

AtelierGalleryPixi.prototype.onDisposeEffectComplete = function () {
    while (this.gallerySprites.length > 0) {
        var slideToDestroy = this.gallerySprites.shift();
        this.removeChild(slideToDestroy);
    }
    this.parent.removeChild(this);
};

module.exports = AtelierGalleryPixi;
