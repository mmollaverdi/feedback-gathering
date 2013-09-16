var http = require('http')
  ,fs = require('fs')
  ,url = require('url')
  ,querystring = require('querystring');
  
var itemRepository, personRepository;

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.startsWith = function(prefix) {
    return this.substring(0, prefix.length) === prefix;
};

function handler(request, response) {
  var pathName = url.parse(request.url).pathname;
  pathName = querystring.unescape(pathName);
  console.log('path name: ' + pathName);
  if ('/' === pathName) {
    pathName = '/index.html';
  }
  if (pathName.startsWith('/app/items')) {
    itemRepository.findAll(function callback(data) {
      response.writeHead(200, {'Content-type': 'application/json'});
      response.end(JSON.stringify(data));
    });
  } else if (pathName.startsWith('/app/people')) {
    personRepository.findAll(function callback(data) {
      response.writeHead(200, {'Content-type': 'application/json'});
      response.end(JSON.stringify(data));
    });
  } else if (pathName.endsWith('.html') || pathName.endsWith('.js') || pathName.endsWith('.css') || pathName.endsWith('.jpg')) {
    fs.readFile(__dirname + '/client' + pathName, function (error, data) {
      if (error) {
        response.writeHead(404);
        return response.end('Resource not found');
      }
      response.writeHead(200);
      response.end(data);
    });
  } else {
    response.writeHead(404);
    response.end('Resource not found');
  }
};

exports.start = function(itemRepo, personRepo) {
  itemRepository = itemRepo;
  personRepository = personRepo;
  return http.createServer(handler).listen(80);
};