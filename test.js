var Ariaria = require('.');

var client = new Ariaria({
  'host': '192.168.1.67',
  'port': '6800'
});

client.addURI([ 'http://google.com' ], function(gid) {
  console.log(gid);
});
