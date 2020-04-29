;(function(factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    window.MobileMenu = factory();
  }
})(function() {
  
  MobileMenu = (function() {
    //=include _utils.js
    return mobileMenu;
  })();

  MobileMenu.prototype.assign = function(obj1, obj2) {
    for (let key in obj1) {
      if (obj2[key] === undefined) {
        obj2[key] = obj1[key];
      } else if (typeof obj2[key] === 'object') {
        this.assign(obj1[key], obj2[key]);
      }
    }
  };

  MobileMenu.prototype.init = function() {
    //=include _init.js
  };

  MobileMenu.prototype.initEvents = function(action) {
    //=include _initEvents.js
  };

  MobileMenu.prototype.dispatchEvent = function(element, eventName) {
    //=include _dispatchEvent.js 
  };

  MobileMenu.prototype.getTransform = function() {
    let mathces = this.$menu.style.transform.match(/\-?\d+\.?\d*/g);

    return {
      x: +mathces[0],
      y: +mathces[1]
    }
  };

  MobileMenu.prototype.initAnimEvents = function(element) {
    //=include _initAnimEvents.js
  };

  MobileMenu.prototype.playAnimation = function(element, direction) {
    //=include _playAnimation.js
  };

  MobileMenu.prototype.openMenu = function() {
    //=include _openMenu.js
  };

  MobileMenu.prototype.closeMenu = function() {
    //=include _closeMenu.js
  };

  MobileMenu.prototype.swipeStart = function() {
    //=include _swipeStart.js
  };

  MobileMenu.prototype.swipeAction = function() {
    //=include _swipeAction.js
  };

  MobileMenu.prototype.swipeEnd = function() {
    //=include _swipeEnd.js
  };

  MobileMenu.prototype.fixHeader = function() {
    //=include _fixHeader.js
  };

  MobileMenu.prototype.unfixHeader = function() {
    //=include _unfixHeader.js
  };

  return MobileMenu;
});