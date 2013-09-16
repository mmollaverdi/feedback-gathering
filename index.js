var itemRepository = require('./itemRepository');
var personRepository = require('./personRepository');
var socketIoServer = require('./socketIoServer');
var httpServer = require('./httpServer').start(itemRepository, personRepository);
socketIoServer.start(httpServer, itemRepository);
