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