/*!
 * @license
 * Basecoat v2.0.0-beta (https://basecoat.dimensiondata.com)
 * Copyright (C) 2011-2017 Dimension Data - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */


/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// todo: aria-expanded="true|false" on all collapsible content (accordions, tags, etc)

+function ($) {

  $.fn.accordion = function (option) {
    return this.each(function () {
      switch (option) {
      case 'show':
        if ($(this).parent().find('[data-toggle="collapse"]:first').hasClass('disabled')) return false;
        $(this).parent().find('[data-toggle="collapse"]:first').removeClass('collapsed').addClass('active');
        break;
      case 'hide':
        if ($(this).parent().find('[data-toggle="collapse"]:first').hasClass('disabled')) return false;
        $(this).parent().find('[data-toggle="collapse"]:first').addClass('collapsed').removeClass('active');
        break;
      case 'toggle':
        // prevent panels inside of accordions from doing anything to the accordion
        if ($(this).closest('.panel').length > 0) return false;
        // prevent open/close if toggle has class disabled on it
        if ($(this).hasClass('disabled')) return false;
        // progress-steps: exactly 1 accordion may be open at a time (and cannot be closed)
        // accordion-group: 0 or 1 accordions may be open at a time
        var $container = $(this).parent().parent();
        if ($container.is('[data-progress-steps], [data-accordion-group]')) {
          // close all OTHER accordions on the SAME level
          $container.find('> * > [data-toggle="collapse"]').not(this).next('.collapse').collapse('hide');
          // extra measure to prevent two steps opening at the same time when clicked too quickly
          var allowClose = $container.is('[data-accordion-group]') && $(this).hasClass('active');
          if ($container.find('> * > [data-toggle="collapse"]:not(.collapsed)').length > 0 && !allowClose) return;
        }
        // open/close this accordion
        $(this).next('.collapse').collapse('toggle');
        break;
      }
    });
  };

  $(document)
  // prevent open/close if toggle has class disabled on it, and
  // add/remove active/collapsed classes on the toggle for additional styling
  .on('show.bs.collapse', '.collapse', function (e) {
    e.stopPropagation();
    $(e.target).accordion('show');
  })
  .on('hide.bs.collapse', '.collapse', function (e) {
    e.stopPropagation();
    $(e.target).accordion('hide');
  })
  // this is so that we don't need to use a unique id (as per Bootstrap) for every single accordion
  .on('click.bc.accordion', '[data-toggle="collapse"]', function (e) {
    e.preventDefault();
    $(this).accordion('toggle');
  });

}(jQuery);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// init a global object (this can be used for sharing things like variables, plugins, and functions between components)
window.basecoat = window.basecoat || {};

basecoat.init = {};
basecoat.postInit = {};

+function ($) {

  $.fn.basecoat = function (component) {
    // console.log('initializing basecoat');
    if (typeof component === 'string') {
      return this.each(function () {
        if (basecoat.init[component]) basecoat.init[component].call(this);
        if (basecoat.postInit[component]) basecoat.postInit[component].call(this);
        // console.log('init:', component);
      });
    }
    return this.each(function () {
      for (component in basecoat.init) {
        if (basecoat.init[component]) basecoat.init[component].call(this);
        // console.log('init:', component);
      }
      for (component in basecoat.postInit) {
        if (basecoat.postInit[component]) basecoat.postInit[component].call(this);
        // console.log('init:', component);
      }
    });
  };

  // add a class to html tag if the device is mobile (can be useful elsewhere in css and js)
  basecoat.isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(navigator.userAgent);
  basecoat.isDesktop = !basecoat.isMobile;
  $('html').toggleClass('is-mobile', basecoat.isMobile);
  $('html').toggleClass('is-desktop', basecoat.isDesktop);

  // initialize all of basecoat's JS components when jQuery's DOM ready event is fired
  $(function () {
    // NOTE: components may need to be manually initialized when added to the DOM later by AJAX or other JS frameworks
    // basecoat can be manually initialized in a specific area like this: $('.new-stuff').basecoat();
    $(document).basecoat();
  });

}(jQuery);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.checkbox = function () {
    // handle checkboxes wrapped in labels (without for="#id") on page load
    return this
    .find('label :checkbox')
    .addBack('label :checkbox')
    .each(function () {
      $(this).closest('label').toggleClass('checked', $(this).is(':checked'));
      $(this).closest('label').toggleClass('disabled', $(this).is(':disabled'));
    });
  };

  $(document)
  // update checkbox label on change
  .on('change.bc.checkbox', 'label input:checkbox', function (e) {
    var $input = $(e.target);
    var $label = $input.closest('label');
    $label.toggleClass('checked', $input.is(':checked'));
  });

  basecoat.init.checkbox = function () {
    $(this).checkbox();
  };

}(jQuery);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Object.assign browser polyfill required for IE11, from: https://gist.github.com/spiralx/68cf40d7010d829340cb
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

basecoat.FlatPickr = __webpack_require__(22);
basecoat.FlatPickrConfirmDate = __webpack_require__(23);

+function ($) {

  $.fn.datetimePicker = function (options) {
    options = options || {
      closeOnSelect: false,
      altInput: true, // todo: logs warnings in IE (why?) but seems to work
      altFormat: 'j M Y',
      minuteIncrement: 15,
      onOpen: function (selectedDates, dateStr, instance) {
        // by default flatpickr doesn't set a value unless the user changed something in the widget, but with the ConfirmDate plugin a user might just click select on the default value (eg 12:00am) so lets set a value on `open`.
        if (selectedDates.length === 0) {
          instance.setDate('00:00');
        }
        // todo: add clear + cancel buttons to date-picker
      },
      onClose: function (selectedDates, dateStr, instance) {
        $(instance.element).blur(); // blur the field to trigger validation
      },
      plugins: [new basecoat.FlatPickrConfirmDate({
        confirmIcon: '',
        confirmText: 'Select',
        showAlways: true
      })]
    };
    return this
    .find('[data-datetime-picker]')
    .addBack('[data-datetime-picker]')
    .each(function () {
      $(this).flatpickr(options);
    });
  };

  basecoat.init.datetimePicker = function () {
    $(this).datetimePicker();
  };

}(jQuery);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.desktopMenu = function (option) {
    var open = option === 'show';
    if (option === 'toggle' && $('.desktop-menu').offset().left < 0) {
      open = true;
    }
    $('html').toggleClass('tablet-menu-open', open).toggleClass('desktop-menu-open', open);
  };

  $(document)
  // open & close the desktop-menu
  .on('click.bc.desktopMenu', '[data-toggle="desktop-menu"]', function (e) {
    e.preventDefault();
    $.desktopMenu('toggle');
  });

}(jQuery);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $(document)
  // prevent browser's default # navigation if there's no link on a dropdown-menu item
  .on('click.bc.dropdown', '.dropdown-menu a[href="#"]', function (e) {
    e.preventDefault();
  })

  // selecting an option from the dropdown-menu
  .on('click.bc.dropdown', '[data-dropdown] .dropdown-menu a', function (e) {
    var $option = $(e.target).closest('a') || $(e.target);
    var $dropdown = $option.closest('[data-dropdown]');
    var $button = $dropdown.find('button');
    var label = $option.text();
    var value = $option.data('value');
    // dynamically update label on fake "select" button and return focus to button
    if ($button.length > 0) {
      if (typeof $option.data('label') !== 'undefined') {
        label = $option.data('label');
      }
      $button.html(function (index, oldHtml) {
        return oldHtml.replace(/^[^<]+/, label);
      });
      // .focus(); // this causes complications if you trigger change then it triggers click and then this focus causes the page to scroll - trigger change shouldn't cause a scroll jump
    }
    // dynamically update value of a hidden form field
    if (typeof value === 'undefined') {
      value = label;
    }
    // blur to trigger validation
    $dropdown.find(':input').val(value).trigger('blur');
  })

  // when the hidden input changes, update the dropdown's displayed value
  .on('change.bc.dropdown', '[data-dropdown] :input', function () {
    var $dropdown = $(this).closest('[data-dropdown]');
    var $option = $dropdown.find('.dropdown-menu [data-value="' + $(this).val() + '"]');
    if ($option.length < 1) {
      $option = $dropdown.find('.dropdown-menu li:first a:first');
    }
    $option.trigger('click');
  });

}(jQuery);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $.fn.button.Constructor.DEFAULTS.loadingText = '<span class="fa fa-circle-o-notch fa-spin"></span><span>Loading...</span>';

  $.fn.loader = function (option) {
    var show = option === 'show';
    return this.each(function () {
      $(this).toggleClass('in', show).toggleClass('out', !show);
    });
  };

  // generate, return, and display a 'loader' modal
  basecoat.loaderModal = function (message) {
    message = message || 'Loading...';
    var html = ''
    + '<div class="modal-body">'
      + '<span class="loader-spinner fade in"></span>'
      + (message ? '<span class="modal-message">' + message + '</span>' : '')
    + '</div>';
    return basecoat.modal(html, 'loader', 'auto');
  };

  $(document)
  // 'show' and 'hide' events for spinner-loader
  .on('show.bc.loader', '.loader-spinner', function () {
    $(this).loader('show');
  })
  .on('hide.bc.loader', '.loader-spinner', function () {
    $(this).loader('hide');
  });

}(jQuery);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// load jQuery Slinky (for drilldown menu, using a custom fork of jQuery Slinky because the original was not customizable enough)
basecoat.jQuerySlinky = __webpack_require__(24);

+function ($) {

  $.mobileMenu = function (option) {
    var open = option === 'show';
    open = option === 'toggle' ? undefined : option;
    $('html').toggleClass('mobile-menu-open', open);
  };

  $(document)
  // open the mobile-menu
  .on('click.bc.mobileMenu', '[data-toggle="mobile-menu"]', function (e) {
    e.preventDefault();
    $.mobileMenu('toggle');
  })
  // click anywhere outside to close the menu
  .on('click.bc.mobileMenu touchstart.bc.mobileMenu', '.mobile-menu-layout', function (e) {
    if ($(e.target).hasClass('mobile-menu-layout')) {
      $.mobileMenu('hide');
      // $('html').removeClass('mobile-menu-open');
    }
  })
  // close the menu when navigating to another page
  .on('click.bc.mobileMenu', '.mobile-menu nav a:not(".next, .back")', function () {
    // $('html').removeClass('mobile-menu-open');
    $.mobileMenu('hide');
  });

  basecoat.init.mobileMenu = function () {
    if ($('.mobile-menu .drilldown:not(.slinky-menu)').length > 0) {
      // determine which page of the menu should be open on load
      var $currentLevel = $('.mobile-menu .drilldown ul:first');
      var $activeItem = $('.mobile-menu .drilldown li.active');
      if ($activeItem.find('ul').length > 0) {
        $currentLevel = $activeItem.find('ul:first');
      } else if ($activeItem.closest('ul').length > 0) {
        $currentLevel = $activeItem.closest('ul');
      }

      // drilldown menu
      $('.mobile-menu .drilldown').slinky({
        activeClass: 'current-level', // Class that's applied to the current menu level `<ul>`
        headerClass: 'heading', // Class name for the container for the back button and heading
        headingTag: '<h2 class="title">', // Tag that contains the heading
        backFirst: true, // Optionally append the back button before the heading instead of after
        label: 'Back', // Label for the back button. Pass true to use the link's own label
        title: true, // Pass true to show title of current menu level
        speed: 300, // Animation speed in milliseconds
        resize: true // Resize menu height to match content on navigation
      }).jump($currentLevel);

      // add active class to all parent menu items (showing the route, like a breadcrumb)
      $('.mobile-menu nav li.active').parents('ul > li').addClass('active');
    }
  };

}(jQuery);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  // create, show, and return a simple static modal
  basecoat.modal = function (content, type, size) {
    type = type || 'alert';
    size = size || 'md';
    var $modal = $(''
    + '<div class="modal ' + type + '-modal fade" tabindex="-1" role="dialog">'
      + '<div class="modal-dialog modal-' + size + '" role="document">'
        + '<div class="modal-content">'
          + content
          + '</div>'
        + '</div>'
      + '</div>'
    );

    $modal.modal({
      keyboard: false,
      backdrop: 'static'
    })
    .on('hidden.bs.modal', function () {
      $(this).data('bs.modal', null).remove();
    });

    return $modal;
  };

  // create, show, and return a dialog modal with buttons
  basecoat.dialogModal = function (heading, message, buttons) {
    var content = '';

    if (heading) {
      content += ''
      + '<div class="modal-header">'
        + '<h5 class="modal-title">'
          + heading
        + '</h5>'
      + '</div>';
    }

    if (message) {
      content += ''
      + '<div class="modal-body">'
        + '<p>'
          + message
        + '</p>'
      + '</div>';
    }

    if (buttons) {
      var $footer = $('<div class="modal-footer"><div class="btn-link-toolbar"/></div>');
      $.each(buttons, function (key, value) {
        $footer.find('.btn-link-toolbar').append(
          '<button type="button" class="btn btn-link" data-dismiss="modal" onClick="$(this).closest(\'.modal\').trigger(\'' + key + '\')" data-modal-btn="' + key + '">'
            + value +
          '</button>'
        );
      });
      content += $footer.prop('outerHTML');
    }

    return basecoat.modal(content);
  };

  basecoat.alert = function (heading, message, accept) {
    return basecoat.dialogModal(heading, message, {
      accept: accept || 'OK'
    });
  };

  basecoat.confirm = function (heading, message, accept, reject) {
    return basecoat.dialogModal(heading, message, {
      reject: reject || 'Cancel',
      accept: accept || 'OK'
    });
  };

  $(document)
  // add a temp hash when opening full-modal
  .on('shown.bs.modal', '.modal.full-modal', function () {
    window.history.pushState('forward', null, '#openModal');
  })
  // remove the temp hash after closing full-modal
  .on('hidden.bs.modal', '.modal.full-modal', function () {
    if (location.hash === '#openModal') {
      window.history.back();
    }
  });

  $(window)
  // close the full-modal when user presses "back" button
  .on('popstate.bc.modal', function (e) {
    if (e.state !== null) {
      $('.modal.full-modal.in').modal('hide');
    }
  });

}(jQuery);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


