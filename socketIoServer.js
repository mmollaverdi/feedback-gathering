var socketIo = require('socket.io');

exports.start = function(httpServer, itemRepository) {

  var socketIoServer = socketIo.listen(httpServer);
  
  socketIoServer.sockets.on('connection', function (socket) {
    socket.on('vote', function (message) {
      var person = message.person;
      var itemCode = message.itemCode;
      
      itemRepository.voted(person, itemCode, function callback(voteCount) {
      	socketIoServer.sockets.emit('newVoteCount', {itemCode : itemCode, person: person, voteCount: voteCount});        
      });
    });
  });
};
