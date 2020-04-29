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