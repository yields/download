
/**
 * dependencies.
 */

var emitter = require('emitter')
  , request = require('xhr');

/**
 * export `Download`
 */

module.exports = Download;

/**
 * Inititalize new `Download` with `path`.
 * 
 * @param {String} path
 */

function Download(path){
  if (!(this instanceof Download)) return new Download(path);
  this.path = path;
}

/**
 * mixins.
 */

emitter(Download.prototype);

/**
 * onprogress.
 */

Download.prototype.onprogress = function(e){
  e.percent = e.loaded / e.total * 100;
  this.emit('progress', e);
};

/**
 * Send the request and invoke `fn(err, req)`.
 * 
 * @param {Function} fn
 * @return {Download}
 */

Download.prototype.end = function(fn){
  var req = this.req = request();
  req.open('GET', this.path);
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  req.onprogress = this.onprogress.bind(this);
  req.onreadystatechange = ready;
  req.send();
  return this;

  // onready
  function ready(){
    if (4 != req.readyState) return;
    var status = req.status / 100 | 0;
    if (3 < status) return fn(new Error(req.responseText));
    fn(null, req);
  }
};

/**
 * abort the request.
 */

Download.prototype.abort = function(){
  if (this.req) this.req.abort();
  return this;
};
