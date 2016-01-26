'use strict';

var PIXI = require('pixi.js');

/**
 * @ngdoc service
 * @name escapefactoryAngularApp.ModelPage
 * @description
 * # ModelPage
 * Factory in the escapefactoryAngularApp.
 */

function ImagesLoaderBuffer() {
    this.defineModelProperties();
};

//TODO this is not a display object, je n'arrive pas à étendre ce brin de EventEmitter

ImagesLoaderBuffer.prototype = Object.create(PIXI.DisplayObject.prototype);
ImagesLoaderBuffer.prototype.constructor = ImagesLoaderBuffer;

ImagesLoaderBuffer.prototype.defineModelProperties = function () {

    var _media;
    Object.defineProperty(this, "media", {
        get: function () {
            return _media
        },
        set: function (media) {
            _media = media;
            if (this.assetsLoader) {
                _loaderIndex = -1;
                this.assetsLoader.reset();
            }
        }
    });

    var _loaderIndex = -1;
    Object.defineProperty(this, "loaderIndex", {
        get: function () {
            return _loaderIndex;
        },
        set: function (loaderIndex) {
            if (_loaderIndex != loaderIndex) {
                //this.unloadPreviousContent();
                _loaderIndex = loaderIndex;
                this.loadContent();
            }
        }
    });

    var _loaderRange = 1;
    Object.defineProperty(this, "loaderRange", {
        get: function () {
            return _loaderRange;
        },
        set: function (loaderRange) {
            _loaderRange = loaderRange;
        }
    });

    var _loadingUrls;
    Object.defineProperty(this, "loadingUrls", {
        get: function () {
            return _loadingUrls;
        },
        set: function (loadingUrls) {
            _loadingUrls = loadingUrls;
        }
    });

    var _loadedUrls = [];
    Object.defineProperty(this, "loadedUrls", {
        get: function () {
            return _loadedUrls;
        },
        set: function (loadedUrls) {
            _loadedUrls = loadedUrls;
        }
    });

    var _cachedUrls = [];
    Object.defineProperty(this, "cachedUrls", {
        get: function () {
            return _cachedUrls;
        },
        set: function (cachedUrls) {
            _cachedUrls = cachedUrls;
        }
    });

    var _loop;
    Object.defineProperty(this, "loop", {
        get: function () {
            return _loop;
        },
        set: function (loop) {
            _loop = loop;
        }
    });

    var _loaderComplete;
    Object.defineProperty(this, "loaderComplete", {
        get: function () {
            return _loaderComplete;
        },
        set: function (loaderComplete) {
            _loaderComplete = loaderComplete;
        }
    });
};

ImagesLoaderBuffer.prototype.addCachedUrl = function (media) {
    /*var cachedUrls = this.cachedUrls;
     if (cachedUrls && cachedUrls.length > this.loaderRange) {
     this.unloadContent(cachedUrls.shift().url);
     }
     this.cachedUrls.push(media);*/
};

ImagesLoaderBuffer.prototype.init = function () {
    this.loadNext();
};

ImagesLoaderBuffer.prototype.dispose = function () {
    if (this.assetsLoader) {
        this.assetsLoader.off('complete', this.onAssetsComplete.bind(this));
        this.assetsLoader.reset();
        this.assetsLoader = null;
    }
    if (this.cachedUrls && this.cachedUrls.length > 0) {
        var cachedUrlsLength = this.cachedUrls.length;
        for (var i = 0; i < cachedUrlsLength; i++) {
            var url = this.cachedUrls[i].url;
            this.unloadContent(url);
        }
    }
}

ImagesLoaderBuffer.prototype.reset = function () {
}

ImagesLoaderBuffer.prototype.unloadContent = function (url) {
    if (PIXI.utils.TextureCache[url]) {
        PIXI.utils.TextureCache[url].destroy(true);
    }
}

ImagesLoaderBuffer.prototype.loadIndex = function (index) {
    this.loaderIndex = index;
}

ImagesLoaderBuffer.prototype.loadContent = function () {
    var media = this.media[this.loaderIndex];
    var url = media.styles['img-12-lg'];
    this.loadingUrls = [
        {url: url, crossOrigin: true, loadType: 2, media: media}
    ];
    this.assetsLoader = new PIXI.loaders.Loader();
    this.assetsLoader.on('complete', this.onAssetsComplete.bind(this));
    this.assetsLoader.add(this.loadingUrls);
    this.assetsLoader.load();
}

ImagesLoaderBuffer.prototype.loadNext = function () {
    if (this.loaderIndex == this.media.length - 1) {
        if (this.loop == true) {
            this.loaderIndex = 0;
        } else {
            this.loaderComplete = true;
        }
    } else {
        this.loaderIndex += this.loaderRange;
    }
};

ImagesLoaderBuffer.prototype.onAssetsComplete = function () {
    if (this.loadingUrls) {
        for (var i = 0; i < this.loadingUrls.length; i++) {
            var loadedUrlObject = this.loadingUrls[i];
            this.addCachedUrl(loadedUrlObject);
        }
        this.loadedUrls = this.loadingUrls.concat();
        this.loadingUrls = null;
        this.emit('rangeLoaded');
    }
};

module.exports = ImagesLoaderBuffer;
