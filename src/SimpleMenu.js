;(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof exports === "object") {
		module.exports = factory();
	} else {
		window.SimpleMenu = factory();
	}
})(function() {

	let _,
		__,
		opt,
		head = document.head,
		body = document.body;

	class SimpleMenu {
		constructor(options) {
			_ = this;

			_.defaults = {
				menu: {
					selector: '',
					class: 'active',
					animationIn: 'fi',
					animationOut: 'fo',
					animationDuration: 0.5,
					animationDelay: 0,
					animationTimigFunc: 'ease'
				},
				openBtn: {
					selector: '',
					class: '',
					toggleClass: '',
					addClass: 'animationstart',
					removeClass: 'animationstart'
				},
				closeBtn: {
					selector: '',
					class: '',
					toggleClass: '',
					addClass: 'animationstart',
					removeClass: 'animationstart'
				},
				overlay: {
					selector: '',
					class: 'active',
					bgc: 'rgba(0,0,0,.5)',
					zi: '10',
					css: '',
					animationDuration: 0.5,
					animationTimigFunc: 'ease'
				},
				desktop: false,
				mediaQuery: '',
				toTop: false,
				toBottom: false,
				toLeft: false,
				toRight: false,
				fade: false,
				swipe: true,
				swipeThreshold: 0.5,
				fixingHeader: {
					selector: '',
					class: '',
					fixedAnimation: ''
				}
			}

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				console.log('mobile');
			} else {
				console.log('no mobile');
			}

			opt = _.options = options || {}

			// Сравниваем дефолт и опшнс
			// Если опция найдена
			// и если опция не строка, то
			// перебрать такой же дефолт и если в опции этого свойсвта нет, то вставляем из дефолта
			// Если опция строка, а дефолт объект, то
			// ставим селектор
			// ставим опцию
			for (let name in _.defaults) {
				if (opt[name] !== undefined) {
					if (typeof opt[name] !== 'string' && opt[name] !== false) {
						for (let prop in _.defaults[name]) {
							if (opt[name][prop] === undefined) {
								opt[name][prop] = _.defaults[name][prop];
							}
						}
					} else if (typeof opt[name] === 'string' && typeof _.defaults[name] !== 'string') {
						_.defaults[name].selector = opt[name];
						opt[name] = _.defaults[name];
					}
				} else {
					opt[name] = _.defaults[name];
				}
			}

			if (opt.mediaQuery !== '') {
				opt.desktop = false;
			}

			// Сделать функцию проверки медиа-запроса

			delete _.defaults;
			_.init();
			_.initOverlay();
			_.initMenu();
		}

		initOverlay() {
			_.overlay = (function() {
				let ovl = opt.overlay,
					tag;

				if (ovl === false) {
					return false;
				} else {
					// Если селектор не передан, то создаем свой оверлей
					if (ovl.selector === '') {
						tag = document.createElement('div');
						tag.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:${ovl.bgc};z-index:${ovl.zi};${ovl.css}`;
						ovl.open = function() {
							body.appendChild(this.tag);
							_.setAnimationFor(this, this.animationIn);
						}
						ovl.close = function() {
							_.setAnimationFor(this, this.animationOut);
							this.tag.addEventListener('animationend', () => body.removeChild(this.tag), {once: true});
						}
						_.buildAnimation(ovl, ['fi', 'fo'], ['opacity:0', 'opacity:1']);
						_.insertAnimation(opt.animationIn, opt.animationOut);
					} else {
						tag = document.querySelector(ovl.selector || ovl);
						ovl.open = function() {
							this.tag.classList.add(ovl.class);
						}
						ovl.close = function() {
							this.tag.classList.remove(ovl.class);
						}
					}
					ovl.tag = tag;
					return (tag) ? ovl : console.error('You\'rs overlay is not found!');
				}				
			})();
		}

		initMenu() {
			_.menu = (function() {
				let menu = _.findElement(opt.menu, 'Menu');
				__ = menu;

				function buttonToggleClass() {
					for (let btn of arguments) {
						if (btn.class) {
							if (btn.toggleClass) {
								__.tag.addEventListener(btn.toggleClass, () => btn.tag.classList.toggle(btn.class));
							} else {
								__.tag.addEventListener((btn.addClass === 'animationstart') ? 'beforeopen' : 'open', () => btn.tag.classList.add(btn.class));
								__.tag.addEventListener((btn.removeClass === 'animationstart') ? 'beforeclose' : 'close', () => btn.tag.classList.remove(btn.class));
							}
						}
					}
				}

				buttonToggleClass(_.openBtn, _.closeBtn);

				__.open = function() {
					__.open.container();
					__.tag.classList.add(__.class);
					_.setAnimationFor(__, __.animationIn);
					if (_.overlay) {
						_.overlay.open();
					}
					__.tag.dispatchEvent(new Event('beforeopen'));
					__.tag.addEventListener('animationend', function() {
							__.tag.dispatchEvent(new Event('open'));
					}, {once: true});
				}

				__.close = function() {
					_.setAnimationFor(__, __.animationOut);
					if (_.overlay) {
						_.overlay.close();
					}
					__.tag.dispatchEvent(new Event('beforeclose'));
					__.tag.addEventListener('animationend', function() {
							__.tag.classList.remove(__.class);
							__.open.container();
							__.tag.dispatchEvent(new Event('close'));
					}, {once:true});
				}

				if (!opt.fade) {
					__.container = document.createElement('div');
					__.container.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100vh;overflow:hidden;';
					__.container.style.top = getComputedStyle(__.tag).top;
					__.container.style.bottom = getComputedStyle(__.tag).bottom;
					
					__.contained = false;
					__.tag.style.top = 0;
					__.parent = __.tag.parentElement;

					__.open.container = function() {
						if (!__.contained) {
							__.parent.appendChild(__.container);
							__.container.appendChild(__.tag);	
							__.contained = true;							
						} else {
							__.parent.appendChild(__.tag);
							__.parent.removeChild(__.container);
							__.contained = false;
						}
					}
					if (!opt.toTop && !opt.toBottom && !opt.toLeft && !opt.toRight) {
						let windowWidth = window.screen.width,
							openBtnCoords = {
								left: +(_.openBtn.tag.getBoundingClientRect().left).toFixed(),
								right: +(windowWidth - _.openBtn.tag.getBoundingClientRect().right).toFixed()
							};
						if (openBtnCoords.left > openBtnCoords.right) {
							opt.toLeft = true;
						} else {
							opt.toRight = true;
						}
					}
					if (opt.toLeft) {
						_.buildAnimation(__, ['fr', 'tr'], ['translateX(100%)', 'translateX(0)']);
						__.tag.style.right = 0;
						__.tag.style.left = 'auto';
					} else if (opt.toRight) {
						_.buildAnimation(__, ['fl', 'tl'], ['translateX(-100%)', 'translateX(0)']);
						__.tag.style.left = 0;
						__.tag.style.right = 'auto';
					} else if (opt.toBottom) {
						_.buildAnimation(__, ['ft', 'tt'], ['translateY(-100%)', 'translateY(0)']);
					} else if (opt.toTop) {
						_.buildAnimation(__, ['fb', 'tb'], ['translateY(100%)', 'translateY(0)']);
						__.tag.style.bottom = 0;
						__.tag.style.top = 'auto';
					}
				} else {
					__.open.container = () => false;
				}
				_.insertAnimation(opt.animationIn, opt.animationOut);
				return menu;
			})();
		}

		init() {

			_.openBtn = (function() {
				let btn = _.findElement(opt.openBtn, 'Open button(s)');
				console.log(btn);
				return btn;
			})();

			_.closeBtn = _.findElement(opt.closeBtn, 'Close button(s)');

			_.openBtn.tag.addEventListener('click', () => __.open());

			_.closeBtn.tag.addEventListener('click', () => __.close());
		}

		findElement(elem, errorName) {
			let tag;

			if (elem.selector !== '') {
				tag = document.querySelector(elem.selector);
			} else console.error(`${errorName} selector is empty!`);

			elem.tag = tag;

			return (tag) ? elem : console.error(`${errorName} is not found!`);
		}

		buildAnimation(elem, names, keyframes) {

			let arr = ['animationIn', 'animationOut'];
			for (let i = 0; i < names.length; i++) {
				elem[arr[i]] = names[i];
				keyframes[i] = keyframes[i].replace(/(translate(.*))/, 'transform:$1');
				opt[arr[i]] = `@keyframes ${names[i]}{from{${keyframes[i]}}to{${keyframes[(i === 1) ? 0 : 1]}}}`;
			}
		}

		insertAnimation() {
			for (let i = 0; i < arguments.length; i++) {
				if (head.innerHTML.search(arguments[i]) === -1) {
					head.innerHTML += `<style>${arguments[i]}</style>`;
				}
			}		
		}

		setAnimationFor(elem, anim) {
			elem.tag.style.animation = `${anim} ${elem.animationDuration}s ${elem.animationTimigFunc}`;
		}




	}
	return SimpleMenu;
});