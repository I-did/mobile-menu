# Simple mobile menu
Mobile menu with touch events.
## Simple usage
```javascript
'use strict'
window.addEventListener('DOMContentLoaded', function(){
	let sideMenu = new SimpleMenu({
		menu: 'css-selector' ,
		openBtn: 'css-selector',
		closeBtn: 'css-selector'
	});
});
```

## Settings of buttons
```javascript
openBtn: {   // or closeBtn
  selector: 'css-selector',      // any CSS-selector
  class: 'class',                // the class which will be toggled
  addClass: 'animationend',      // when a class will be removed
  removeClass: 'animationstart', // when a class will be added
  toggleClass: 'animationend'    // when a class will be removed and added
}
```

## All settings
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