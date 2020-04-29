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