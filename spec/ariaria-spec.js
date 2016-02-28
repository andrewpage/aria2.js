var Ariaria = require('../index.js');

describe('Ariaria', function() {
  it('should instantiate a new client', function() {
    var client = new Ariaria('localhost', 6990);

    client.downloadFile('https://google.com/index.php', 'index.php');
  });
});
