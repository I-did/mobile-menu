# Simple mobile menu
```javascript
'use strict'
window.addEventListener('DOMContentLoaded', function(){
  let menu = new SimpleMenu({
    menu: {
      selector: 'css-selector',
      class: 'class',
      animationDuration: 0.5,
      animationTimigFunc: 'ease'
    },
    openBtn: {
      selector: 'css-selector',
      class: 'class',
      addClass: 'animationend',
      removeClass: 'animationstart',	
      toggleClass: ''
    },
    closeBtn: {
      selector: 'css-selector',
      class: 'class',
      addClass: 'animationend',
      removeClass: 'animationstart',
      toggleClass: ''
    },
    swipe: true,
    overlayClick: true,
    esc: true,
    pageScrolling: false,
    scrollingPxs: 200,
    overlay: {
      selector: '#overlay',
      bgc: 'red',
      zi: '15',
      css: 'cursor: pointer'
    },
    overlay: false,
    toTop: false,
    toBottom: false,
    toRight: false,
    toLeft: false,
    mediaQuery: '(max-width: 1000px)',
    fade: true,
    desktop: true
  });
});
```