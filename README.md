# Mobile menu

IE 11, Edge 12+, Firefox 14+, Chrome 18+, iOS 6.1+

Скрипт для быстрого создания мобильного меню на сайте. По умолчанию меню будет плавно выезжать из указанной стороны (слева, справа, сверху или снизу) и закрыть его можно при нажатии на закрывающую кнопку, нажатии вне меню, нажатии клавиши esc и свайпом в изначальную позицию меню. Также можно указать свою анимацию появления и исчезновения. Можно настроить фиксацию шапки. Прокрутка страницы запрещена.
Простая разметка меню:
```html
<header class="hdr container">
  <aside class="menu">
    <button type="button" class="menu-close">X</button>
    <div class="logo">logo</div>
    <nav class="nav">
      <a href="#" class="nav__item">Link 1</a>
      <a href="#" class="nav__item">Link 2</a>
      <a href="#" class="nav__item">Link 3</a>
      <a href="#" class="nav__item">Link 4</a>
    </nav>
    <span class="tel">+7(888)123-11-22</span>
  </aside>
</header>
```
Простое подключение:
```javascript
let menu = new MobileMenu({
  menu: '.menu',            // обязательно
  openBtn: '.burger',
  closeBtn: '.menu-close'   // может быть .burger
});
```

Все настройки:
```javascript
let menu = new MobileMenu({
  menu: '.menu',              // css-селектор меню, обязательно
  menuClass: 'active',        // класс, который будет переключаться при открытии и закрытии меню
  overlay: false,             // css-селектор затемнения контента
  overlayClass: 'active',     // класс, который будет переключаться при открытии и закрытии меню
  openBtn: '.btn, .btn2',     // css-селектор открывающих кнопок (можно несколько)
  openBtnClass: 'active',     // класс, который будет переключаться при открытии и закрытии меню
  toLeft: false,              // если true, меню будет выезжать в левую сторону (по умолчанию true)
  toRight: false,             // если true, меню будет выезжать в правую сторону
  toBottom: false,            // если true, меню будет выезжать ввниз
  toTop: false,               // если true, меню будет выезжать ввверх сторону
  fade: false,                // включить анимацию плавного появления и исчезновения для меню
  swipe: true,                // разрешить свайп (по умолчанию true)
  escToClose: true,           // закрытие меню при нажатии клавиши esc
  clickOverlayToClose: true,  // закрытие меню при нажатии на затемнение контента
  swipeThreshold: 0.35,       // на сколько процентов от ширины меню нужно свайпнуть, чтобы оно закрылось
  pageScroll: false,          // запрет прокрутки страницы пока меню открыто
  animation: {
    menu: {                   // настройка анимации меню (animation имеет приоритет над transition)
      open: {                 // настройка анимации открытия
        name: 'zoomIn',
        duration: 0.5,
        timigFunction: 'ease',
        delay: 0.25
      },
      close: {                // настройка анимации закрытия
        name: 'zoomOut',
        duration: 0.5,
        timigFunction: 'ease',
        delay: 0.25
      }
    },
    overlay: {}               // настройка анимации оверлея
  },              
  fixHeader: '',              // css-селектор шапки, которую будем фиксировать
  fixHeaderClass: 'fixed',    // класс, который будет переключаться при фиксации
  transition: {
    menu: {                    // настройка плавного перехода для меню (указаны настройки по умолчанию)
      property: 'transform',
      from: 'translate3d(100%, 0px, 0px)',
      to: 'translate3d(0px, 0px, 0px)',
      timigFunction: 'ease',
      delay: 0,
      duration: 0.5
    },
    overlay: {
      property: 'opacity',
      from: 0,
      to: 1,
      timigFunction: 'ease',
      delay: 0,
      duration: 0.5
    }
  }
});
```

Свойства и методы:
```javascript
menu.caller         // вернет кнопку, которая вызвала меню
menu.openMenu();    // откроет меню
menu.closeMenu();   // закроет меню
```

События:
```javascript
menu.addEventListener('menuinit', function);
menu.addEventListener('menubeforeopen', function);
menu.addEventListener('menuopen', function);
menu.addEventListener('menubeforeclose', function);
menu.addEventListener('menuclose', function);

menu.addEventListener('headerfixed', function);
menu.addEventListener('headerunfixed', function);

menu.addEventListener('overlayopen', function);
menu.addEventListener('overlayclose', function);
```