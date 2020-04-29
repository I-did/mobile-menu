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