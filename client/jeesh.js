var domready = require('domready')
  , bean     = require('bean')        // events
  , bonzo    = require('bonzo')       // DOM wrapper/manipulation
  , request  = require('reqwest')
  , qwery    = require('qwery')       // css selectors
  , slice    = Array.prototype.slice;

// Attach events API to the prototype of DOM wrapper:
var aug = {};
['on', 'off', 'one', 'add', 'fire', 'clone'].forEach(function (k) {
  aug[k] = function () {
    for (var i = 0; i < this.length; i += 1) {
      bean[k].apply(this, [this[i]].concat(slice.call(arguments)));
    }
    return this;
  };
});

/*
// uncomment these if you want all the aliases
aug.hover = function (enter, leave) {
  for (var i = 0; i < this.length; i += 1) {
    bean.on.call(this, this[i], 'mouseenter', enter);
    bean.on.call(this, this[i], 'mouseleave', leave);
  }
  return this;
};

var aliases = {
  'fire'  : ['emit', 'trigger'],
  'on'    : ['addListener', 'listen', 'bind'],
  'add'   : ['delegate'],
  'off'   : ['unbind', 'unlisten', 'removeListener', 'undelegate'],
  'clone' : ['cloneEvents']
};
Object.keys(aliases).forEach(function (key) {
  aliases[key].forEach(function (alias) {
    aug[alias] = aug[key];
  });
});
*/

var shorts = [
  'blur', 'change', 'click', 'dblclick', 'error', 'focus',
  'focusin', 'focusout', 'keydown', 'keypress', 'keyup', 'load',
  'mousedown', 'mouseenter', 'mouseleave', 'mouseout',
  'mouseover', 'mouseup', 'mousemove', 'resize', 'scroll',
  'select', 'submit', 'unload'
];
shorts.forEach(function (s) {
  aug[s] = function () {
    for (var i = 0; i < this.length; i += 1) {
      bean.on.apply(this, [this[i], s].concat(slice.call(arguments)));
    }
    return this;
  };
});

bonzo.aug(aug);

var $ = function (selector) {
  return bonzo(qwery(selector));
};
bonzo.setQueryEngine(qwery);

$.ready = domready; 

// NB: have to removed emitter include lines from superagent manually atm because TJ is silly
$.ajax = request;
['post', 'put', 'get', 'del', 'patch', 'head'].forEach(function (m) {
  $[m] = request[m];
});


module.exports = $;

//$('html').html('hello world');

//console.log('one');