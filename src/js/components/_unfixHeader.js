let _ = this.ctx || this;

if (pageYOffset <= _.fixHeaderThreshold) {
  _.$headerParent.replaceChild(_.$fixHeader, _.$headerClone);
  _.$fixHeader.classList.remove('fixed');

  window.removeEventListener('scroll', _.unfixHeaderHandler);
  window.addEventListener('scroll', _.fixHeaderHandler);
  _.dispatchEvent(_.$fixHeader, 'headerunfixed');
}