basecoat.notificationLimit = 3;
basecoat.notificationCount = 0;
basecoat.notificationMoreCount = 0;
basecoat.notificationModalHtml = '' +
'<div class="modal fade full-modal notification-modal" id="notificationModal" tabindex="-1" role="dialog" aria-labelledby="notificationModalLabel">' +
  '<div class="modal-dialog" role="document">' +
    '<div class="modal-content">' +

      '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title" id="notificationModalLabel">' +
          '<span class="fa fa-flag"></span> Notifications' +
        '</h4>' +
      '</div>' +

      '<div class="delete-all fade in"><span data-notifications-count-plural="There are <strong>#</strong> notifications." data-notifications-count-singular="There is <strong>#</strong> notification."></span> <a class="pull-right" data-dismiss="allNotifications">Delete all</a></div>' +

      '<div class="modal-body scrollbars scrollbars-light">' +
        '<div class="notification-container">' +

          '<div class="notification-feed"></div>' +

          '<a class="show-more fade" data-toggle="notificationsModal">There are <strong><span data-notifications-more-count>0</span> more</strong> notifications. Click to view all.</a>' +

        '</div>' +
      '</div>' +

    '</div>' +
  '</div>' +
'</div>';

+function ($) {

  var $modal, $container;

  // leave the dom uncluttered until such a time that notifications are used. that's when this function will be called.
  basecoat.initNotificationModal = function () {
    if ($modal) return $modal; // only execute on the first time

    // create the notification modal (if it doesn't exist)
    $modal = $('#notificationModal');
    if ($modal.length == 0) {
      $modal = $(basecoat.notificationModalHtml).appendTo('body');
      $modal.find('.scrollbars').scrollbar();
    }

    // create the floating notifications container based off the modal
    $container = $modal.find('.notification-container').clone(true);
    $('body').append($container);

    // update (initialize) any counters on the DOM
    basecoat.updateNotificationCounters();

    $modal
    // show modal: move notifications to inside the modal
    .on('show.bs.modal', function () {
      $container = $('body .notification-container:last').clone(true);
      $modal.find('.notification-container').replaceWith($container);
    })
    // hide modal: make notifications floaty
    .on('hide.bs.modal', function () {
      $container = $modal.find('.notification-container').clone(true);
      $('body .notification-container:last').replaceWith($container);
    });

    $(document)
    // dismiss notification
    .on('click.bc.notification', '[data-dismiss="notification"]', function () {
      $(this).closest('.notification-alert').trigger('hide');
    })
    // dismiss all-notifications
    .on('click.bc.notification', '[data-dismiss="allNotifications"]', function () {
      $('.notification-alert').remove();
      basecoat.updateNotificationCounters();
      $modal.modal('hide');
    });
  };

  // update all variables/badges/display of notification counters found on a page
  basecoat.updateNotificationCounters = function () {
    basecoat.notificationCount = $container.find('.notification-feed .notification-alert:not(.out)').length;
    basecoat.notificationMoreCount = Math.max(0, basecoat.notificationCount - basecoat.notificationLimit);

    // update simple counters on the page
    $('[data-notifications-more-count]').text(basecoat.notificationMoreCount);
    $('[data-notifications-count-not-empty]').text(basecoat.notificationCount > 0 ? basecoat.notificationCount : '');
    $('[data-notifications-count]').text(basecoat.notificationCount);

    // correct language for singular or plural notification count
    var multiple = basecoat.notificationCount == 1 ? 'singular' : 'plural';
    $('[data-notifications-count-' + multiple + ']').html(function () {
      return $(this).data('notifications-count-' + multiple).replace(/#/g, basecoat.notificationCount);
    });

    // if there aren't any more notifications then hide the "show more" link
    if (basecoat.notificationMoreCount < 1) {
      $container.find('.show-more').removeClass('in');
    }

    // if there are too many notifications
    if (basecoat.notificationMoreCount > 0) {
      // display "show more" link
      $container.find('.show-more').addClass('in');
      // hide excess notifications
      $container.find('.notification-feed .notification-alert:not(.out):gt(' + (basecoat.notificationLimit - 1) + ')').removeClass('in');
    }
  };

  // create a new notification with show and hide events
  basecoat.notification = function (heading, message, footnote) {
    basecoat.initNotificationModal();

    // generate new notification
    return $(
      '<div class="notification-alert fade">' +
        (heading ? '<h5 class="heading">' + heading + '</h5>' : '') +
        (message ? '<p class="message">' + message + '</p>' : '') +
        (footnote ? '<p class="footnote">' + footnote + '</p>' : '') +
        '<span class="close" data-dismiss="notification"></span>' +
      '</div>'
    )

    // show the notification
    .on('show.bc.notification', function (e) {
      e.stopPropagation();

      // prepend to the feed
      var $notification = $(this);
      $container.find('.notification-feed').prepend($notification);
      $notification[0].offsetWidth; // forces reflow before applying fade in effect
      $notification.addClass('in');

      // update counters
      basecoat.updateNotificationCounters();
    })

    // dismiss the notification
    .on('hide.bc.notification', function (e) {
      e.stopPropagation();

      // remove any that are still busy animating
      $container.find('.notification-feed notification-alert.fade.out').remove();

      // remove this notification from the feed
      var $notification = $(this);
      $notification.addClass('out').removeClass('in');
      window.setTimeout(function () { $notification.remove(); }, 1000);

      // make sure the newest notifications are visible
      $container.find('.notification-feed .notification-alert:not(.out):lt(' + basecoat.notificationLimit + ')').addClass('in');

      // update counters
      basecoat.updateNotificationCounters();

      // if that was the last notification then close the modal
      if ($modal.hasClass('in') && basecoat.notificationCount < 1) {
        $modal.modal('hide');
      }
    });
  };

  $(document)
  // show/hide the notifications modal
  .on('click.bc.notification', '[data-toggle="notificationsModal"]', function () {
    basecoat.initNotificationModal();
    $modal.modal('toggle');
  });

}(jQuery);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.passwordToggle = function () {
    return this.each(function () {
      var $input = $(this).find(':password, :text');
      var $toggle = $(this).find('.password-toggle');
      if ($toggle.hasClass('password-visible')) {
        $toggle.removeClass('password-visible');
        $input.attr('type', 'password');
      } else {
        $toggle.addClass('password-visible');
        $input.attr('type', 'text');
      }
    });
  };

  $(document)
  // toggle eye icon input type="text|password" on click
  .on('click.bc.passwordToggle', '.password-toggle', function (e) {
    e.stopPropagation();
    $(e.target).closest('.has-password-toggle').passwordToggle();
  });

}(jQuery);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $.fn.popover.Constructor.DEFAULTS.placement = 'auto top';
  // $.fn.popover.Constructor.DEFAULTS.container = 'body'; // body would prevent tooltips from inheriting styles from their parents, but it disconnects positioning from page layout

  $(document)
  // Bootstrap's toggle popover fix: https://github.com/twbs/bootstrap/issues/16732#issuecomment-165229037
  .on('hidden.bs.popover', function (e) {
    $(e.target).data('bs.popover').inState.click = false;
  });

  $(document)
  // to dismiss/close a popover from inside that popover
  .on('click.bc.popover', '[data-dismiss="popover"]', function () {
    $(this).closest('.popover').data('bs.popover').$element.popover('hide');
  });

  // automatically activate popovers everywhere (specific options can be set using data-attributes on the tooltip trigger)
  $(document).popover({
    selector: '[data-toggle="popover"]'
  });

}(jQuery);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.progressStep = function (option) {
    return this.each(function () {
      var $steps = $(this);
      var linear = $steps.attr('data-progress-steps') === 'linear';
      var $current, $next;

      // accordion steps: .accordion-heading.complete, .accordion-heading.active, .accordion-heading.disabled
      if ($steps.hasClass('accordion-group')) {
        $current = $steps.find('.accordion > [data-toggle].active');
        switch (option) {
        case 'back':
          $next = $current.closest('.accordion').prev().find('> [data-toggle]');
          $steps.find('.collapse').not($next.next('.collapse')).collapse('hide');
          $current.toggleClass('disabled', linear);
          $next.removeClass('disabled').click();
          if (linear) {
            $current.removeClass('complete');
            $next.removeClass('complete');
          }
          break;
        case 'next':
          $next = $current.closest('.accordion').next().find('> [data-toggle]');
          $steps.find('.collapse').not($next.find('.collapse')).collapse('hide');
          $current.addClass('complete').toggleClass('disabled', linear);
          $next.removeClass('disabled').click();
          break;
        case 'complete':
          $steps.find('> .accordion > [data-toggle]').addClass('complete');
          $steps.find('> .accordion:last-child > [data-toggle]').removeClass('disabled').click();
          $steps.find('> .accordion:not(:last-child) > [data-toggle]').toggleClass('disabled', linear);
          break;
        case 'reset':
          $steps.find('> .accordion > [data-toggle]').removeClass('complete');
          $steps.find('> .accordion:first-child > [data-toggle]').removeClass('disabled').click();
          $steps.find('> .accordion:not(:first-child) > [data-toggle]').addClass('disabled');
          break;
        }
      // tabbed steps: li.active, li.disabled, li.complete
      } else if ($steps.hasClass('nav-tabs')) {
        $current = $steps.find('> li.active').toggleClass('disabled', linear);
        // Prevent two tabs opening at the same time by first checking if the component is busy
        switch (option) {
        case 'back':
          // check if still busy
          if ($steps.data('busy')) return false;
          $steps.data('busy', true);
          // do the step change
          $next = $current.prev();
          if (linear) {
            $current.removeClass('complete');
            $next.removeClass('complete').removeClass('disabled');
          }
          $next.find('[data-toggle]').click();
          // get ready for the next step change
          window.setTimeout(function () {
            $steps.data('busy', false);
          }, 300);
          break;
        case 'next':
          // check if still busy
          if ($steps.data('busy')) return false;
          $steps.data('busy', true);
          // do the step change
          $next = $current.next().removeClass('disabled');
          $next.find('[data-toggle]').click();
          // get ready for the next step change
          window.setTimeout(function () {
            $steps.data('busy', false);
          }, 300);
          break;
        case 'complete':
          $steps.find('> li').addClass('complete');
          $steps.find('> li:last-child').removeClass('disabled').find('[data-toggle]').click();
          $steps.find('> li:not(:last-child)').toggleClass('disabled', linear);
          break;
        case 'reset':
          $steps.find('> li').removeClass('complete');
          $steps.find('> li:first-child').removeClass('disabled').find('[data-toggle]').click();
          $steps.find('> li:not(:first-child)').addClass('disabled');
          break;
        }
      }
    });
  };

  $(document)
  .on('back.bc.progressStep', function (e) { $(e.target).progressStep('back'); })
  .on('next.bc.progressStep', function (e) { $(e.target).progressStep('next'); })
  .on('complete.bc.progressStep', function (e) { $(e.target).progressStep('complete'); })
  .on('reset.bc.progressStep', function (e) { $(e.target).progressStep('reset'); });

}(jQuery);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.fn.radio = function () {
    // handle radios wrapped in labels (without for="#id") on page load
    return this
    .find(':radio')
    .addBack(':radio')
    .each(function () {
      var $radios = $('label input:radio[name="' + $(this).attr('name') + '"]');
      $radios.each(function () {
        $(this).closest('label').toggleClass('checked', $(this).is(':checked'));
        $(this).closest('label').toggleClass('disabled', $(this).is(':disabled'));
      });
    });
  };

  $(document)
  // update radio label on change
  .on('change.bc.radio', 'input:radio', function (e) {
    var $input = $(e.target);
    var $radios = $input;
    if ($input.attr('name')) {
      $radios = $('label input:radio[name="' + $input.attr('name') + '"]');
    } else if ($input.closest('.form-group').length > 0) {
      $radios = $input.closest('.form-group').find('input:radio');
    }
    $radios.each(function () {
      $(this).closest('label').toggleClass('checked', $(this).is(':checked'));
    });
  });

  basecoat.init.radio = function () {
    $(this).radio();
  };

}(jQuery);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// load jQuery Scrollbar
basecoat.jQueryScrollbar = __webpack_require__(27);

