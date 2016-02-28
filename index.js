'use strict';

var Ariaria = function(hostname, port) {
  this.hostname = hostname;
  this.port = port;
};

Ariaria.prototype = {
  downloadFile: function(input, output) {
    console.log('Downloading file from ' + input + ' to ' + output);
  }
};

module.exports = Ariaria;
