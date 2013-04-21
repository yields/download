
# download

  Downloads a file with `xhr`, report progress and send the file to the user.

## Installation

    $ component install yields/download

## Example

```js
var Download = require('download')
  , Progress = require('progress');

var download = new Download('somefile');
var progress = new Progress();
doument.body.appendChild(progress.el);
progress.update(0);

download.on('progress', function(e){
  progress.update(e.percent);
});

download.end(function(err, req){
  if (err) throw err;
  location.pathname = '/somefile';
});
```

## API

### Download(filepath)

Create a new Download with `filepath`.

### download.abort()

Abort the request.

### download.end(fn(err, req))

Start the download and invoke `fn(err, req)`, at this point you should just do `location.pathname = '/somefile'`.

## dependencies

  - [yields/xhr](https://github.com/yields/xhr)
  - [component/emitter](https://github.com/component/emitter)

## License

  MIT
