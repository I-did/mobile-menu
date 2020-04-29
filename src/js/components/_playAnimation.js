// arguments: element, direction
let _ = this,
  $element = _['$' + element],
  animation = _.options.animation[element] && _.options.animation[element][direction],
  transition = _.options.transition[element];

  setTransition = function(position) {
    position = position || 'to';
    let property = transition.property,
      timigFunction = transition.timigFunction,
      delay = transition.delay + 's',
      duration = transition.duration + 's';

    if (!$element.style.transition) {
      $element.style.transition = property + ' ' + timigFunction + ' ' + duration + ' ' + delay;
    }

    $element.style[property] = transition[position];

  };

if (animation) {

  let name = animation.name,
    duration = (animation.duration || 0.5) + 's',
    delay = (animation.delay || 0) + 's',
    timigFunction = animation.timigFunction || 'ease';

  $element.style.animation = name + ' ' + timigFunction + ' ' + duration + ' ' + delay;

} else if (transition) {
  if (direction === 'open') {
    setTimeout(setTransition, 25);
  } else {
    setTransition('from');
  }
  
}