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

	function debounce(func, wait, immediate) {
	  var timeout;
	  return function() {
	    var context = this, args = arguments;
	    var later = function() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);
	  };
	}


	class SimpleMenu {
		constructor(options) {
			_ = this;

			_.defaults = {
				menu: {
					selector: '',
					class: 'active',
					animationDuration: 0.5,
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
				swipeThreshold: 0.3,
				pageScrolling: false,
				scrollingPxs: 50,
				overlayClick: true,
				esc: true,
				// fixingHeader: {
				// 	selector: '',
				// 	class: '',
				// 	fixedAnimation: ''
				// }
			};

			// create options from defaults
			opt = _.options = options || {};
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
				opt.desktop = true;
			}

			delete _.defaults;
			_.checkMedia();			

			window.addEventListener('resize', debounce(_.checkMedia, 100));

		}

		checkMedia(event) {
			// if desktop true
				// if mediaQuery

					// if media matches
						// if resize
							// if menu
								// if menu actived -> return
								// else menu !actived -> add events
							// else !menu -> buld menu
						// else !resize -> build menu

					// else no media mathces
						// if resize
							// if menu
								// if menu actived -> remove events
								// else -> return
							// else !menu -> return
						// else !resize -> return

						
			if (opt.desktop) {
				if (opt.mediaQuery !== '') {
					if (window.matchMedia(opt.mediaQuery).matches) {
						if (event && event.type === 'resize') {
							if (__) {
								if (!__.actived) {
									_.restoreEvents();
								}
							} else {
								_.buldMenu();
							}
						} else {
							_.buldMenu();
						}			
					} else {
						if (event && event.type === 'resize') {
							if (_.menu) {
								if (__.actived) {
									_.destroyEvents();
								}
							}
						}
					}					
				} else {
					// if desktop true (no media)
						// if !resize -> build menu
					if (!event) {
						_.buldMenu();
					}
				}
			} else {
				// else desktop false

					// if mobile device
						// if resize
							// if menu
								// if menu actived -> return
								// else menu !actived -> add events
							// else !menu -> buld menu
						// else !resize -> buld menu

					// else !mobile device
						// if resize
							// if menu
								// if menu actived -> remove events
								// else menu !actived -> return
							// else !menu -> return
						// else !resize -> return

				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					if (event && event.type === 'resize') {
						if (__) {
							if (!__.actived) {
								_.restoreEvents();
							}
						} else {
							_.buldMenu();
						}
					} else {
						_.buldMenu();
					}
				} else {
					if (event && event.type === 'resize') {
						if (_.menu) {
							if (__.actived) {
								_.destroyEvents();
							}
						}
					}
				}
			}
		}

		buldMenu() {
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
					// if !selector -> build overlay -> open & close with css3 animation
					// else selector -> querySelector overlay -> open & close with toggle class
					if (ovl.selector === '') {
						tag = document.createElement('div');
						tag.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:${ovl.bgc};z-index:${ovl.zi};${ovl.css}`;
						_.buildAnimation(ovl, ['fi', 'fo'], ['opacity:0', 'opacity:1']);

						ovl.open = function() {
							body.appendChild(this.tag);

							_.setAnimationFor(this, this.animationIn);

						};
						ovl.close = function() {
							_.setAnimationFor(this, this.animationOut);
							tag.addEventListener('animationend', () => {
								body.removeChild(this.tag);
							}, {once: true});
						};
						
					} else {
						tag = document.querySelector(ovl.selector || ovl);
						ovl.open = function() {
							this.tag.classList.add(ovl.class);
						};
						ovl.close = function() {
							this.tag.classList.remove(ovl.class);
						};
					}
					ovl.tag = tag;
					return (tag) ? ovl : console.error('You\'r overlay is not found!');
				}				
			})();
		}

		initMenu() {
			_.menu = (function() {
				let menu = _.findElement(opt.menu, 'Menu');
				__ = menu;
				_.tag = __.tag;

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
				_.open = __.open = function() {
					__.pageYscroll = pageYOffset;
					__.tag.classList.add(__.class);
					__.open.container();

					 _.setAnimationFor(__, __.animationIn);
					
					_.openBtn.tag.removeEventListener('click', __.open);
					if (_.overlay) {
						_.overlay.open();
					}
					if (navigator.userAgent.search(/edge/i) === -1 && __.tag.scrollHeight > __.tag.offsetHeight && __.tag.scrollTop > 0) {
						__.tag.scrollTo(0,0);
					}
					__.tag.dispatchEvent(new Event('beforeopen'));
					__.tag.addEventListener('animationend', function() {
							if (!__.width) {
								__.width = __.tag.offsetWidth;
							}
							__.tag.dispatchEvent(new Event('open'));
							__.opened = true;
							window.addEventListener('resize', __.close, {once: true});
							if (!opt.pageScrolling) {
								window.addEventListener('scroll', __.close);
							}
							if (opt.esc) {
								document.addEventListener('keyup', __.close);
							}

							_.closeBtn.tag.addEventListener('click', __.close);
							if (_.overlay && opt.overlayClick) {
								_.overlay.tag.addEventListener('click', __.close);
							}							
					}, {once: true});
				};

				_.close = __.close = function() {
					if (event && event.type === 'keyup' && event.keyCode !== 27) {
						return;
					}

					if (event && event.type === 'scroll') {
						if (Math.abs(__.pageYscroll - pageYOffset) < opt.scrollingPxs) {
							return;
						}
					}
					_.setAnimationFor(__, __.animationOut);

					_.closeBtn.tag.removeEventListener('click', __.close);
					if (_.overlay && opt.overlayClick) {
						_.overlay.tag.removeEventListener('click', __.close);
					}
					__.tag.removeEventListener('touchmove', __.swipeMove);
					if (!opt.pageScrolling) {
						window.removeEventListener('scroll', __.close);
					}
					if (_.overlay) {
						_.overlay.close();
					}
					if (opt.esc) {
						document.removeEventListener('keyup', __.close);
					}
					window.removeEventListener('resize', __.close);
					__.tag.dispatchEvent(new Event('beforeclose'));
					__.tag.addEventListener('animationend', function() {
							__.tag.classList.remove(__.class);
							__.open.container();
							__.tag.dispatchEvent(new Event('close'));
							__.opened = false;
							__.tag.style.transform = '';
							__.tag.style.willChange = '';
							_.openBtn.tag.addEventListener('click', __.open);
					}, {once:true});
				};

				__.getTransform = function() {
					return +__.tag.style.transform.replace(/[^0-9-.]*/g, '');
				};

				if (!opt.fade) {
					let swipe,
						scroll,
						posX1, posX2,
						posY1, posY2,
						posInitX, posFinal,
						posInitY;

					__.swipeStart = function() {
						__.tag.style.willChange = 'transform';
						let evt = event.touches[0] || window.event.touches[0];

						posInitX = posX1 = +evt.clientX.toFixed();
						posInitY = posY1 = +evt.clientY.toFixed();

						__.tag.addEventListener('touchmove', __.swipeMove);
						__.tag.addEventListener('touchend', () => swipe =	scroll = false, {once: true});
					};

					__.swipeMove = function() {
						let evt = event.touches[0] || window.event.touches[0];
						posY2 = posY1 - evt.clientY.toFixed();
						posY1 = evt.clientY.toFixed();

						posX2 = posX1 - evt.clientX.toFixed();
						posX1 = evt.clientX.toFixed();

						if (!swipe && !scroll) {
							if (Math.abs(posY2) > 9) {
								console.log('scroll');
								scroll = true;
							} else if (Math.abs(posY2) < 5) {
								console.log('swipe');
								swipe = true;
							}
						}

						if (swipe && (opt.toLeft && posX1 > posInitX) || (opt.toRight && posX1 < posInitX)) {
							__.tag.addEventListener('touchend', __.swipeEnd);
							__.tag.style.transform = `translateX(${__.getTransform() - posX2}px)`;
						} else if (scroll && (opt.toBottom && __.tag.offsetHeight + __.tag.scrollTop >= __.tag.scrollHeight && posY1 < posInitY) || (opt.toTop && __.tag.scrollTop === 0 && posY1 > posInitY)) {
							event.preventDefault();
							__.tag.addEventListener('touchend', __.swipeEnd);
							__.tag.style.transform = `translateY(${__.getTransform() - posY2}px)`;
						}

					};

					__.swipeEnd = function() {
						__.tag.removeEventListener('touchend', __.swipeEnd);
						posFinal = __.getTransform();
						let posThreshold = __.width * opt.swipeThreshold;
						if (Math.abs(posFinal) >= posThreshold) {
							__.close();
						} else {
							__.tag.style.transform = 'translate(0)';
							__.tag.style.transition = `transform ${__.animationDuration}s`;

							__.tag.addEventListener('transitionend', () => __.tag.style.transition = '', {once: true});
						}
					};

					if (opt.swipe) {
						__.tag.addEventListener('touchstart', __.swipeStart);
					}					
				}


				if (!opt.fade) {
					let wrap = __.container = document.createElement('div');

					wrap.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100vh;overflow:hidden;';
					wrap.style.top = getComputedStyle(__.tag).top;
					wrap.style.bottom = getComputedStyle(__.tag).bottom;
					
					__.contained = false;
					__.tag.style.top = 0;
					__.parent = __.tag.parentElement;

					__.open.container = function() {
						if (!__.contained) {
							wrap.style.height = `${__.tag.offsetHeight}px`;
							__.parent.appendChild(wrap);
							wrap.appendChild(__.tag);
							__.contained = true;							
						} else {
							__.parent.appendChild(__.tag);
							__.parent.removeChild(wrap);
							__.contained = false;
						}
					};
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
						_.buildAnimation(__, ['fr', 'tr'], ['translateX(100%)', 'translateX(0%)']);
						__.tag.style.right = 0;
						__.tag.style.left = 'auto';
					} else if (opt.toRight) {
						_.buildAnimation(__, ['fl', 'tl'], ['translateX(-100%)', 'translateX(0%)']);
						__.tag.style.left = 0;
						__.tag.style.right = 'auto';
					} else if (opt.toBottom) {
						__.tag.style.top = 0;
						__.tag.style.bottom = 'auto';
						_.buildAnimation(__, ['ft', 'tt'], ['translateY(-100%)', 'translateY(0%)']);
					} else if (opt.toTop) {
						_.buildAnimation(__, ['fb', 'tb'], ['translateY(100%)', 'translateY(0%)']);
						__.tag.style.bottom = 0;
						__.tag.style.top = 'auto';
					}
				} else {
					if (!opt.menu.animationIn && !opt.menu.animationOut) {
						_.buildAnimation(__, ['fi', 'fo'], ['opacity:0', 'opacity:1']);
					} else {
						if (!opt.menu.animationIn || !opt.menu.animationOut) {
							console.error('Add another animaion!');
							return;
						}
					}
					__.open.container = () => false;
				}
				_.restoreEvents();

				return menu;
			})();
		}

		destroyEvents() {
			_.openBtn.tag.removeEventListener('click', __.open);
			_.closeBtn.tag.removeEventListener('click', __.close);
			__.actived = false;
		}

		restoreEvents() {
			_.openBtn.tag.addEventListener('click', __.open);
			_.closeBtn.tag.addEventListener('click', __.close);
			__.actived = true;
		}

		init() {

			_.openBtn = (function() {
				let btn = _.findElement(opt.openBtn, 'Open button(s)');
				return btn;
			})();

			_.closeBtn = _.findElement(opt.closeBtn, 'Close button(s)');
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
				keyframes[i] = keyframes[i].replace(/(translate(.*))/, 'transform:$1');
				elem[arr[i]] = {
					name: names[i],
					key: `@keyframes ${names[i]}{from{${keyframes[i]}}to{${keyframes[(i === 1) ? 0 : 1]}}}`
				};
			}
		}

		setAnimationFor(elem, anim) {
			let animTag;
			if (anim.key) {
				animTag = document.createElement('style');

				animTag.textContent = (anim === __.animationOut) ? anim.key.replace(/\(.*?\)/, `(${__.getTransform()})`) : anim.key;

				head.appendChild(animTag);
			}

			elem.tag.style.animation = `${anim.name} ${elem.animationDuration}s ${elem.animationTimigFunc}`;
			elem.tag.addEventListener('animationend', () => {
				elem.tag.style.animation = '';
				if (anim.key) {
					head.removeChild(animTag);
				}
			}, {once: true});
		}


	}
	return SimpleMenu;
});