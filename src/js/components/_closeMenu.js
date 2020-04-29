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