+function ($) {

  $.fn.jQueryScrollbar = $.fn.scrollbar;
  $.fn.scrollbar = function () {
    return this
    .find('.scrollbars')
    .addBack('.scrollbars')
    .each(function () {
      $(this)
      .addClass('scrollbar-inner')
      .jQueryScrollbar({
        // debug: true,
        ignoreMobile: false, // use the mobile's native scrollbar functionality instead of this plugin
        disableBodyScroll: !($(this).data('disable-body-scroll') == false), // disable entire page scrolling if the mouse is over the container
        //callback function before scrollbars size is calculated
        onUpdate: function ($element) {
          if (parseInt($element.css('maxHeight'), 10) < 30) {
            // fix to initialize scrollbars inside of hidden modals and drop-downs BEFORE they open on the screen.
            // jQueryScrollbar plugin sets maxHeight = scrollbar-height on invisible targets and it causes a delayed redraw of the scrollbars on opening, so we just have to undo it.
            $element.css('maxHeight', '');
          }
        }
      });
    });
  };

  $(document)
  // prevent unexpected events firing on click of a scrollbar
  .on('click.bc.scrollbar', '.scroll-element', function (e) {
    e.stopPropagation();
  });

  // postInit ensures that everything else has run before scrollbars are attached
  basecoat.postInit.scrollbar = function () {
    $(this).scrollbar();
  };

}(jQuery);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  basecoat.init.scrollspy = function () {
    // automatically activate scrollspy everywhere
    if ($('[data-scrollspy]').length > 0) {
      // bootstrap only allows one instance of scrollspy, so using an empty target makes this work on multile navs
      var navbarHeight = $('.site-header .navbar-fixed-top').height();
      $('body').scrollspy({
        target: '[data-scrollspy]',
        offset: navbarHeight + 10
      });
    }
  };

}(jQuery);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  var $navbar = $('.site-header .navbar-fixed-top');
  var navbarHeight = $navbar.height();
  var lastWidth = $(window).width();
  var lastPos = 0;
  var delta = 5;

  // hide the navbar when scrolling downwards on mobile (delayed to prevent jumpy behavior on page load with #anchors and stuff)
  window.setTimeout(function () {
    $(window)
    .on('scroll.bc.siteHeader', function () {
      var currentPos = $(this).scrollTop();
      var currentWidth = $(window).width();

      // if the page is busy scrolling then we do not want to interfere (this bool is set to true in scrollto.js)
      if (basecoat.scrollJacking) return false;

      // resizing the window seems to trigger scroll so this negates it
      if (lastWidth != currentWidth) {
        lastPos = currentPos;
        lastWidth = currentWidth;
        return true;
      }

      // hide navbar if scrolling down
      if (currentPos > (lastPos + delta) && currentPos > navbarHeight) {
        $navbar.addClass('navbar-hide');
        lastPos = currentPos;
      // show the navbar if scrolling up OR at the top
      } else if (currentPos < (lastPos - delta) || currentPos < navbarHeight) {
        $navbar.removeClass('navbar-hide');
        lastPos = currentPos;
      }
    });
  }, 1000);

}(jQuery);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  $.siteSearch = function (option) {
    var $search = $('.site-search');
    switch (option) {
    case 'show':
      // initialize just in time so as not to clutter the DOM
      if ($search.is(':empty')) {
        $search.html('<div class="search-bar"><input class="search-input" type="search"><button class="close" data-dismiss="site-search" aria-label="Close" aria-hidden="true">Ã—</button></div><div class="search-dropdown"><ul class="search-results"></ul></div></div>');
        $search.find('.search-bar')[0].offsetWidth; // forces reflow before animating in
      }
      $('html').addClass('site-search-open');
      $search.find('.search-input').focus();
      $search.trigger('shown.bc.siteSearch');
      break;
    case 'hide':
      $('html').removeClass('site-search-open');
      window.setTimeout(function () {
        $search.find('.search-input').val('');
        $search.find('.search-results').empty();
      }, 10); // a tiny delay just allows IE 11 to register that a link was clicked before that link gets removed from the DOM
      break;
    case 'toggle':
      if ($('html').hasClass('site-search-open')) {
        $.siteSearch('hide');
      } else {
        $.siteSearch('show');
      }
      break;
    }
  };

  basecoat.init.siteSearch = function () {
    // show/hide functions
    $('.site-search')
    .off('.bc.siteSearch')
    .on('show.bc.siteSearch', function () { $.siteSearch('show'); })
    .on('hide.bc.siteSearch', function () { $.siteSearch('hide'); })
    // hide search on click of 'x', or any link
    .on('click.bc.siteSearch', '[data-dismiss="site-search"], a', function () { $.siteSearch('hide'); })
    // hide search on click of backdrop
    .on('click.bc.siteSearch', function (e) {
      if (e.target !== this) return;
      $.siteSearch('hide');
    })
    // hide search on press of `esc` key
    .on('keydown.bc.siteSearch', '.search-input', function (e) {
      if (e.which === 27) { // esc
        $.siteSearch('hide');
      }
    });

    // show search on click of search button
    $('[data-toggle="site-search"]').on('click.bc.siteSearch', function () {
      $.siteSearch('show');
    });
  };

}(jQuery);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  // if a tab is disabled, prevent any action (pointer-events: none; doesn't work in IE 10)
  $(document).on('show.bs.tab', '.disabled [data-toggle="tab"]', false)

  // scroll tabs into view on really small screens
  .on('show.bs.tab', '.nav-tabs-responsive a[data-toggle="tab"]', function () {
    $(this).closest('.nav-tabs-responsive').animate({
      scrollLeft: $(this).offset().left - $(this).closest('.nav-tabs').offset().left - ($(this).closest('.nav-tabs-responsive').width() - $(this).outerWidth()) / 2
    }, 500);
  });

}(jQuery);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {

  basecoat.toast = function (content, type) {
    var $toast = $('<div class="toast-alert fade">' + content + '</div>');
    type = type || 'default';
    $toast.addClass('toast-' + type);

    $toast.on('show.bc.toast', function (e, duration) {
      duration = duration || 5000;
      // hide any existing toasts
      $('.toast-alert').trigger('hide');
      var $toast = $(this);
      $('body').append($toast);
      $toast[0].offsetWidth; // forces reflow before applying fade in effect
      $toast.addClass('in');
      // auto hide toast
      window.setTimeout(function () {
        $toast.trigger('hide');
      }, duration);
    });

    $toast.on('hide.bc.toast', function () {
      var $toast = $(this).removeClass('in');
      window.setTimeout(function () {
        $toast.remove();
      }, 1000);
    });

    return $toast;
  };

}(jQuery);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


+function ($) {
  $.fn.tooltip.Constructor.DEFAULTS.placement = 'auto top';
  $.fn.tooltip.Constructor.DEFAULTS.container = 'body'; // prevents tooltips from inheriting styles from their parents, but dissociates positioning from page layout

  // automatically activate tooltips everywhere (specific options can be set using data-attributes on the tooltip trigger)
  $(document).tooltip({
    selector: '[data-toggle="tooltip"]'
  });

}(jQuery);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* flatpickr v4.0.6, @license MIT */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.flatpickr = factory());
}(this, (function () { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function compareDates(date1, date2, timeless) {
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var getWeek = function (givenDate) {
    var onejan = new Date(givenDate.getFullYear(), 0, 1);
    return Math.ceil(((givenDate.getTime() - onejan.getTime()) / 86400000 +
        onejan.getDay() +
        1) /
        7);
};
var duration = {
    DAY: 86400000,
};

var defaults = {
    _disable: [],
    _enable: [],
    allowInput: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enable: [],
    enableSeconds: false,
    enableTime: false,
    getWeek: getWeek,
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
};

var pad = function (number) { return ("0" + number).slice(-2); };
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        timeout !== null && clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        }, wait);
        if (immediate && !timeout)
            func.apply(context, args);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};
function mouseDelta(e) {
    var delta = e.wheelDelta || -e.deltaY;
    return delta >= 0 ? 1 : -1;
}

function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    numInput.type = "text";
    numInput.pattern = "\\d*";
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}

var do_nothing = function () { return undefined; };
var revFormat = {
    D: do_nothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM) {
        dateObj.setHours(dateObj.getHours() % 12 + 12 * int(/pm/i.test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum) {
        var weekNumber = parseInt(weekNum);
        return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: do_nothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    w: do_nothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "(am|AM|Am|aM|pm|PM|Pm|pM)",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date) { return (date.getHours() > 11 ? "PM" : "AM"); },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return date.getFullYear(); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};

"use strict";
if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}

