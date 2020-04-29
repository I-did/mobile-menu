let _ = this,
  menu = _.$menu;
  overlay = _.$overlay;

_.initEvents('remove');

menu.removeEventListener('touchstart', _.swipeStartHandler);
menu.removeEventListener('touchend', _.swipeEndHandler);
overlay && overlay.removeEventListener('click', _.closeMenu);

_.$menu = null;
_.$overlay = null;
_.$openBtn = null;
_.$closeBtn = null;
_.swipeObject.isSwipe = false;
_.swipeObject.isScroll = false;