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