function FlatpickrInstance(element, instanceConfig) {
    var self = {};
    self.parseDate = parseDate;
    self.formatDate = formatDate;
    self._animationLoop = [];
    self._handlers = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar
                    ? self.latestSelectedDateObj || self.config.minDate
                    : undefined);
            }
            updateValue(false);
        }
        self.showTimeInput =
            self.selectedDates.length > 0 || self.config.noCalendar;
        if (self.weekWrapper !== undefined && self.daysContainer !== undefined) {
            self.calendarContainer.style.width =
                self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
        }
        if (!self.isMobile)
            positionCalendar();
        triggerEvent("onReady");
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function updateTime(e) {
        if (self.config.noCalendar && !self.selectedDates.length) {
            self.setDate(new Date().setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds), false);
            setHoursFromInputs();
            updateValue();
        }
        timeWrapper(e);
        if (self.selectedDates.length === 0)
            return;
        if (!self.minDateHasTime ||
            e.type !== "input" ||
            e.target.value.length >= 2) {
            setHoursFromInputs();
            updateValue();
        }
        else {
            setTimeout(function () {
                setHoursFromInputs();
                updateValue();
            }, 1000);
        }
    }
    function ampm2military(hour, amPM) {
        return hour % 12 + 12 * int(amPM === "PM");
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined)
            hours = ampm2military(hours, self.amPM.textContent);
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.latestSelectedDateObj &&
            compareDates(self.latestSelectedDateObj, self.config.minDate) === 0) {
            hours = Math.max(hours, self.config.minDate.getHours());
            if (hours === self.config.minDate.getHours())
                minutes = Math.max(minutes, self.config.minDate.getMinutes());
        }
        if (self.config.maxDate &&
            self.maxDateHasTime &&
            self.latestSelectedDateObj &&
            compareDates(self.latestSelectedDateObj, self.config.maxDate) === 0) {
            hours = Math.min(hours, self.config.maxDate.getHours());
            if (hours === self.config.maxDate.getHours())
                minutes = Math.min(minutes, self.config.maxDate.getMinutes());
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date)
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? (12 + hours) % 12 + 12 * int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = hours >= 12 ? "PM" : "AM";
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        var year = parseInt(event.target.value) + (event.delta || 0);
        if (year.toString().length === 4 || event.key === "Enter") {
            self.currentYearElement.blur();
            if (!/[^\d]/.test(year.toString()))
                changeYear(year);
        }
    }
    function bind(element, event, handler) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler); });
        element.addEventListener(event, handler);
        self._handlers.push({ element: element, event: event, handler: handler });
    }
    function onClick(handler) {
        return function (evt) { return evt.which === 1 && handler(evt); };
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = debounce(onResize, 50);
        self._debouncedChange = debounce(triggerChange, 300);
        if (self.config.mode === "range" && self.daysContainer)
            bind(self.daysContainer, "mouseover", function (e) {
                return onMouseOver(e.target);
            });
        bind(window.document.body, "keydown", onKeyDown);
        if (!self.config.static)
            bind(self._input, "keydown", onKeyDown);
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document.body, "touchstart", documentClick);
        bind(window.document.body, "mousedown", onClick(documentClick));
        bind(self._input, "blur", documentClick);
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "mousedown", onClick(self.open));
        }
        if (self.daysContainer !== undefined) {
            self.monthNav.addEventListener("wheel", function (e) { return e.preventDefault(); });
            bind(self.monthNav, "wheel", debounce(onMonthNavScroll, 10));
            bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "mousedown", onClick(selectDate));
            if (self.config.animate) {
                bind(self.daysContainer, ["webkitAnimationEnd", "animationend"], animateDays);
                bind(self.monthNav, ["webkitAnimationEnd", "animationend"], animateMonths);
            }
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return e.target.select();
            };
            bind(self.timeContainer, ["wheel", "input", "increment"], updateTime);
            bind(self.timeContainer, "mousedown", onClick(timeIncrement));
            bind(self.timeContainer, ["wheel", "increment"], self._debouncedChange);
            bind(self.timeContainer, "input", triggerChange);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "mousedown", onClick(function (e) {
                    updateTime(e);
                    triggerChange();
                }));
            }
        }
    }
    function processPostDayAnimation() {
        self._animationLoop.forEach(function (f) { return f(); });
        self._animationLoop = [];
    }
    function animateDays(e) {
        if (self.daysContainer && self.daysContainer.childNodes.length > 1) {
            switch (e.animationName) {
                case "fpSlideLeft":
                    self.daysContainer.lastChild &&
                        self.daysContainer.lastChild.classList.remove("slideLeftNew");
                    self.daysContainer.removeChild(self.daysContainer
                        .firstChild);
                    self.days = self.daysContainer.firstChild;
                    processPostDayAnimation();
                    break;
                case "fpSlideRight":
                    self.daysContainer.firstChild &&
                        self.daysContainer.firstChild.classList.remove("slideRightNew");
                    self.daysContainer.removeChild(self.daysContainer
                        .lastChild);
                    self.days = self.daysContainer.firstChild;
                    processPostDayAnimation();
                    break;
                default:
                    break;
            }
        }
    }
    function animateMonths(e) {
        switch (e.animationName) {
            case "fpSlideLeftNew":
            case "fpSlideRightNew":
                self.navigationCurrentMonth.classList.remove("slideLeftNew");
                self.navigationCurrentMonth.classList.remove("slideRightNew");
                var nav = self.navigationCurrentMonth;
                while (nav.nextSibling &&
                    /curr/.test(nav.nextSibling.className))
                    self.monthNav.removeChild(nav.nextSibling);
                while (nav.previousSibling &&
                    /curr/.test(nav.previousSibling.className))
                    self.monthNav.removeChild(nav.previousSibling);
                self.oldCurMonth = undefined;
                break;
        }
    }
    function jumpToDate(jumpDate) {
        var jumpTo = jumpDate !== undefined
            ? parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            console.error(e.stack);
            console.warn("Invalid date supplied: " + jumpTo);
        }
        self.redraw();
    }
    function timeIncrement(e) {
        if (~e.target.className.indexOf("arrow"))
            incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && e.target;
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0]) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1]) === 0);
                }
            }
        }
        else {
            dayElement.classList.add("disabled");
            if (self.selectedDates[0] &&
                self.minRangeDate &&
                date > self.minRangeDate &&
                date < self.selectedDates[0])
                self.minRangeDate = date;
            else if (self.selectedDates[0] &&
                self.maxRangeDate &&
                date < self.maxRangeDate &&
                date > self.selectedDates[0])
                self.maxRangeDate = date;
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
            if (self.selectedDates.length === 1 &&
                self.minRangeDate !== undefined &&
                self.maxRangeDate !== undefined &&
                (date < self.minRangeDate || date > self.maxRangeDate))
                dayElement.classList.add("notAllowed");
        }
        if (self.weekNumbers &&
            className !== "prevMonthDay" &&
            dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" +
                self.config.getWeek(date) +
                "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDay(currentIndex, offset) {
        var newIndex = currentIndex + offset || 0, targetNode = (currentIndex !== undefined
            ? self.days.childNodes[newIndex]
            : self.selectedDateElem ||
                self.todayDateElem ||
                self.days.childNodes[0]);
        var focus = function () {
            targetNode = targetNode || self.days.childNodes[newIndex];
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        };
        if (targetNode === undefined && offset !== 0) {
            if (offset > 0) {
                self.changeMonth(1, true, undefined, true);
                newIndex = newIndex % 42;
            }
            else if (offset < 0) {
                self.changeMonth(-1, true, undefined, true);
                newIndex += 42;
            }
            return afterDayAnim(focus);
        }
        focus();
    }
    function afterDayAnim(fn) {
        self.config.animate === true ? self._animationLoop.push(fn) : fn();
    }
    function buildDays(delta) {
        if (self.daysContainer === undefined) {
            return;
        }
        var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() -
            self.l10n.firstDayOfWeek +
            7) %
            7, isRangeMode = self.config.mode === "range";
        var prevMonthDays = self.utils.getDaysInMonth((self.currentMonth - 1 + 12) % 12);
        var daysInMonth = self.utils.getDaysInMonth(), days = window.document.createDocumentFragment();
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        if (self.weekNumbers && self.weekNumbers.firstChild)
            self.weekNumbers.textContent = "";
        if (isRangeMode) {
            self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
            self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
        }
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
            days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
            self._hidePrevMonthArrow =
                self._hidePrevMonthArrow ||
                    (!!self.minRangeDate &&
                        self.minRangeDate > days.childNodes[0].dateObj);
            self._hideNextMonthArrow =
                self._hideNextMonthArrow ||
                    (!!self.maxRangeDate &&
                        self.maxRangeDate <
                            new Date(self.currentYear, self.currentMonth + 1, 1));
        }
        else
            updateNavigationCurrentMonth();
        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        if (!self.config.animate || delta === undefined)
            clearNode(self.daysContainer);
        else {
            while (self.daysContainer.childNodes.length > 1)
                self.daysContainer.removeChild(self.daysContainer.firstChild);
        }
        if (delta && delta >= 0)
            self.daysContainer.appendChild(dayContainer);
        else
            self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);
        self.days = self.daysContainer.childNodes[0];
    }
    function buildMonthNav() {
        var monthNavFragment = window.document.createDocumentFragment();
        self.monthNav = createElement("div", "flatpickr-month");
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.currentMonthElement = createElement("span", "cur-month");
        self.currentMonthElement.title = self.l10n.scrollTitle;
        var yearInput = createNumberInput("cur-year");
        self.currentYearElement = yearInput.childNodes[0];
        self.currentYearElement.title = self.l10n.scrollTitle;
        if (self.config.minDate)
            self.currentYearElement.min = self.config.minDate
                .getFullYear()
                .toString();
        if (self.config.maxDate) {
            self.currentYearElement.max = self.config.maxDate
                .getFullYear()
                .toString();
            self.currentYearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        self.navigationCurrentMonth = createElement("span", "flatpickr-current-month");
        self.navigationCurrentMonth.appendChild(self.currentMonthElement);
        self.navigationCurrentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(self.prevMonthNav);
        monthNavFragment.appendChild(self.navigationCurrentMonth);
        monthNavFragment.appendChild(self.nextMonthNav);
        self.monthNav.appendChild(monthNavFragment);
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool)
                    self.prevMonthNav.style.display = bool ? "none" : "block";
                self.__hidePrevMonthArrow = bool;
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool)
                    self.nextMonthNav.style.display = bool ? "none" : "block";
                self.__hideNextMonthArrow = bool;
            },
        });
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");
        var hourInput = createNumberInput("flatpickr-hour");
        self.hourElement = hourInput.childNodes[0];
        var minuteInput = createNumberInput("flatpickr-minute");
        self.minuteElement = minuteInput.childNodes[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? self.config.defaultHour
                : military2ampm(self.config.defaultHour));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : self.config.defaultMinute);
        self.hourElement.step = self.config.hourIncrement.toString();
        self.minuteElement.step = self.config.minuteIncrement.toString();
        self.hourElement.min = self.config.time_24hr ? "0" : "1";
        self.hourElement.max = self.config.time_24hr ? "23" : "12";
        self.minuteElement.min = "0";
        self.minuteElement.max = "59";
        self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.childNodes[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : self.config.defaultSeconds);
            self.secondElement.step = self.minuteElement.step;
            self.secondElement.min = self.minuteElement.min;
            self.secondElement.max = self.minuteElement.max;
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = self.l10n.weekdays.shorthand.slice();
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
        }
        self.weekdayContainer.innerHTML = "\n    <span class=flatpickr-weekday>\n      " + weekdays.join("</span><span class=flatpickr-weekday>") + "\n    </span>\n    ";
        return self.weekdayContainer;
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, is_offset, animate, from_keyboard) {
        if (is_offset === void 0) { is_offset = true; }
        if (animate === void 0) { animate = self.config.animate; }
        if (from_keyboard === void 0) { from_keyboard = false; }
        var delta = is_offset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow) ||
            (delta > 0 && self._hideNextMonthArrow))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
        }
        buildDays(animate ? delta : undefined);
        if (!animate) {
            triggerEvent("onMonthChange");
            return updateNavigationCurrentMonth();
        }
        var nav = self.navigationCurrentMonth;
        if (delta < 0) {
            while (nav.nextSibling &&
                /curr/.test(nav.nextSibling.className))
                self.monthNav.removeChild(nav.nextSibling);
        }
        else if (delta > 0) {
            while (nav.previousSibling &&
                /curr/.test(nav.previousSibling.className))
                self.monthNav.removeChild(nav.previousSibling);
        }
        self.oldCurMonth = self.navigationCurrentMonth;
        self.navigationCurrentMonth = self.monthNav.insertBefore(self.oldCurMonth.cloneNode(true), delta > 0 ? self.oldCurMonth.nextSibling : self.oldCurMonth);
        var daysContainer = self.daysContainer;
        if (daysContainer.firstChild && daysContainer.lastChild) {
            if (delta > 0) {
                daysContainer.firstChild.classList.add("slideLeft");
                daysContainer.lastChild.classList.add("slideLeftNew");
                self.oldCurMonth.classList.add("slideLeft");
                self.navigationCurrentMonth.classList.add("slideLeftNew");
            }
            else if (delta < 0) {
                daysContainer.firstChild.classList.add("slideRightNew");
                daysContainer.lastChild.classList.add("slideRight");
                self.oldCurMonth.classList.add("slideRight");
                self.navigationCurrentMonth.classList.add("slideRightNew");
            }
        }
        self.currentMonthElement = self.navigationCurrentMonth
            .firstChild;
        self.currentYearElement = self.navigationCurrentMonth.lastChild
            .childNodes[0];
        updateNavigationCurrentMonth();
        if (self.oldCurMonth.firstChild)
            self.oldCurMonth.firstChild.textContent = monthToStr(self.currentMonth - delta, self.config.shorthandCurrentMonth, self.l10n);
        triggerEvent("onMonthChange");
        if (from_keyboard &&
            document.activeElement &&
            document.activeElement.$i) {
            var index_1 = document.activeElement.$i;
            afterDayAnim(function () {
                focusOnDay(index_1, 0);
            });
        }
    }
    function clear(triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        self.input.value = "";
        if (self.altInput)
            self.altInput.value = "";
        if (self.mobileInput)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        self.showTimeInput = false;
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            self.calendarContainer.classList.remove("open");
            self._input.classList.remove("active");
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            var h = self._handlers[i];
            h.element.removeEventListener(h.event, h.handler);
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode)
            self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
            self.input.value = "";
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem))
            return true;
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var isCalendarElement = isCalendarElem(e.target);
            var isInput = e.target === self.input ||
                e.target === self.altInput ||
                self.element.contains(e.target) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = e.type === "blur"
                ? isInput &&
                    e.relatedTarget &&
                    !isCalendarElem(e.relatedTarget)
                : !isInput && !isCalendarElement;
            if (lostFocus &&
                self.config.ignoredFocusElements.indexOf(e.target) === -1) {
                self.close();
                if (self.config.mode === "range" && self.selectedDates.length === 1) {
                    self.clear(false);
                    self.redraw();
                }
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.currentYearElement.min &&
                newYear < parseInt(self.currentYearElement.min)) ||
            (self.currentYearElement.max &&
                newYear > parseInt(self.currentYearElement.max)))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
        }
    }
    function isEnabled(date, timeless) {
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable.length && !self.config.disable.length)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string" && dateToCheck !== undefined) {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function onKeyDown(e) {
        var isInput = e.target === self._input;
        var calendarElem = isCalendarElem(e.target);
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.key === "Enter" && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                return e.target.blur();
            }
            else
                self.open();
        }
        else if (calendarElem || allowKeydown || allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(e.target);
            switch (e.key) {
                case "Enter":
                    if (isTimeObj)
                        updateValue();
                    else
                        selectDate(e);
                    break;
                case "Escape":
                    e.preventDefault();
                    self.close();
                    break;
                case "Backspace":
                case "Delete":
                    if (isInput && !self.config.allowInput)
                        self.clear();
                    break;
                case "ArrowLeft":
                case "ArrowRight":
                    if (!isTimeObj) {
                        e.preventDefault();
                        if (self.daysContainer) {
                            var delta_1 = e.key === "ArrowRight" ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(e.target.$i, delta_1);
                            else
                                changeMonth(delta_1, true, undefined, true);
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    e.preventDefault();
                    var delta = e.key === "ArrowDown" ? 1 : -1;
                    if (self.daysContainer && e.target.$i !== undefined) {
                        if (e.ctrlKey) {
                            changeYear(self.currentYear - delta);
                            focusOnDay(e.target.$i, 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(e.target.$i, delta * 7);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case "Tab":
                    if (e.target === self.hourElement) {
                        e.preventDefault();
                        self.minuteElement.select();
                    }
                    else if (e.target === self.minuteElement &&
                        (self.secondElement || self.amPM)) {
                        e.preventDefault();
                        if (self.secondElement !== undefined)
                            self.secondElement.focus();
                        else if (self.amPM !== undefined)
                            self.amPM.focus();
                    }
                    else if (e.target === self.secondElement && self.amPM) {
                        e.preventDefault();
                        self.amPM.focus();
                    }
                    break;
                case "a":
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = "AM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                case "p":
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = "PM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                default:
                    break;
            }
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 ||
            !elem.classList.contains("flatpickr-day") ||
            self.minRangeDate === undefined ||
            self.maxRangeDate === undefined)
            return;
        var hoverDate = elem.dateObj, initialDate = self.parseDate(self.selectedDates[0], undefined, true), rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()), containsDisabled = false;
        for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t))) {
                containsDisabled = true;
                break;
            }
        }
        var _loop_1 = function (timestamp, i) {
            var outOfRange = timestamp < self.minRangeDate.getTime() ||
                timestamp > self.maxRangeDate.getTime(), dayElem = self.days.childNodes[i];
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return "continue";
            }
            else if (containsDisabled && !outOfRange)
                return "continue";
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate), maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);
            elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");
            if (initialDate < hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("startRange");
            else if (initialDate > hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("endRange");
            if (timestamp >= minRangeDate && timestamp <= maxRangeDate)
                dayElem.classList.add("inRange");
        };
        for (var timestamp = self.days.childNodes[0].dateObj.getTime(), i = 0; i < 42; i++, timestamp += duration.DAY) {
            _loop_1(timestamp, i);
        }
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._input; }
        if (self.isMobile) {
            if (e) {
                e.preventDefault();
                e.target && e.target.blur();
            }
            setTimeout(function () {
                self.mobileInput !== undefined && self.mobileInput.click();
            }, 0);
            triggerEvent("onOpen");
            return;
        }
        if (self._input.disabled || self.config.inline)
            return;
        self.isOpen = true;
        self.calendarContainer.classList.add("open");
        positionCalendar(positionElement);
        self._input.classList.add("active");
        triggerEvent("onOpen");
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var hooks = [
            "onChange",
            "onClose",
            "onDayCreate",
            "onDestroy",
            "onKeyDown",
            "onMonthChange",
            "onOpen",
            "onParseConfig",
            "onReady",
            "onValueUpdate",
            "onYearChange",
        ];
        self.config = __assign({}, flatpickr.defaultConfig);
        var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
        var formats$$1 = {};
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable || []; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable || []; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        if (!userConfig.dateFormat && userConfig.enableTime) {
            formats$$1.dateFormat = userConfig.noCalendar
                ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                : flatpickr.defaultConfig.dateFormat +
                    " H:i" +
                    (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
            formats$$1.altFormat = userConfig.noCalendar
                ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                : flatpickr.defaultConfig.altFormat +
                    (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        Object.assign(self.config, formats$$1, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        for (var i = hooks.length; i--;) {
            if (self.config[hooks[i]] !== undefined) {
                self.config[hooks[i]] = arrayify(self.config[hooks[i]] || []).map(bindToInstance);
            }
        }
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (~hooks.indexOf(key)) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable.length &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        triggerEvent("onParseConfig");
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            console.warn("flatpickr: invalid locale " + self.config.locale);
        self.l10n = __assign({}, flatpickr.l10ns.default, typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined);
    }
    function positionCalendar(positionElement) {
        if (positionElement === void 0) { positionElement = self._positionElement; }
        if (self.calendarContainer === undefined)
            return;
        var calendarHeight = self.calendarContainer.offsetHeight, calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPos === "above" ||
            (configPos !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var right = window.document.body.offsetWidth - inputBounds.right;
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildWeekdays();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = findParent(e.target, isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2)
                self.clear();
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear)
                triggerEvent("onYearChange");
            triggerEvent("onMonthChange");
        }
        buildDays();
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.config.enableTime &&
            compareDates(selectedDate, self.config.minDate) === 0)
            setHoursFromDate(self.config.minDate);
        updateValue();
        if (self.config.enableTime)
            setTimeout(function () { return (self.showTimeInput = true); }, 50);
        if (self.config.mode === "range") {
            if (self.selectedDates.length === 1) {
                onMouseOver(target);
                self._hidePrevMonthArrow =
                    self._hidePrevMonthArrow ||
                        (self.minRangeDate !== undefined &&
                            self.minRangeDate >
                                self.days.childNodes[0].dateObj);
                self._hideNextMonthArrow =
                    self._hideNextMonthArrow ||
                        (self.maxRangeDate !== undefined &&
                            self.maxRangeDate <
                                new Date(self.currentYear, self.currentMonth + 1, 1));
            }
            else
                updateNavigationCurrentMonth();
        }
        triggerEvent("onChange");
        if (!shouldChangeMonth)
            focusOnDay(target.$i, 0);
        else
            afterDayAnim(function () { return self.selectedDateElem && self.selectedDateElem.focus(); });
        if (self.hourElement !== undefined)
            setTimeout(function () { return self.hourElement !== undefined && self.hourElement.select(); }, 451);
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range)
                self.close();
        }
    }
    function set(option, value) {
        if (option !== null && typeof option === "object")
            Object.assign(self.config, option);
        else
            self.config[option] = value;
        self.redraw();
        jumpToDate();
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split("; ")
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
        self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = undefined; }
        if (date !== 0 && !date)
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.showTimeInput = self.selectedDates.length > 0;
        self.latestSelectedDateObj = self.selectedDates[0];
        self.redraw();
        jumpToDate();
        setHoursFromDate();
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = new Date();
        var preloadedDate = self.config.defaultDate || self.input.value;
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        var initialDate = self.selectedDates.length
            ? self.selectedDates[0]
            : self.config.minDate &&
                self.config.minDate.getTime() > self.now.getTime()
                ? self.config.minDate
                : self.config.maxDate &&
                    self.config.maxDate.getTime() < self.now.getTime()
                    ? self.config.maxDate
                    : self.now;
        self.currentYear = initialDate.getFullYear();
        self.currentMonth = initialDate.getMonth();
        if (self.selectedDates.length)
            self.latestSelectedDateObj = self.selectedDates[0];
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
        Object.defineProperty(self, "showTimeInput", {
            get: function () { return self._showTimeInput; },
            set: function (bool) {
                self._showTimeInput = bool;
                if (self.calendarContainer)
                    toggleClass(self.calendarContainer, "showTimeInput", bool);
                positionCalendar();
            },
        });
    }
    function formatDate(dateObj, frmt) {
        if (self.config !== undefined && self.config.formatDate !== undefined)
            return self.config.formatDate(dateObj, frmt);
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return formats[c] && arr[i - 1] !== "\\"
                ? formats[c](dateObj, self.l10n, self.config)
                : c !== "\\" ? c : "";
        })
            .join("");
    }
    function parseDate(date, givenFormat, timeless) {
        if (date !== 0 && !date)
            return undefined;
        var parsedDate;
        var date_orig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (self.config || flatpickr.defaultConfig).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr))
                parsedDate = new Date(date);
            else if (self.config && self.config.parseDate)
                parsedDate = self.config.parseDate(date, format);
            else {
                parsedDate =
                    !self.config || !self.config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (tokenRegex[token] && !escaped) {
                        regexStr += tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate =
                            fn(parsedDate, val, self.l10n) || parsedDate);
                    });
                }
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date)) {
            console.warn("flatpickr: invalid date " + date_orig);
            console.info(self.element);
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    }
    function setupInputs() {
        self.input = self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
        if (!self.input) {
            console.warn("Error: invalid input element specified", self.input);
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.type = "text";
            self.input.type = "hidden";
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar ? "time" : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.step = self.input.getAttribute("step") || "any";
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date" ? "Y-m-d" : "H:i:S";
        if (self.selectedDates.length) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        self.mobileInput.addEventListener("change", function (e) {
            self.setDate(e.target.value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle() {
        if (self.isOpen)
            return self.close();
        self.open();
    }
    function triggerEvent(event, data) {
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.currentMonthElement.textContent =
            monthToStr(self.currentMonth, self.config.shorthandCurrentMonth, self.l10n) + " ";
        self.currentYearElement.value = self.currentYear.toString();
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (!self.selectedDates.length)
            return self.clear(triggerChange);
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        var joinChar = self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator;
        self.input.value = self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, self.config.dateFormat); })
            .join(joinChar);
        if (self.altInput !== undefined) {
            self.altInput.value = self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, self.config.altFormat); })
                .join(joinChar);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavScroll(e) {
        e.preventDefault();
        var isYear = self.currentYearElement.parentNode &&
            self.currentYearElement.parentNode.contains(e.target);
        if (e.target === self.currentMonthElement || isYear) {
            var delta = mouseDelta(e);
            if (isYear) {
                changeYear(self.currentYear + delta);
                e.target.value = self.currentYear.toString();
            }
            else
                self.changeMonth(delta, true, false);
        }
    }
    function onMonthNavClick(e) {
        var isPrevMonth = self.prevMonthNav.contains(e.target);
        var isNextMonth = self.nextMonthNav.contains(e.target);
        if (isPrevMonth || isNextMonth)
            changeMonth(isPrevMonth ? -1 : 1);
        else if (e.target === self.currentYearElement) {
            e.preventDefault();
            self.currentYearElement.select();
        }
        else if (e.target.className === "arrowUp")
            self.changeYear(self.currentYear + 1);
        else if (e.target.className === "arrowDown")
            self.changeYear(self.currentYear - 1);
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", input = e.target;
        if (self.amPM !== undefined && e.target === self.amPM)
            self.amPM.textContent =
                self.l10n.amPM[self.amPM.textContent === "AM" ? 1 : 0];
        var min = Number(input.min), max = Number(input.max), step = Number(input.step), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown
                ? e.which === 38 ? 1 : -1
                : Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) || 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        int(!isHourElem) +
                        (int(isHourElem) && int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step))
                self.amPM.textContent = self.amPM.textContent === "PM" ? "AM" : "PM";
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList);
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.warn(e, e.stack);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr;
flatpickr = function (selector, config) {
    if (selector instanceof NodeList)
        return _flatpickr(selector, config);
    else if (typeof selector === "string")
        return _flatpickr(window.document.querySelectorAll(selector), config);
    return _flatpickr([selector], config);
};
if (typeof window === "object")
    window.flatpickr = flatpickr;
