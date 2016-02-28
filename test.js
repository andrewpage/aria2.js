var Ariaria = require('.');

var client = new Ariaria({
  'host': '192.168.1.67',
  'port': '6800'
});

client.verifyConnection(function(isConnected) {
  if(isConnected) console.log('We are connected');
});
