function getCurrentDate() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function onRequestCallback(req, res) {
  console.log(getCurrentDate(), '-> Request');
  console.log(req.body);

  var
    fs = require('fs'),
    fakeResponse = __dirname + '/api/' + req.body.method + '.json';

  fs.readFile(fakeResponse, 'utf8', function(err, data) {
    if (err) data = '{"error": "Method not found"}'
    console.log(getCurrentDate(), '<- Response from file', fakeResponse);

    res.writeHead(200, "OK", {
      'Content-Type': 'application/json-rpc'
    });
    res.write(data);
    res.end();
  });
}

var
  server = require('express'),
  bodyParser = require('body-parser'),
  port = 4444,
  listenOn = 'localhost',
  apiPath = '/jsonrpc'

server()
  .use(bodyParser.json())
  .use(apiPath, onRequestCallback)
  .listen(port, listenOn);

console.log(getCurrentDate(), 'Started');
console.log(getCurrentDate(), 'Listening on', listenOn, 'port', port);