flatpickr.defaultConfig = defaults;
flatpickr.l10ns = {
    en: __assign({}, english),
    default: __assign({}, english),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign({}, flatpickr.l10ns.default, l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
};
if (typeof jQuery !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
var flatpickr$1 = flatpickr;

return flatpickr$1;

})));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* flatpickr v4.0.6, @license MIT */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.confirmDate = factory());
}(this, (function () { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var defaultConfig = {
    confirmIcon: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='17' height='17' viewBox='0 0 17 17'> <g> </g> <path d='M15.418 1.774l-8.833 13.485-4.918-4.386 0.666-0.746 4.051 3.614 8.198-12.515 0.836 0.548z' fill='#000000' /> </svg>",
    confirmText: "OK ",
    showAlways: false,
    theme: "light",
};
function confirmDatePlugin(pluginConfig) {
    var config = __assign({}, defaultConfig, pluginConfig);
    var confirmContainer;
    return function (fp) {
        var hooks = __assign({ onKeyDown: function (_, __, ___, e) {
                if (fp.config.enableTime && e.key === "Tab" && e.target === fp.amPM) {
                    e.preventDefault();
                    confirmContainer.focus();
                }
                else if (e.key === "Enter" && e.target === confirmContainer)
                    fp.close();
            },
            onReady: function () {
                if (fp.calendarContainer === undefined)
                    return;
                confirmContainer = fp._createElement("div", "flatpickr-confirm " + (config.showAlways
                    ? "visible"
                    : "") + " " + config.theme + "Theme", config.confirmText);
                confirmContainer.tabIndex = -1;
                confirmContainer.innerHTML += config.confirmIcon;
                confirmContainer.addEventListener("click", fp.close);
                fp.calendarContainer.appendChild(confirmContainer);
            } }, !config.showAlways
            ? {
                onChange: function (_, dateStr) {
                    var showCondition = fp.config.enableTime || fp.config.mode === "multiple";
                    if (dateStr && !fp.config.inline && showCondition)
                        return confirmContainer.classList.add("visible");
                    confirmContainer.classList.remove("visible");
                },
            }
            : {});
        return hooks;
    };
}

return confirmDatePlugin;

})));


