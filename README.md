# Simple mobile menu

## Simple usage
Just add the `script` tag before closing `<body>`:
```html
<script src="SimpleMenu.min.js"></script>
```
In case IE (or other old browsers) support is needed:
```html
<script src="SimpleMenu.es5.min.js"></script>
```
Then add a few required settings:
```javascript
'use strict'
window.addEventListener('DOMContentLoaded', function(){
  let sideMenu = new SimpleMenu({
    menu: 'css-selector' ,    // it's reqiured
    openBtn: 'css-selector',  // it's reqiured
  });
});
```

```css
.css-selector-menu {
  display: none;
}
.css-selector-menu.active {
  display: initial; \\block || flex || etc
}
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
The menu is set near the open button, by default. This action can be changed by setting the side in which the menu will be moving.
```javascript
toLeft: false    // it's default
toRight: false   // it's default
toBottom: false  // it's default
toTop: false     // it's default
```
Example with [toBottom](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toBottom).html)
Example with [toTop](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toTop).html)
Example with [toLeft](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toLeft).html)
Example with [toRight](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toRight).html)
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
```javascript
openBtn: 'hamburger-btn',
closeBtn: 'hamburger-btn'
```

### Overlay settings
The overlay is generating automatically. It has default settings which can be changed by the following options:
```javascript
overlay: {
  bgc: 'rgba(200,0,0,0.5)',   // bacgkround-color
  zi: '10',                   // z-index
  css: 'border-radius: 50px'  // other css
}
```
The overlay can be chosen:
```javascript
overlay: {
  selector: 'css-selector'  // any CSS-selector
  class: 'class'            // the class which will be toggled
}
```
Or can be canceled:
```javascript
overlay: false
```
### Events
### Swipes
### Fade mode
### Custom animation
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