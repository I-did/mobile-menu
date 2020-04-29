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
    function mobileMenu(options) {
      let _ = this,
        opt,
        def,
        ini;
    
      _.options = opt = options;
    
      _.defaults = def = {
        menuClass: 'active',
        overlay: false,
        overlayClass: 'active',
        openBtnClass: 'active',
        toLeft: false,
        toRight: false,
        toBottom: false,
        toTop: false,
        fade: false,
        swipe: true,
        escToClose: true,
        clickOverlayToClose: true,
        swipeThreshold: 0.35,
        pageScroll: false,
        animation: '',
        fixHeader: '',
        fixHeaderClass: 'fixed',
        transition: {
          menu: {
            property: 'transform',
            from: '',
            to: 'translate3d(0px, 0px, 0px)',
            timigFunction: 'ease',
            delay: 0,
            duration: 0.5
          },
          overlay: {
            property: 'opacity',
            from: 0,
            to: 1,
            timigFunction: 'ease',
            delay: 0,
            duration: 0.5
          }
        }
      }
    
      _.initials = ini = {
        $menu: null,
        $openBtn: null,
        $closeBtn: null,
        $fakeScrollbar: null,
        $fixHeader: null,
        $headerClone: null,
        $headerParent: null,
        $overlay: null,
        fixHeaderThreshold: 0,
        swipeObject: {
          isSwipe: false,
          isScroll: false,
          posInitX: 0,
          posX1: 0,
          posX2: 0,
          posInitY: 0,
          posY1: 0,
          posY2: 0,
          posFinal: 0
        }
        
      }
    
      _.assign(def, opt);
      _.assign(ini, _);
    
      // _.checkMediaHandler = {
      //   handleEvent: _.checkMedia,
      //   ctx: _,
      //   options: opt
      // }
    
      // _.openMenuHandler = {
      //   handleEvent: _.openMenu,
      //   ctx: _
      // }
    
      _.closeMenuHandler = {
        handleEvent: _.closeMenu,
        ctx: _
      }
    
      _.swipeStartHandler = {
        handleEvent: _.swipeStart,
        ctx: _
      }
    
      _.swipeActionHandler = {
        handleEvent: _.swipeAction,
        ctx: _
      }
    
      _.swipeEndHandler = {
        handleEvent: _.swipeEnd,
        ctx: _
      }
    
      _.fixHeaderHandler = {
        handleEvent: _.fixHeader,
        ctx: _
      }
    
      _.unfixHeaderHandler = {
        handleEvent: _.unfixHeader,
        ctx: _
      }
    
    
      _.closed = true;
      _.opened = false;
    
      _.init();
    
      return _.$menu;
    }
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
    let _ = this,
      body = document.body,
      options = _.options,
      menuTransition = options.transition.menu;
    
    _.$menu = document.querySelector(options.menu);
    _.$openBtn = document.querySelectorAll(options.openBtn);
    _.$closeBtn = document.querySelectorAll(options.closeBtn);
    options.overlay && (_.$overlay = document.querySelector(options.overlay));
    options.fixHeader && (_.$fixHeader = document.querySelector(options.fixHeader));
    
    let menu = _.$menu,
      overlay = _.$overlay,
      fixHdr = _.$fixHeader;
    
    if (!options.animation.menu) {
    
      if (options.fade) {
        menuTransition.property = 'opacity';
        menuTransition.from = 0;
        menuTransition.to = 1;
      } else {
        if (!options.toRight && !options.toLeft && !options.toTop && !options.toBottom) {
          options.toLeft = true;
        }
    
        let translateX = (options.toRight) ? '-100%' : (options.toLeft) ? '100%' : '0px',
          translateY = (options.toBottom) ? '-100%' : (options.toTop) ? '100%' : '0px';
    
        menuTransition.from = 'translate3d(' + translateX + ', ' + translateY + ', 0px)';
        // console.log(menuTransition);
      }
    }
    
    menu.openMenu = _.openMenu;
    menu.closeMenu = _.closeMenu;
    menu.ctx = _;
    
    if (overlay) {
      _.initAnimEvents('overlay');
    }
    
    if (!options.pageScroll) {
      _.$fakeScrollbar = document.querySelector('#fake-scrollbar');
    
      if (!_.$fakeScrollbar) {
        _.$fakeScrollbar = document.createElement('div');
        _.$fakeScrollbar.id = 'fake-scrollbar';
        _.$fakeScrollbar.style.cssText = 'display:none;pointer-events:none;position:fixed;top:0;left:0;width:100%;height:100%;overflow-y:scroll;z-index:9999;';
        body.appendChild(_.$fakeScrollbar);
      }
    }
    
    if (fixHdr) {
      _.$headerClone = fixHdr.cloneNode(true);
      _.$headerParent = fixHdr.parentElement;
      _.fixHeaderThreshold = fixHdr.getBoundingClientRect().bottom + pageYOffset;
      // console.log(_.fixHeaderThreshold);
    
      _.$headerClone.style.opacity = 0;
      _.$headerClone.style.pointerEvents = 'none';
    
      window.addEventListener('scroll', _.fixHeaderHandler);
    
      new MutationObserver(function(mutationsList, observer) {
        for (let i = 0; i < mutationsList.length; i++) {
          let mutation = mutationsList[i];
          if (mutation.type === 'attributes') {
            let fixedHdr = document.querySelector(options.fixHeader + '.' + options.fixHeaderClass);
            if (mutation.target.style.paddingRight) {
              if (fixedHdr) {
                fixedHdr.style.width = 'calc(100% - ' + mutation.target.style.paddingRight + ')';
              }
              break;
            } else {
              if (fixedHdr) {
                fixedHdr.style.width = '';
              }
            }
          }
        }
      }).observe(body, {attributes: true});
    
      _.fixHeader();
    
    }
    _.dispatchEvent(menu, 'menuinit');
    _.initEvents('add');
    _.initAnimEvents('menu');
    
    // console.log(this);
    
  };

  MobileMenu.prototype.initEvents = function(action) {
    // arguments: action
    let _ = this,
      menu = _.$menu,
      overlay = _.$overlay,
      options = _.options,
      openButtons = _.$openBtn,
      closeButtons = _.$closeBtn,
      addClickEvent = function(elements, handler) {
        for (let i = 0; i < elements.length; i++) {
          if (elements[i]) {
            elements[i].addEventListener('click', handler);
            elements[i].ctx = _;
          }
        }
      },
      removeClickEvent = function(elements, handler) {
        for (let i = 0; i < elements.length; i++) {
          if (elements[i]) {
            elements[i].removeEventListener('click', handler);
          }
        }
      };
    
    if (action === 'add') {
      addClickEvent(openButtons, _.openMenu);
      addClickEvent(closeButtons, _.closeMenu);
    } else if (action === 'remove') {
      removeClickEvent(openButtons, _.openMenu);
      removeClickEvent(closeButtons, _.closeMenu);
    }
    
    if (options.swipe && !options.fade) {
      menu.addEventListener('touchstart', _.swipeStartHandler);
      menu.addEventListener('touchend', _.swipeEndHandler);
    }
    
    if (overlay) {
      overlay.ctx = _;
      if (options.clickOverlayToClose) {
        overlay.addEventListener('click', _.closeMenu);
      }
    }
    
    if (options.escToClose) {
      document.addEventListener('keyup', _.closeMenuHandler);
    }
  };

  MobileMenu.prototype.dispatchEvent = function(element, eventName) {
    // arguments: element, eventName
    if (typeof window.CustomEvent === "function") {
      let evt = new CustomEvent(eventName);
      element.dispatchEvent(evt);
    } 
  };

  MobileMenu.prototype.getTransform = function() {
    let mathces = this.$menu.style.transform.match(/\-?\d+\.?\d*/g);

    return {
      x: +mathces[0],
      y: +mathces[1]
    }
  };

  MobileMenu.prototype.initAnimEvents = function(element) {
    // arguments: element
    let _ = this,
      menu = _.$menu,
      $elem = _['$' + element];
    
    if ($elem) {
      let animation = _.options.animation[element],
        transition = _.options.transition[element],
        hideElement = function() {
          if (transition) {
            $elem.style[transition.property] = '';
            $elem.style.transition = '';
          } else {
            $elem.style.animation = '';
          }
          $elem.classList.remove('active');
          
          if ($elem === menu); {
            $elem.style.pointerEvents = '';
            if (!_.options.pageScroll) {
              document.body.style.overflow = '';
              document.body.style.paddingRight = '';
              _.$fakeScrollbar.style.display = 'none';
            }
            _.closed = true;
          }
          
          _.dispatchEvent($elem, element + 'close');
        },
        showElement = function() {
          _.dispatchEvent($elem, element + 'open');
          if ($elem === menu) {
            _.opened = true;
            menu.style.pointerEvents = 'auto';
          }
        };
    
      if (animation) {
        $elem.addEventListener('animationend', function() {
          if (event.animationName === animation.open.name) {
            showElement();
            // console.log(element + 'open');
          } else {
            hideElement();
            // console.log(element + 'close');
          }
        });
      } else if (transition) {
        $elem.addEventListener('transitionend', function() {
          if ($elem.style[transition.property] == transition.to) {
            showElement();
            // console.log(element + 'open');
          } else {
            hideElement();
            // console.log(element + 'close');
          }
        });
      }
    
    }
  };

  MobileMenu.prototype.playAnimation = function(element, direction) {
    // arguments: element, direction
    let _ = this,
      $element = _['$' + element],
      animation = _.options.animation[element] && _.options.animation[element][direction],
      transition = _.options.transition[element];
    
      setTransition = function(position) {
        position = position || 'to';
        let property = transition.property,
          timigFunction = transition.timigFunction,
          delay = transition.delay + 's',
          duration = transition.duration + 's';
    
        if (!$element.style.transition) {
          $element.style.transition = property + ' ' + timigFunction + ' ' + duration + ' ' + delay;
        }
    
        $element.style[property] = transition[position];
    
      };
    
    if (animation) {
    
      let name = animation.name,
        duration = (animation.duration || 0.5) + 's',
        delay = (animation.delay || 0) + 's',
        timigFunction = animation.timigFunction || 'ease';
    
      $element.style.animation = name + ' ' + timigFunction + ' ' + duration + ' ' + delay;
    
    } else if (transition) {
      if (direction === 'open') {
        setTimeout(setTransition, 25);
      } else {
        setTransition('from');
      }
      
    }
  };

  MobileMenu.prototype.openMenu = function() {
    let _ = this.ctx || this,
      body = document.body,
      options = _.options,
      menu = _.$menu,
      overlay = _.$overlay,
      menuTransition = options.transition.menu,
      menuAnimation = options.animation.menu,
      overlayTransition = options.transition.overlay,
      overlayAnimation = options.animation.overlay,
      fakeScrollbar = _.$fakeScrollbar,
      openButtons = _.$openBtn;
    
    if (_.closed) {
      _.closed = false;
    
      _.dispatchEvent(menu, 'menubeforeopen');
    
      if (!menuAnimation) {
    
        if (options.fade) {
          menu.style.opacity = 0;
        } else {
          menu.style.transform = menuTransition.from;
        }
    
        menu.style.transition =
        menuTransition.property + ' ' + menuTransition.duration + 's ' +
        menuTransition.delay + 's ' + menuTransition.timigFunction;
    
      }
    
      if (!overlayAnimation && overlay) {
        _.$overlay.style[overlayTransition.property] = overlayTransition.from;
      }
    
      if (openButtons.length) {
        for (let i = 0; i < openButtons.length; i++) {
          openButtons[i].classList.add(options.openBtnClass)
        }
      }
    
      if (!options.pageScroll) {
        fakeScrollbar.style.display = 'block';
        body.style.paddingRight = fakeScrollbar.offsetWidth - fakeScrollbar.clientWidth + 'px';
        body.style.overflow = 'hidden';
      }
    
      menu.classList.add(options.menuClass);
      _.playAnimation('menu', 'open');
    
      if (overlay) {
        overlay.classList.add(options.overlayClass)
        _.playAnimation('overlay', 'open');
      }
    
      menu.caller = this;
      menu.scrollTop = 0;
      menu.style.pointerEvents = 'none';
    }
  };

  MobileMenu.prototype.closeMenu = function() {
    let _ = this.ctx || this,
      options = _.options,
      menu = _.$menu,
      overlay = _.$overlay,
      openButtons = _.$openBtn;
    
    if (event && event.type === 'keyup' && event.keyCode !== 27) {
      return;
    }
    
    if (_.opened) {
      _.opened = false;
    
      _.dispatchEvent(menu, 'menubeforeclose');
    
      if (openButtons.length) {
        for (let i = 0; i < openButtons.length; i++) {
          openButtons[i].classList.remove(options.openBtnClass)
        }
      }
    
      menu.style.pointerEvents = 'none';
      _.playAnimation('menu', 'close');
      if (overlay) {
        _.playAnimation('overlay', 'close');
      }
    }
  };

  MobileMenu.prototype.swipeStart = function() {
    let _ = this.ctx || this,
      menu = _.$menu,
      swipe = _.swipeObject,
      evt = event.touches[0] || window.event.touches[0];
    // console.log('swipe start');
    
    swipe.isSwipe = swipe.isScroll = false;
    swipe.posInitX = swipe.posX1 = +evt.clientX.toFixed();
    swipe.posInitY = swipe.posY1 = +evt.clientY.toFixed();
    
    menu.addEventListener('touchmove', _.swipeActionHandler);
    menu.style.transition = '';
  };

  MobileMenu.prototype.swipeAction = function() {
    let _ = this.ctx || this,
      menu = _.$menu,
      options = _.options,
      swipe = _.swipeObject,
      evt = event.touches[0] || window.event.touches[0];
    
    swipe.posY2 = swipe.posY1 - evt.clientY.toFixed();
    swipe.posY1 = evt.clientY.toFixed();
    
    swipe.posX2 = swipe.posX1 - evt.clientX.toFixed();
    swipe.posX1 = evt.clientX.toFixed();
    
    
    if (!swipe.isSwipe && !swipe.isScroll) {
      if (Math.abs(swipe.posY2) > 7) {
        swipe.isScroll = true;
        // console.log('is scroll');
      } else if (Math.abs(swipe.posY2) < 5) {
        // console.log('is swipe');
        swipe.isSwipe = true;
      }
    }
    
    let trf = _.getTransform();
    
    if (swipe.isSwipe && (options.toLeft && swipe.posX1 > swipe.posInitX) || (options.toRight && swipe.posX1 < swipe.posInitX)) {
      menu.style.transform = 'translate(' + (trf.x - swipe.posX2) + 'px, 0px)';
    } else if (swipe.isScroll && (options.toBottom && menu.offsetHeight + menu.scrollTop + 1 >= menu.scrollHeight && swipe.posY1 < swipe.posInitY) || (options.toTop && menu.scrollTop === 0 && swipe.posY1 > swipe.posInitY)) {
      event.preventDefault();
      menu.style.transform = 'translate(0px, ' + (trf.y - swipe.posY2) + 'px)';
    }
    
    // console.log('swipe action');
  };

  MobileMenu.prototype.swipeEnd = function() {
    let _ = this.ctx || this,
      menu = _.$menu,
      swipe = _.swipeObject,
      options = _.options,
      position = 'translate(0px, 0px)';
    
    swipe.posFinal = (options.toLeft || options.toRight) ? _.getTransform().x : _.getTransform().y;
    
    let posThreshold = menu.offsetWidth * options.swipeThreshold;
    
    if (Math.abs(swipe.posFinal) >= posThreshold) {
      _.closeMenu();
    } else {
      if (menu.style.transform !== position) {
        menu.style.transform = position;
        menu.style.transition = 'transform ' + options.transition.menu.duration + 's';
        menu.style.pointerEvents = 'none';
      }
    }
    
    // console.log('swipe end');
  };

  MobileMenu.prototype.fixHeader = function() {
    let _ = this.ctx || this;
    if (pageYOffset > _.fixHeaderThreshold && !_.$menu.classList.contains(_.options.menuClass)) {
      _.$headerParent.appendChild(_.$headerParent.replaceChild(_.$headerClone, _.$fixHeader));
      _.$fixHeader.classList.add('fixed');
      window.removeEventListener('scroll', _.fixHeaderHandler);
      window.addEventListener('scroll', _.unfixHeaderHandler);
      _.dispatchEvent(_.$fixHeader, 'headerfixed');
    }
    
  };

  MobileMenu.prototype.unfixHeader = function() {
    let _ = this.ctx || this;
    
    if (pageYOffset <= _.fixHeaderThreshold) {
      _.$headerParent.replaceChild(_.$fixHeader, _.$headerClone);
      _.$fixHeader.classList.remove('fixed');
    
      window.removeEventListener('scroll', _.unfixHeaderHandler);
      window.addEventListener('scroll', _.fixHeaderHandler);
      _.dispatchEvent(_.$fixHeader, 'headerunfixed');
    }
  };

  return MobileMenu;
});