/***/ }),
/* 24 */
/***/ (function(module, exports) {

!function(e){var s;e.fn.slinky=function(a){var t=e.extend({label:"Back",title:!1,speed:300,resize:!0,activeClass:"active",headerClass:"header",headingTag:"<h2>",backFirst:!1},a),i=e(this),n=i.children().first();i.addClass("slinky-menu");var l=function(e,s){var a=Math.round(parseInt(n.get(0).style.left))||0;n.css("left",a-100*e+"%"),"function"==typeof s&&setTimeout(s,t.speed)},r=function(e){i.height(e.outerHeight())},d=function(e){i.css("transition-duration",e+"ms"),n.css("transition-duration",e+"ms")};if(d(t.speed),e("a + ul",i).prev().addClass("next"),e("li > ul",i).prepend('<li class="'+t.headerClass+'">'),t.title===!0&&e("li > ul",i).each(function(){var s=e(this).parent().find("a").first().text(),a=e(t.headingTag).text(s);e("> ."+t.headerClass,this).append(a)}),t.title||t.label!==!0){var c=e("<a>").text(t.label).prop("href","#").addClass("back");t.backFirst?e("."+t.headerClass,i).prepend(c):e("."+t.headerClass,i).append(c)}else e("li > ul",i).each(function(){var s=e(this).parent().find("a").first().text(),a=e("<a>").text(s).prop("href","#").addClass("back");t.backFirst?e("> ."+t.headerClass,this).prepend(a):e("> ."+t.headerClass,this).append(a)});e("a",i).on("click",function(a){if(s+t.speed>Date.now())return!1;s=Date.now();var n=e(this);(/\B#/.test(this.href)||n.hasClass("next")||n.hasClass("back"))&&a.preventDefault(),n.hasClass("next")?(i.find("."+t.activeClass).removeClass(t.activeClass),n.next().show().addClass(t.activeClass),l(1),t.resize&&r(n.next())):n.hasClass("back")&&(l(-1,function(){i.find("."+t.activeClass).removeClass(t.activeClass),n.parent().parent().hide().parentsUntil(i,"ul").first().addClass(t.activeClass)}),t.resize&&r(n.parent().parent().parentsUntil(i,"ul")))}),this.jump=function(s,a){s=e(s);var n=i.find("."+t.activeClass);n=n.length>0?n.parentsUntil(i,"ul").length:0,i.find("ul").removeClass(t.activeClass).hide();var c=s.parentsUntil(i,"ul");c.show(),s.show().addClass(t.activeClass),a===!1&&d(0),l(c.length-n),t.resize&&r(s),a===!1&&d(t.speed)},this.home=function(s){s===!1&&d(0);var a=i.find("."+t.activeClass),n=a.parentsUntil(i,"li").length;n>0&&(l(-n,function(){a.removeClass(t.activeClass)}),t.resize&&r(e(a.parentsUntil(i,"li").get(n-1)).parent())),s===!1&&d(t.speed)},this.destroy=function(){e("."+t.headerClass,i).remove(),e("a",i).removeClass("next").off("click"),i.removeClass("slinky-menu").css("transition-duration",""),n.css("transition-duration","")};var h=i.find("."+t.activeClass);return h.length>0&&(h.removeClass(t.activeClass),this.jump(h,!1)),this}}(jQuery);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "/**\r\n * jQuery CSS Customizable Scrollbar\r\n *\r\n * Copyright 2015, Yuriy Khabarov\r\n * Dual licensed under the MIT or GPL Version 2 licenses.\r\n *\r\n * If you found bug, please contact me via email <13real008@gmail.com>\r\n *\r\n * @author Yuriy Khabarov aka Gromo\r\n * @version 0.2.11\r\n * @url https://github.com/gromo/jquery.scrollbar/\r\n *\r\n */\r\n;\r\n(function (root, factory) {\r\n    if (typeof define === 'function' && define.amd) {\r\n        define(['jquery'], factory);\r\n    } else if (typeof exports !== \"undefined\") {\r\n    factory(require('jquery'));\r\n    } else {\r\n        factory(root.jQuery);\r\n    }\r\n}(this, function ($) {\r\n    'use strict';\r\n\r\n    // init flags & variables\r\n    var debug = false;\r\n\r\n    var browser = {\r\n        data: {\r\n            index: 0,\r\n            name: 'scrollbar'\r\n        },\r\n        firefox: /firefox/i.test(navigator.userAgent),\r\n        macosx: /mac/i.test(navigator.platform),\r\n        msedge: /edge\\/\\d+/i.test(navigator.userAgent),\r\n        msie: /(msie|trident)/i.test(navigator.userAgent),\r\n        mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),\r\n        overlay: null,\r\n        scroll: null,\r\n        scrolls: [],\r\n        webkit: /webkit/i.test(navigator.userAgent) && !/edge\\/\\d+/i.test(navigator.userAgent)\r\n    };\r\n\r\n    browser.scrolls.add = function (instance) {\r\n        this.remove(instance).push(instance);\r\n    };\r\n    browser.scrolls.remove = function (instance) {\r\n        while ($.inArray(instance, this) >= 0) {\r\n            this.splice($.inArray(instance, this), 1);\r\n        }\r\n        return this;\r\n    };\r\n\r\n    var defaults = {\r\n        autoScrollSize: true, // automatically calculate scrollsize\r\n        autoUpdate: true, // update scrollbar if content/container size changed\r\n        debug: false, // debug mode\r\n        disableBodyScroll: false, // disable body scroll if mouse over container\r\n        duration: 200, // scroll animate duration in ms\r\n        ignoreMobile: false, // ignore mobile devices\r\n        ignoreOverlay: false, // ignore browsers with overlay scrollbars (mobile, MacOS)\r\n        isRtl: false, // is RTL\r\n        scrollStep: 30, // scroll step for scrollbar arrows\r\n        showArrows: false, // add class to show arrows\r\n        stepScrolling: true, // when scrolling to scrollbar mousedown position\r\n\r\n        scrollx: null, // horizontal scroll element\r\n        scrolly: null, // vertical scroll element\r\n\r\n        onDestroy: null, // callback function on destroy,\r\n        onFallback: null, // callback function if scrollbar is not initialized\r\n        onInit: null, // callback function on first initialization\r\n        onScroll: null, // callback function on content scrolling\r\n        onUpdate: null            // callback function on init/resize (before scrollbar size calculation)\r\n    };\r\n\r\n\r\n    var BaseScrollbar = function (container) {\r\n\r\n        if (!browser.scroll) {\r\n            browser.overlay = isScrollOverlaysContent();\r\n            browser.scroll = getBrowserScrollSize();\r\n            updateScrollbars();\r\n\r\n            $(window).resize(function () {\r\n                var forceUpdate = false;\r\n                if (browser.scroll && (browser.scroll.height || browser.scroll.width)) {\r\n                    var scroll = getBrowserScrollSize();\r\n                    if (scroll.height !== browser.scroll.height || scroll.width !== browser.scroll.width) {\r\n                        browser.scroll = scroll;\r\n                        forceUpdate = true; // handle page zoom\r\n                    }\r\n                }\r\n                updateScrollbars(forceUpdate);\r\n            });\r\n        }\r\n\r\n        this.container = container;\r\n        this.namespace = '.scrollbar_' + browser.data.index++;\r\n        this.options = $.extend({}, defaults, window.jQueryScrollbarOptions || {});\r\n        this.scrollTo = null;\r\n        this.scrollx = {};\r\n        this.scrolly = {};\r\n\r\n        container.data(browser.data.name, this);\r\n        browser.scrolls.add(this);\r\n    };\r\n\r\n    BaseScrollbar.prototype = {\r\n        destroy: function () {\r\n\r\n            if (!this.wrapper) {\r\n                return;\r\n            }\r\n\r\n            this.container.removeData(browser.data.name);\r\n            browser.scrolls.remove(this);\r\n\r\n            // init variables\r\n            var scrollLeft = this.container.scrollLeft();\r\n            var scrollTop = this.container.scrollTop();\r\n\r\n            this.container.insertBefore(this.wrapper).css({\r\n                \"height\": \"\",\r\n                \"margin\": \"\",\r\n                \"max-height\": \"\"\r\n            })\r\n                .removeClass('scroll-content scroll-scrollx_visible scroll-scrolly_visible')\r\n                .off(this.namespace)\r\n                .scrollLeft(scrollLeft)\r\n                .scrollTop(scrollTop);\r\n\r\n            this.scrollx.scroll.removeClass('scroll-scrollx_visible').find('div').addBack().off(this.namespace);\r\n            this.scrolly.scroll.removeClass('scroll-scrolly_visible').find('div').addBack().off(this.namespace);\r\n\r\n            this.wrapper.remove();\r\n\r\n            $(document).add('body').off(this.namespace);\r\n\r\n            if ($.isFunction(this.options.onDestroy)) {\r\n                this.options.onDestroy.apply(this, [this.container]);\r\n            }\r\n        },\r\n        init: function (options) {\r\n\r\n            // init variables\r\n            var S = this,\r\n                c = this.container,\r\n                cw = this.containerWrapper || c,\r\n                namespace = this.namespace,\r\n                o = $.extend(this.options, options || {}),\r\n                s = {x: this.scrollx, y: this.scrolly},\r\n            w = this.wrapper,\r\n                cssOptions = {};\r\n\r\n            var initScroll = {\r\n                scrollLeft: c.scrollLeft(),\r\n                scrollTop: c.scrollTop()\r\n            };\r\n\r\n            // do not init if in ignorable browser\r\n            if ((browser.mobile && o.ignoreMobile)\r\n                || (browser.overlay && o.ignoreOverlay)\r\n                || (browser.macosx && !browser.webkit) // still required to ignore nonWebKit browsers on Mac\r\n                ) {\r\n                if ($.isFunction(o.onFallback)) {\r\n                    o.onFallback.apply(this, [c]);\r\n                }\r\n                return false;\r\n            }\r\n\r\n            // init scroll container\r\n            if (!w) {\r\n                this.wrapper = w = $('<div>').addClass('scroll-wrapper').addClass(c.attr('class'))\r\n                    .css('position', c.css('position') === 'absolute' ? 'absolute' : 'relative')\r\n                    .insertBefore(c).append(c);\r\n\r\n                if (o.isRtl) {\r\n                    w.addClass('scroll--rtl');\r\n                }\r\n\r\n                if (c.is('textarea')) {\r\n                    this.containerWrapper = cw = $('<div>').insertBefore(c).append(c);\r\n                    w.addClass('scroll-textarea');\r\n                }\r\n\r\n                cssOptions = {\r\n                    \"height\": \"auto\",\r\n                    \"margin-bottom\": browser.scroll.height * -1 + 'px',\r\n                    \"max-height\": \"\"\r\n                };\r\n                cssOptions[o.isRtl ? 'margin-left' : 'margin-right'] = browser.scroll.width * -1 + 'px';\r\n\r\n                cw.addClass('scroll-content').css(cssOptions);\r\n\r\n                c.on('scroll' + namespace, function (event) {\r\n                    var scrollLeft = c.scrollLeft();\r\n                    var scrollTop = c.scrollTop();\r\n                    if (o.isRtl) {\r\n                        // webkit   0:100\r\n                        // ie/edge  100:0\r\n                        // firefox -100:0\r\n                        switch (true) {\r\n                            case browser.firefox:\r\n                                scrollLeft = Math.abs(scrollLeft);\r\n                            case browser.msedge || browser.msie:\r\n                                scrollLeft = c[0].scrollWidth - c[0].clientWidth - scrollLeft;\r\n                                break;\r\n                        }\r\n                    }\r\n                    if ($.isFunction(o.onScroll)) {\r\n                        o.onScroll.call(S, {\r\n                            maxScroll: s.y.maxScrollOffset,\r\n                            scroll: scrollTop,\r\n                            size: s.y.size,\r\n                            visible: s.y.visible\r\n                        }, {\r\n                            maxScroll: s.x.maxScrollOffset,\r\n                            scroll: scrollLeft,\r\n                            size: s.x.size,\r\n                            visible: s.x.visible\r\n                        });\r\n                    }\r\n                    s.x.isVisible && s.x.scroll.bar.css('left', scrollLeft * s.x.kx + 'px');\r\n                    s.y.isVisible && s.y.scroll.bar.css('top', scrollTop * s.y.kx + 'px');\r\n                });\r\n\r\n                /* prevent native scrollbars to be visible on #anchor click */\r\n                w.on('scroll' + namespace, function () {\r\n                    w.scrollTop(0).scrollLeft(0);\r\n                });\r\n\r\n                if (o.disableBodyScroll) {\r\n                    var handleMouseScroll = function (event) {\r\n                        isVerticalScroll(event) ?\r\n                            s.y.isVisible && s.y.mousewheel(event) :\r\n                            s.x.isVisible && s.x.mousewheel(event);\r\n                    };\r\n                    w.on('MozMousePixelScroll' + namespace, handleMouseScroll);\r\n                    w.on('mousewheel' + namespace, handleMouseScroll);\r\n\r\n                    if (browser.mobile) {\r\n                        w.on('touchstart' + namespace, function (event) {\r\n                            var touch = event.originalEvent.touches && event.originalEvent.touches[0] || event;\r\n                            var originalTouch = {\r\n                                pageX: touch.pageX,\r\n                                pageY: touch.pageY\r\n                            };\r\n                            var originalScroll = {\r\n                                left: c.scrollLeft(),\r\n                                top: c.scrollTop()\r\n                            };\r\n                            $(document).on('touchmove' + namespace, function (event) {\r\n                                var touch = event.originalEvent.targetTouches && event.originalEvent.targetTouches[0] || event;\r\n                                c.scrollLeft(originalScroll.left + originalTouch.pageX - touch.pageX);\r\n                                c.scrollTop(originalScroll.top + originalTouch.pageY - touch.pageY);\r\n                                event.preventDefault();\r\n                            });\r\n                            $(document).on('touchend' + namespace, function () {\r\n                                $(document).off(namespace);\r\n                            });\r\n                        });\r\n                    }\r\n                }\r\n                if ($.isFunction(o.onInit)) {\r\n                    o.onInit.apply(this, [c]);\r\n                }\r\n            } else {\r\n                cssOptions = {\r\n                    \"height\": \"auto\",\r\n                    \"margin-bottom\": browser.scroll.height * -1 + 'px',\r\n                    \"max-height\": \"\"\r\n                };\r\n                cssOptions[o.isRtl ? 'margin-left' : 'margin-right'] = browser.scroll.width * -1 + 'px';\r\n                cw.css(cssOptions);\r\n            }\r\n\r\n            // init scrollbars & recalculate sizes\r\n            $.each(s, function (d, scrollx) {\r\n\r\n                var scrollCallback = null;\r\n                var scrollForward = 1;\r\n                var scrollOffset = (d === 'x') ? 'scrollLeft' : 'scrollTop';\r\n                var scrollStep = o.scrollStep;\r\n                var scrollTo = function () {\r\n                    var currentOffset = c[scrollOffset]();\r\n                    c[scrollOffset](currentOffset + scrollStep);\r\n                    if (scrollForward == 1 && (currentOffset + scrollStep) >= scrollToValue)\r\n                        currentOffset = c[scrollOffset]();\r\n                    if (scrollForward == -1 && (currentOffset + scrollStep) <= scrollToValue)\r\n                        currentOffset = c[scrollOffset]();\r\n                    if (c[scrollOffset]() == currentOffset && scrollCallback) {\r\n                        scrollCallback();\r\n                    }\r\n                }\r\n                var scrollToValue = 0;\r\n\r\n                if (!scrollx.scroll) {\r\n\r\n                    scrollx.scroll = S._getScroll(o['scroll' + d]).addClass('scroll-' + d);\r\n\r\n                    if (o.showArrows) {\r\n                        scrollx.scroll.addClass('scroll-element_arrows_visible');\r\n                    }\r\n\r\n                    scrollx.mousewheel = function (event) {\r\n\r\n                        if (!scrollx.isVisible || (d === 'x' && isVerticalScroll(event))) {\r\n                            return true;\r\n                        }\r\n                        if (d === 'y' && !isVerticalScroll(event)) {\r\n                            s.x.mousewheel(event);\r\n                            return true;\r\n                        }\r\n\r\n                        var delta = event.originalEvent.wheelDelta * -1 || event.originalEvent.detail;\r\n                        var maxScrollValue = scrollx.size - scrollx.visible - scrollx.offset;\r\n\r\n                        // fix new mozilla\r\n                        if (!delta) {\r\n                            if (d === 'x' && !!event.originalEvent.deltaX) {\r\n                                delta = event.originalEvent.deltaX * 40;\r\n                            } else if (d === 'y' && !!event.originalEvent.deltaY) {\r\n                                delta = event.originalEvent.deltaY * 40;\r\n                            }\r\n                        }\r\n\r\n                        if ((delta > 0 && scrollToValue < maxScrollValue) || (delta < 0 && scrollToValue > 0)) {\r\n                            scrollToValue = scrollToValue + delta;\r\n                            if (scrollToValue < 0)\r\n                                scrollToValue = 0;\r\n                            if (scrollToValue > maxScrollValue)\r\n                                scrollToValue = maxScrollValue;\r\n\r\n                            S.scrollTo = S.scrollTo || {};\r\n                            S.scrollTo[scrollOffset] = scrollToValue;\r\n                            setTimeout(function () {\r\n                                if (S.scrollTo) {\r\n                                    c.stop().animate(S.scrollTo, 240, 'linear', function () {\r\n                                        scrollToValue = c[scrollOffset]();\r\n                                    });\r\n                                    S.scrollTo = null;\r\n                                }\r\n                            }, 1);\r\n                        }\r\n\r\n                        event.preventDefault();\r\n                        return false;\r\n                    };\r\n\r\n                    scrollx.scroll\r\n                        .on('MozMousePixelScroll' + namespace, scrollx.mousewheel)\r\n                        .on('mousewheel' + namespace, scrollx.mousewheel)\r\n                        .on('mouseenter' + namespace, function () {\r\n                            scrollToValue = c[scrollOffset]();\r\n                        });\r\n\r\n                    // handle arrows & scroll inner mousedown event\r\n                    scrollx.scroll.find('.scroll-arrow, .scroll-element_track')\r\n                        .on('mousedown' + namespace, function (event) {\r\n\r\n                            if (event.which != 1) // lmb\r\n                                return true;\r\n\r\n                            scrollForward = 1;\r\n\r\n                            var data = {\r\n                                eventOffset: event[(d === 'x') ? 'pageX' : 'pageY'],\r\n                                maxScrollValue: scrollx.size - scrollx.visible - scrollx.offset,\r\n                                scrollbarOffset: scrollx.scroll.bar.offset()[(d === 'x') ? 'left' : 'top'],\r\n                                scrollbarSize: scrollx.scroll.bar[(d === 'x') ? 'outerWidth' : 'outerHeight']()\r\n                            };\r\n                            var timeout = 0, timer = 0;\r\n\r\n                            if ($(this).hasClass('scroll-arrow')) {\r\n                                scrollForward = $(this).hasClass(\"scroll-arrow_more\") ? 1 : -1;\r\n                                scrollStep = o.scrollStep * scrollForward;\r\n                                scrollToValue = scrollForward > 0 ? data.maxScrollValue : 0;\r\n                                if (o.isRtl) {\r\n                                    switch(true){\r\n                                        case browser.firefox:\r\n                                            scrollToValue = scrollForward > 0 ? 0: data.maxScrollValue * -1;\r\n                                            break;\r\n                                        case browser.msie || browser.msedge:\r\n                                            break;\r\n                                    }\r\n                                }\r\n                            } else {\r\n                                scrollForward = (data.eventOffset > (data.scrollbarOffset + data.scrollbarSize) ? 1\r\n                                    : (data.eventOffset < data.scrollbarOffset ? -1 : 0));\r\n                                if(d === 'x' && o.isRtl && (browser.msie || browser.msedge))\r\n                                    scrollForward = scrollForward * -1;\r\n                                scrollStep = Math.round(scrollx.visible * 0.75) * scrollForward;\r\n                                scrollToValue = (data.eventOffset - data.scrollbarOffset -\r\n                                    (o.stepScrolling ? (scrollForward == 1 ? data.scrollbarSize : 0)\r\n                                        : Math.round(data.scrollbarSize / 2)));\r\n                                scrollToValue = c[scrollOffset]() + (scrollToValue / scrollx.kx);\r\n                            }\r\n\r\n                            S.scrollTo = S.scrollTo || {};\r\n                            S.scrollTo[scrollOffset] = o.stepScrolling ? c[scrollOffset]() + scrollStep : scrollToValue;\r\n\r\n                            if (o.stepScrolling) {\r\n                                scrollCallback = function () {\r\n                                    scrollToValue = c[scrollOffset]();\r\n                                    clearInterval(timer);\r\n                                    clearTimeout(timeout);\r\n                                    timeout = 0;\r\n                                    timer = 0;\r\n                                };\r\n                                timeout = setTimeout(function () {\r\n                                    timer = setInterval(scrollTo, 40);\r\n                                }, o.duration + 100);\r\n                            }\r\n\r\n                            setTimeout(function () {\r\n                                if (S.scrollTo) {\r\n                                    c.animate(S.scrollTo, o.duration);\r\n                                    S.scrollTo = null;\r\n                                }\r\n                            }, 1);\r\n\r\n                            return S._handleMouseDown(scrollCallback, event);\r\n                        });\r\n\r\n                    // handle scrollbar drag'n'drop\r\n                    scrollx.scroll.bar.on('mousedown' + namespace, function (event) {\r\n\r\n                        if (event.which != 1) // lmb\r\n                            return true;\r\n\r\n                        var eventPosition = event[(d === 'x') ? 'pageX' : 'pageY'];\r\n                        var initOffset = c[scrollOffset]();\r\n\r\n                        scrollx.scroll.addClass('scroll-draggable');\r\n\r\n                        $(document).on('mousemove' + namespace, function (event) {\r\n                            var diff = parseInt((event[(d === 'x') ? 'pageX' : 'pageY'] - eventPosition) / scrollx.kx, 10);\r\n                            if (d === 'x' && o.isRtl && (browser.msie || browser.msedge))\r\n                                diff = diff * -1;\r\n                            c[scrollOffset](initOffset + diff);\r\n                        });\r\n\r\n                        return S._handleMouseDown(function () {\r\n                            scrollx.scroll.removeClass('scroll-draggable');\r\n                            scrollToValue = c[scrollOffset]();\r\n                        }, event);\r\n                    });\r\n                }\r\n            });\r\n\r\n            // remove classes & reset applied styles\r\n            $.each(s, function (d, scrollx) {\r\n                var scrollClass = 'scroll-scroll' + d + '_visible';\r\n                var scrolly = (d == \"x\") ? s.y : s.x;\r\n\r\n                scrollx.scroll.removeClass(scrollClass);\r\n                scrolly.scroll.removeClass(scrollClass);\r\n                cw.removeClass(scrollClass);\r\n            });\r\n\r\n            // calculate init sizes\r\n            $.each(s, function (d, scrollx) {\r\n                $.extend(scrollx, (d == \"x\") ? {\r\n                    offset: parseInt(c.css('left'), 10) || 0,\r\n                    size: c.prop('scrollWidth'),\r\n                    visible: w.width()\r\n                } : {\r\n                    offset: parseInt(c.css('top'), 10) || 0,\r\n                    size: c.prop('scrollHeight'),\r\n                    visible: w.height()\r\n                });\r\n            });\r\n\r\n            // update scrollbar visibility/dimensions\r\n            this._updateScroll('x', this.scrollx);\r\n            this._updateScroll('y', this.scrolly);\r\n\r\n            if ($.isFunction(o.onUpdate)) {\r\n                o.onUpdate.apply(this, [c]);\r\n            }\r\n\r\n            // calculate scroll size\r\n            $.each(s, function (d, scrollx) {\r\n\r\n                var cssOffset = (d === 'x') ? 'left' : 'top';\r\n                var cssFullSize = (d === 'x') ? 'outerWidth' : 'outerHeight';\r\n                var cssSize = (d === 'x') ? 'width' : 'height';\r\n                var offset = parseInt(c.css(cssOffset), 10) || 0;\r\n\r\n                var AreaSize = scrollx.size;\r\n                var AreaVisible = scrollx.visible + offset;\r\n\r\n                var scrollSize = scrollx.scroll.size[cssFullSize]() + (parseInt(scrollx.scroll.size.css(cssOffset), 10) || 0);\r\n\r\n                if (o.autoScrollSize) {\r\n                    scrollx.scrollbarSize = parseInt(scrollSize * AreaVisible / AreaSize, 10);\r\n                    scrollx.scroll.bar.css(cssSize, scrollx.scrollbarSize + 'px');\r\n                }\r\n\r\n                scrollx.scrollbarSize = scrollx.scroll.bar[cssFullSize]();\r\n                scrollx.kx = ((scrollSize - scrollx.scrollbarSize) / (AreaSize - AreaVisible)) || 1;\r\n                scrollx.maxScrollOffset = AreaSize - AreaVisible;\r\n            });\r\n\r\n            c.scrollLeft(initScroll.scrollLeft).scrollTop(initScroll.scrollTop).trigger('scroll');\r\n        },\r\n        /**\r\n         * Get scrollx/scrolly object\r\n         *\r\n         * @param {Mixed} scroll\r\n         * @returns {jQuery} scroll object\r\n         */\r\n        _getScroll: function (scroll) {\r\n            var types = {\r\n                advanced: [\r\n                    '<div class=\"scroll-element\">',\r\n                    '<div class=\"scroll-element_corner\"></div>',\r\n                    '<div class=\"scroll-arrow scroll-arrow_less\"></div>',\r\n                    '<div class=\"scroll-arrow scroll-arrow_more\"></div>',\r\n                    '<div class=\"scroll-element_outer\">',\r\n                    '<div class=\"scroll-element_size\"></div>', // required! used for scrollbar size calculation !\r\n                    '<div class=\"scroll-element_inner-wrapper\">',\r\n                    '<div class=\"scroll-element_inner scroll-element_track\">', // used for handling scrollbar click\r\n                    '<div class=\"scroll-element_inner-bottom\"></div>',\r\n                    '</div>',\r\n                    '</div>',\r\n                    '<div class=\"scroll-bar\">', // required\r\n                    '<div class=\"scroll-bar_body\">',\r\n                    '<div class=\"scroll-bar_body-inner\"></div>',\r\n                    '</div>',\r\n                    '<div class=\"scroll-bar_bottom\"></div>',\r\n                    '<div class=\"scroll-bar_center\"></div>',\r\n                    '</div>',\r\n                    '</div>',\r\n                    '</div>'\r\n                ].join(''),\r\n                simple: [\r\n                    '<div class=\"scroll-element\">',\r\n                    '<div class=\"scroll-element_outer\">',\r\n                    '<div class=\"scroll-element_size\"></div>', // required! used for scrollbar size calculation !\r\n                    '<div class=\"scroll-element_track\"></div>', // used for handling scrollbar click\r\n                    '<div class=\"scroll-bar\"></div>', // required\r\n                    '</div>',\r\n                    '</div>'\r\n                ].join('')\r\n            };\r\n            if (types[scroll]) {\r\n                scroll = types[scroll];\r\n            }\r\n            if (!scroll) {\r\n                scroll = types['simple'];\r\n            }\r\n            if (typeof (scroll) == 'string') {\r\n                scroll = $(scroll).appendTo(this.wrapper);\r\n            } else {\r\n                scroll = $(scroll);\r\n            }\r\n            $.extend(scroll, {\r\n                bar: scroll.find('.scroll-bar'),\r\n                size: scroll.find('.scroll-element_size'),\r\n                track: scroll.find('.scroll-element_track')\r\n            });\r\n            return scroll;\r\n        },\r\n        _handleMouseDown: function (callback, event) {\r\n\r\n            var namespace = this.namespace;\r\n\r\n            $(document).on('blur' + namespace, function () {\r\n                $(document).add('body').off(namespace);\r\n                callback && callback();\r\n            });\r\n            $(document).on('dragstart' + namespace, function (event) {\r\n                event.preventDefault();\r\n                return false;\r\n            });\r\n            $(document).on('mouseup' + namespace, function () {\r\n                $(document).add('body').off(namespace);\r\n                callback && callback();\r\n            });\r\n            $('body').on('selectstart' + namespace, function (event) {\r\n                event.preventDefault();\r\n                return false;\r\n            });\r\n\r\n            event && event.preventDefault();\r\n            return false;\r\n        },\r\n        _updateScroll: function (d, scrollx) {\r\n\r\n            var container = this.container,\r\n                containerWrapper = this.containerWrapper || container,\r\n                scrollClass = 'scroll-scroll' + d + '_visible',\r\n                scrolly = (d === 'x') ? this.scrolly : this.scrollx,\r\n                offset = parseInt(this.container.css((d === 'x') ? 'left' : 'top'), 10) || 0,\r\n                wrapper = this.wrapper;\r\n\r\n            var AreaSize = scrollx.size;\r\n            var AreaVisible = scrollx.visible + offset;\r\n\r\n            scrollx.isVisible = (AreaSize - AreaVisible) > 1; // bug in IE9/11 with 1px diff\r\n            if (scrollx.isVisible) {\r\n                scrollx.scroll.addClass(scrollClass);\r\n                scrolly.scroll.addClass(scrollClass);\r\n                containerWrapper.addClass(scrollClass);\r\n            } else {\r\n                scrollx.scroll.removeClass(scrollClass);\r\n                scrolly.scroll.removeClass(scrollClass);\r\n                containerWrapper.removeClass(scrollClass);\r\n            }\r\n\r\n            if (d === 'y') {\r\n                if (container.is('textarea') || AreaSize < AreaVisible) {\r\n                    containerWrapper.css({\r\n                        \"height\": (AreaVisible + browser.scroll.height) + 'px',\r\n                        \"max-height\": \"none\"\r\n                    });\r\n                } else {\r\n                    containerWrapper.css({\r\n                        //\"height\": \"auto\", // do not reset height value: issue with height:100%!\r\n                        \"max-height\": (AreaVisible + browser.scroll.height) + 'px'\r\n                    });\r\n                }\r\n            }\r\n\r\n            if (scrollx.size != container.prop('scrollWidth')\r\n                || scrolly.size != container.prop('scrollHeight')\r\n                || scrollx.visible != wrapper.width()\r\n                || scrolly.visible != wrapper.height()\r\n                || scrollx.offset != (parseInt(container.css('left'), 10) || 0)\r\n                || scrolly.offset != (parseInt(container.css('top'), 10) || 0)\r\n                ) {\r\n                $.extend(this.scrollx, {\r\n                    offset: parseInt(container.css('left'), 10) || 0,\r\n                    size: container.prop('scrollWidth'),\r\n                    visible: wrapper.width()\r\n                });\r\n                $.extend(this.scrolly, {\r\n                    offset: parseInt(container.css('top'), 10) || 0,\r\n                    size: this.container.prop('scrollHeight'),\r\n                    visible: wrapper.height()\r\n                });\r\n                this._updateScroll(d === 'x' ? 'y' : 'x', scrolly);\r\n            }\r\n        }\r\n    };\r\n\r\n    var CustomScrollbar = BaseScrollbar;\r\n\r\n    /*\r\n     * Extend jQuery as plugin\r\n     *\r\n     * @param {Mixed} command to execute\r\n     * @param {Mixed} arguments as Array\r\n     * @return {jQuery}\r\n     */\r\n    $.fn.scrollbar = function (command, args) {\r\n        if (typeof command !== 'string') {\r\n            args = command;\r\n            command = 'init';\r\n        }\r\n        if (typeof args === 'undefined') {\r\n            args = [];\r\n        }\r\n        if (!$.isArray(args)) {\r\n            args = [args];\r\n        }\r\n        this.not('body, .scroll-wrapper').each(function () {\r\n            var element = $(this),\r\n                instance = element.data(browser.data.name);\r\n            if (instance || command === 'init') {\r\n                if (!instance) {\r\n                    instance = new CustomScrollbar(element);\r\n                }\r\n                if (instance[command]) {\r\n                    instance[command].apply(instance, args);\r\n                }\r\n            }\r\n        });\r\n        return this;\r\n    };\r\n\r\n    /**\r\n     * Connect default options to global object\r\n     */\r\n    $.fn.scrollbar.options = defaults;\r\n\r\n\r\n    /**\r\n     * Check if scroll content/container size is changed\r\n     */\r\n\r\n    var updateScrollbars = (function () {\r\n        var timer = 0,\r\n            timerCounter = 0;\r\n\r\n        return function (force) {\r\n            var i, container, options, scroll, wrapper, scrollx, scrolly;\r\n            for (i = 0; i < browser.scrolls.length; i++) {\r\n                scroll = browser.scrolls[i];\r\n                container = scroll.container;\r\n                options = scroll.options;\r\n                wrapper = scroll.wrapper;\r\n                scrollx = scroll.scrollx;\r\n                scrolly = scroll.scrolly;\r\n                if (force || (options.autoUpdate && wrapper && wrapper.is(':visible') &&\r\n                    (container.prop('scrollWidth') != scrollx.size || container.prop('scrollHeight') != scrolly.size || wrapper.width() != scrollx.visible || wrapper.height() != scrolly.visible))) {\r\n                    scroll.init();\r\n\r\n                    if (options.debug) {\r\n                        window.console && console.log({\r\n                            scrollHeight: container.prop('scrollHeight') + ':' + scroll.scrolly.size,\r\n                            scrollWidth: container.prop('scrollWidth') + ':' + scroll.scrollx.size,\r\n                            visibleHeight: wrapper.height() + ':' + scroll.scrolly.visible,\r\n                            visibleWidth: wrapper.width() + ':' + scroll.scrollx.visible\r\n                        }, true);\r\n                        timerCounter++;\r\n                    }\r\n                }\r\n            }\r\n            if (debug && timerCounter > 10) {\r\n                window.console && console.log('Scroll updates exceed 10');\r\n                updateScrollbars = function () {};\r\n            } else {\r\n                clearTimeout(timer);\r\n                timer = setTimeout(updateScrollbars, 300);\r\n            }\r\n        };\r\n    })();\r\n\r\n    /* ADDITIONAL FUNCTIONS */\r\n    /**\r\n     * Get native browser scrollbar size (height/width)\r\n     *\r\n     * @param {Boolean} actual size or CSS size, default - CSS size\r\n     * @returns {Object} with height, width\r\n     */\r\n    function getBrowserScrollSize(actualSize) {\r\n\r\n        if (browser.webkit && !actualSize) {\r\n            return {\r\n                height: 0,\r\n                width: 0\r\n            };\r\n        }\r\n\r\n        if (!browser.data.outer) {\r\n            var css = {\r\n                \"border\": \"none\",\r\n                \"box-sizing\": \"content-box\",\r\n                \"height\": \"200px\",\r\n                \"margin\": \"0\",\r\n                \"padding\": \"0\",\r\n                \"width\": \"200px\"\r\n            };\r\n            browser.data.inner = $(\"<div>\").css($.extend({}, css));\r\n            browser.data.outer = $(\"<div>\").css($.extend({\r\n                \"left\": \"-1000px\",\r\n                \"overflow\": \"scroll\",\r\n                \"position\": \"absolute\",\r\n                \"top\": \"-1000px\"\r\n            }, css)).append(browser.data.inner).appendTo(\"body\");\r\n        }\r\n\r\n        browser.data.outer.scrollLeft(1000).scrollTop(1000);\r\n\r\n        return {\r\n            height: Math.ceil((browser.data.outer.offset().top - browser.data.inner.offset().top) || 0),\r\n            width: Math.ceil((browser.data.outer.offset().left - browser.data.inner.offset().left) || 0)\r\n        };\r\n    }\r\n\r\n    /**\r\n     * Check if native browser scrollbars overlay content\r\n     *\r\n     * @returns {Boolean}\r\n     */\r\n    function isScrollOverlaysContent() {\r\n        var scrollSize = getBrowserScrollSize(true);\r\n        return !(scrollSize.height || scrollSize.width);\r\n    }\r\n\r\n    function isVerticalScroll(event) {\r\n        var e = event.originalEvent;\r\n        if (e.axis && e.axis === e.HORIZONTAL_AXIS)\r\n            return false;\r\n        if (e.wheelDeltaX)\r\n            return false;\r\n        return true;\r\n    }\r\n\r\n\r\n    /**\r\n     * Extend AngularJS as UI directive\r\n     * and expose a provider for override default config\r\n     *\r\n     */\r\n    if (window.angular) {\r\n        (function (angular) {\r\n            angular.module('jQueryScrollbar', [])\r\n                .provider('jQueryScrollbar', function () {\r\n                    var defaultOptions = defaults;\r\n                    return {\r\n                        setOptions: function (options) {\r\n                            angular.extend(defaultOptions, options);\r\n                        },\r\n                        $get: function () {\r\n                            return {\r\n                                options: angular.copy(defaultOptions)\r\n                            };\r\n                        }\r\n                    };\r\n                })\r\n                .directive('jqueryScrollbar', ['jQueryScrollbar', '$parse', function (jQueryScrollbar, $parse) {\r\n                        return {\r\n                            restrict: \"AC\",\r\n                            link: function (scope, element, attrs) {\r\n                                var model = $parse(attrs.jqueryScrollbar),\r\n                                    options = model(scope);\r\n                                element.scrollbar(options || jQueryScrollbar.options)\r\n                                    .on('$destroy', function () {\r\n                                        element.scrollbar('destroy');\r\n                                    });\r\n                            }\r\n                        };\r\n                    }]);\r\n        })(window.angular);\r\n    }\r\n}));\r\n"

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26)(__webpack_require__(25))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// load Bootstrap's JS
__webpack_require__(0);

// first initialize our app component
__webpack_require__(2);

// load Basecoat components
__webpack_require__(1);
__webpack_require__(5);
__webpack_require__(17);
__webpack_require__(8);
__webpack_require__(6);
__webpack_require__(3);
__webpack_require__(14);
__webpack_require__(4);
__webpack_require__(11);
__webpack_require__(21);
__webpack_require__(16);
__webpack_require__(9);
__webpack_require__(20);
__webpack_require__(10);
__webpack_require__(19);
__webpack_require__(15);
__webpack_require__(13);
__webpack_require__(12);
__webpack_require__(7);
__webpack_require__(18);


/***/ })
/******/ ]);
//# sourceMappingURL=dd.basecoat.js.map
