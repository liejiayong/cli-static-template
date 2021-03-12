var jyBus = {
	activeCls: 'active',
	font: function() {
		var docEl = document.documentElement || document.body
		var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
		var reCalc = function() {
			var clientWidth = docEl.clientWidth,
				PIX = 750
			clientWidth = clientWidth > PIX ? PIX : clientWidth
			var fontSize = 100 * (clientWidth / PIX)
			window.baseFontSize = fontSize
			docEl.style.fontSize = fontSize + 'px'
		}
		reCalc()
		window.addEventListener(resizeEvt, reCalc, false)
		document.addEventListener('DOMContentLoaded', reCalc, false)
	},
	winReset: function() {
		document.querySelector('body').style.overflow = ''
		document.querySelector('body').style.overflow = ''
	},
	winFixed: function() {
		document.querySelector('body').style.overflow = 'hidden'
		document.querySelector('body').style.overflow = 'hidden'
	},
	getRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	},
	shuffle: function(arr) {
		var _arr = arr.slice()
		for (var i = 0; i < _arr.length; i++) {
			var j = this.getRandom(0, i)
			var n = _arr[i]
			_arr[i] = _arr[j]
			_arr[j] = n
		}
		return _arr
	},
	debounce: function(fn, delay) {
		var timer = null
		return function() {
			var context = this,
				arg = arguments
			if (timer) clearTimeout(timer)
			timer = setTimeout(function() {
				fn.apply(context, arg)
			}, delay)
		}
	},
	throttle: function(fn, delay) {
		if (!delay) delay = 160
		var timer = null
		var start = Date.now()
		return function() {
			var context = this,
				arg = arguments,
				curr = Date.now()
			if (curr - start >= delay) {
				fn.apply(context, arg)
				start = Date.now()
			} else {
				timer = setTimeout(function() {
					fn.apply(context, arg)
				}, delay)
			}
		}
	},
	trim: function(str) {
		return str.replace(/^\s+|\s+$/g, '')
	},
	getQueryString: function(key, type) {
		type = type ? type : 'search'
		const regExp = new RegExp('[?&#]{1}' + key + '=(.*?)([&/#]|$)')
		const value = window.location[type].match(regExp)
		return value && decodeURIComponent(value[1])
	},
	isNumber: function(number) {
		return Object.prototype.toString.call(number).toLocaleLowerCase() === '[object number]'
	},
	lottery(index, total, cbCurrent, cbEnd) {
		if (!this.isNumber(index)) return new Error('the arguments of index must number!')
		if (typeof cbEnd !== 'function') return new Error('the arguments of cbEnd must function!')
		if (typeof cbCurrent !== 'function') return new Error('the arguments of cbCurrent must function!')
		var TYPE_SPEED = 0
		var TYPE_ADD_SPEED = 20
		var TYPE_LAST_SPEED = 500
		var TYPE_MAX_INDEX = total
		var currSpeed = 0
		var totalIndex = 0
		var currentIndex = 0
		var animate = function() {
			var timer = setTimeout(function() {
				totalIndex += 1
				currSpeed += TYPE_ADD_SPEED
				if (currSpeed > TYPE_LAST_SPEED) {
					if (currentIndex === index) {
						clearTimeout(timer)
						cbEnd(currentIndex)
					} else {
						currentIndex = totalIndex % TYPE_MAX_INDEX
						clearTimeout(timer)
						cbCurrent(currentIndex)
						animate()
					}
				} else {
					currentIndex = totalIndex % TYPE_MAX_INDEX
					clearTimeout(timer)
					cbCurrent(currentIndex)
					animate()
				}
			}, TYPE_SPEED + currSpeed)
		}
		animate()
	},
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
