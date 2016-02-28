var assert = require('assert');
var Ariaria = require('../index.js');

describe('Ariaria', function() {
  it('should verify a connection', function() {
    var client = new Ariaria({
      'host': '192.168.1.67',
      'port': '6800'
    });

    client.verifyConnection(function(response) {
      console.log('Got Heem');
      console.log(response);
    });
  });
});
