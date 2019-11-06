# Simple mobile menu
+ [Simple usage](#)
+ [Settings](#)
  - [Media query](#)
  - [Menu position](#)
  - [Buttons settings](#)
  - [Overlay settings](#)
  - [Swipes](#)
  - [Events](#)
  - [Fade mode](#)
  - [Custom animations](#)
  - [Functions](#)
  - [All settings](#)

The menu created by this script will smoothly be moving to the automatically defined side or the side set by the developer (`toLeft`, `toRight`, `toTop`, `toBottom`).
The menu is active only on mobile phones and tablets, by default. And supports touch events. It can be swiped to the initial side.
Also, the menu can be closed  by the following:
+ during page scrolling by 50 px (can be changed);
+ by pressing key ESC;
+ with clicking the overlay;
+ with clicking the close button.

The menu will be wrapped into a container with `overflow: hidden` during the opening to avoid horizontal page scrolling.
The menu can be opened or closed at any moment by calling functions `menu.open()` or `menu.close()`.
Also, there are events `beforeopen`, `open`, `beforeclose`, `close`, which can be used for any actions on the web page.
Animation `transform: translate` is used, by default. Option `fade: true` can be set to add unique animations.
IE 11 suports it.
## Simple usage
Add the `script` tag before closing `<body>`:
```html
<script src="SimpleMenu.min.js"></script>
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
Class (`active` or set) and animation are added to the menu during the opening, by default. For correct work, some CSS-styles should be set.
```css
.css-selector-menu {
  display: none;
}
.css-selector-menu.active {
  display: initial; \\ block || flex || etc
}
```
Example [simple usage](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toLeft).html)
## Settings
### Media query
Создание меню и всех его функций можно регулировать css медиа-запросом:
```javascript
mediaQuery: '(max-width: 800px)'
```
Тогда меню будет создаваться и работать только на размерах экранов до 800px.
#### or desktop
По умолчанию меню создается и работает только на телфонах и планшетах.
```javascript
desktop: false // it's default
```
Это поведение можно изменить, установив свойство `desktop: true`. Тогда меню будет создаваться и работать в любом случае.
### Menu position
The menu is set near the open button, by default. This action can be changed by setting the side in which the menu will be moving.
```javascript
toLeft: false    // it's default
toRight: false   // it's default
toBottom: false  // it's default
toTop: false     // it's default
```
Example with [toLeft](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toLeft).html)

Example with [toRight](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toRight).html)

Example with [toBottom](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toBottom).html)

Example with [toTop](https://i-did.github.io/mobile-menu-js/demo/simple-usage(toTop).html)
### Buttons settings
Можно задать несколько настроек для открывающей и закрывающей кнопкок:
```javascript
openBtn: {   // or closeBtn
  selector: 'css-selector',      // any CSS-selector
  class: 'class',                // the class which will be toggled
  addClass: 'animationend',      // when a class will be removed
  removeClass: 'animationstart', // when a class will be added
  toggleClass: 'animationend'    // when a class will be removed and added
}
```
Example with [buttons classes](https://i-did.github.io/mobile-menu-js/demo/buttons-settings.html)
Example with [buttons classes toggles](https://i-did.github.io/mobile-menu-js/demo/buttons-animations.html)
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
### Swipes
Меню реагирует на тач события - его можно закрыть, задвинув его в ту сторону, откуда оно появилось. Если вести меню пальцем и отпустить слишком рано, то оно может не закрыться, а вернуться в начальное положение. По умолчанию меню будет закрываться, когда пройдет 30% своей ширины. Такое поведение можно регулировать:
```javascript
swipeThreshold: 0.3 // 30%
```
 Также можно отключить тач события:
```javascript
swipe: false
````
### Events
Имеются несколько событий, к которым можно привязаться для совершения каких-то посторонних действий. Например, закрыть выпадающие списки внутри меню и т.д. Сделать это можно при помощи обычного `addEventListener`, передав первым аргументом одно из событий:
+ `'beforeopen'` - срабатывает перед открытием меню (сразу после нажатия на открывающую кнопку);
+ `'open'` - срабатывает когда меню полностью открылось;
+ `'beforeclose'` - срабаывает перед закрытием меню (сразу после нажатия на закрывающую кнопку);
+ `'close'` - срабатывает когда меню полностю закрылось.
```javascript
let mobileMenuDropdowns = document.querySelector('.side-menu-dropdown'),
  mobileMenu = new SimpleMenu({
    menu: '.side-menu',
    openBtn: '.side-menu-btn-open',
    closeBtn: '.side-menu-btn-close',
    desktop: true
  });

mobileMenu.addEventListener('beforeclose', () => 
  mobileMenuDropdowns.forEach(element => element.classList.remove('active'))
);
```
### Fade mode
Можно включить поддержу плавного исчезновения и появления при помощи свойства `fade`:
```javascript
fade: true // теперь меню будет плавно появляться и исчезать
```
Пример с [fade mode](https://i-did.github.io/mobile-menu-js/demo/fade-mode.html)
### Custom animation
Можно задать свои анимации при закрытии и открытии меню. Для этого нужно обязательно установить свойство `fade: true`, затем создать нужные css-анимации и указать имена анимаций в объектах `animationIn` и `animationOut`.
Анимация взята с [animate.css](https://daneden.github.io/animate.css/).
```css
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}
@keyframes zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}
```
```javascript
let mobileMenu = new SimpleMenu({
  menu: '.side-menu',
  openBtn: '.side-menu-btn-open',
  closeBtn: '.side-menu-btn-close',
  desktop: true,
  fade: true,
  animationIn: {
    name: 'zoomIn'
  },
  animationOut: {
    name: 'zoomOut'
  }
});
```
Пример с [кастомной анимацией](https://i-did.github.io/mobile-menu-js/demo/custom-animations.html)
### Functions
Меню можно вызвать и закрыть в любой момент, используя функции `menu.open()` и `menu.close()` соответственно, например:
```javascript
setTimeout(() => menu.open(), 1000); // меню откроется через 1 секунду
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