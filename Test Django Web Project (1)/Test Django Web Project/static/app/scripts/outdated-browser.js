'use strict';

// Modified "Outdated Browser" plugin from: https://github.com/burocratik/outdated-browser
window.browserLowerThan = function (cssProp) {

  // assign css3 property to IE browser version
  if (cssProp == 'IE8') {
    cssProp = 'borderSpacing';
  } else if (cssProp == 'IE9') {
    cssProp = 'boxShadow';
  } else if (cssProp == 'IE10') {
    cssProp = 'transform';
  } else if (cssProp == 'IE11') {
    cssProp = 'borderImage';
  } else {
    cssProp = 'transform';
  }

  var supports = (function () {
    var div = document.createElement('div');
    var vendors = 'Khtml Ms O Moz Webkit'.split(' ');
    var len = vendors.length;

    return function (prop) {
      if (prop in div.style) return true;

      prop = prop.replace(/^[a-z]/, function (val) {
        return val.toUpperCase();
      });

      while (len--) {
        if (vendors[len] + prop in div.style) {
          return true;
        }
      }
      return false;
    };
  })();

  //if browser does not supports css3 property (transform=default), if does > exit all this
  return !supports('' + cssProp + '');
};

//event listener: DOM ready
window.addLoadEvent = function (func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
};

//call plugin function after DOM ready
addLoadEvent(function () {
  if (browserLowerThan('IE11')) {
    // append a warning div
    var warning = document.createElement('div');
    warning.className = 'outdated-browser';
    warning.innerHTML = '<h6>Your browser is out-of-date!</h6>' +
    '<p>Update your browser to view this website correctly. <a href="http://outdatedbrowser.com/">Update my browser now</a>.</p>' +
    '<a href="#" id="btnCloseUpdateBrowser">&times;</a>';
    document.body.appendChild(warning);
    // close button
    var btnClose = document.getElementById('btnCloseUpdateBrowser');
    btnClose.onmousedown = function () {
      warning.style.display = 'none';
      return false;
    };
  }
});
