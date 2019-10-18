# Simple mobile menu
Mobile menu with touch events. Native JavaScript. IE support (soon). Media query. Closing with swipemenu, scrollpage, overlayclick, esc. Custom animation. Open and close func. 'beforeopen', 'beforeclose', 'open', 'close' events.
## Simple usage
```javascript
'use strict'
window.addEventListener('DOMContentLoaded', function(){
  let sideMenu = new SimpleMenu({
    menu: 'css-selector' ,    // it's reqiured
    openBtn: 'css-selector',  // it's reqiured
    closeBtn: 'css-selector'  // it's reqiured
  });
});
```
Example [simple usage](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toLeft).html)
## Main settings
### Media query
```javascript
mediaQuery: '(max-width: 800px)'
```
#### or desktop
```javascript
desktop: false // it's default
```
### Menu position
By default, the menu positioned closer to the open button (only left or right side). But this behavior possible to change by setting the side in which will be moving the menu:
```javascript
toLeft: false    // it's default
toRight: false   // it's default
toBottom: false  // it's default
toTop: false     // it's default
```
Example with [toBottom](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toBottom).html)
## Other settings

### Buttons settings
```javascript
openBtn: {   // or closeBtn
  selector: 'css-selector',      // any CSS-selector
  class: 'class',                // the class which will be toggled
  addClass: 'animationend',      // when a class will be removed
  removeClass: 'animationstart', // when a class will be added
  toggleClass: 'animationend'    // when a class will be removed and added
}
```

### Overlay settings
By default, the overlay will be created automatically. But possible configure him:
```javascript
overlay: {
  bgc: 'rgba(200,0,0,0.5)',   // bacgkround-color
  zi: '10',                   // z-index
  css: 'border-radius: 50px'  // other css
}
```
Or choose him:
```javascript
overlay: {
  selector: 'css-selector'  // any CSS-selector
  class: 'class'            // the class which will be toggled
}
```
Or cancel him:
```javascript
overlay: false
```
### All settings
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