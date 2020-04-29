// arguments: element
let _ = this,
  menu = _.$menu,
  $elem = _['$' + element];

if ($elem) {
  let animation = _.options.animation[element],
    transition = _.options.transition[element],
    hideElement = function() {
      if (transition) {
        $elem.style[transition.property] = '';
        $elem.style.transition = '';
      } else {
        $elem.style.animation = '';
      }
      $elem.classList.remove('active');
      
      if ($elem === menu); {
        $elem.style.pointerEvents = '';
        if (!_.options.pageScroll) {
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
          _.$fakeScrollbar.style.display = 'none';
        }
        _.closed = true;
      }
      
      _.dispatchEvent($elem, element + 'close');
    },
    showElement = function() {
      _.dispatchEvent($elem, element + 'open');
      if ($elem === menu) {
        _.opened = true;
        menu.style.pointerEvents = 'auto';
      }
    };

  if (animation) {
    $elem.addEventListener('animationend', function() {
      if (event.animationName === animation.open.name) {
        showElement();
        // console.log(element + 'open');
      } else {
        hideElement();
        // console.log(element + 'close');
      }
    });
  } else if (transition) {
    $elem.addEventListener('transitionend', function() {
      if ($elem.style[transition.property] == transition.to) {
        showElement();
        // console.log(element + 'open');
      } else {
        hideElement();
        // console.log(element + 'close');
      }
    });
  }

}