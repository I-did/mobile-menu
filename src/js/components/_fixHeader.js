let _ = this.ctx || this;
if (pageYOffset > _.fixHeaderThreshold && !_.$menu.classList.contains(_.options.menuClass)) {
  _.$headerParent.appendChild(_.$headerParent.replaceChild(_.$headerClone, _.$fixHeader));
  _.$fixHeader.classList.add('fixed');
  window.removeEventListener('scroll', _.fixHeaderHandler);
  window.addEventListener('scroll', _.unfixHeaderHandler);
  _.dispatchEvent(_.$fixHeader, 'headerfixed');
}
