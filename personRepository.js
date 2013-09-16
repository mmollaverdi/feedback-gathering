var fs = require('fs')

var people = [];
fs.readdir(__dirname + '/client/avatars', function(error, files) {
  files.forEach(function(fileName) {
    if (fileName.endsWith('.jpg')) {
      var personName = fileName.substring(0, fileName.length - 4);
      people.push(personName);
    }
  });
});

exports.findAll = function(callback) {
  callback(people);
};