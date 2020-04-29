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