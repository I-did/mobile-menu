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