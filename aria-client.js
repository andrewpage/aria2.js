'use strict';

var AriaClient = function(hostname, port) {
  this.hostname = hostname;
  this.port = port;
};

AriaClient.prototype = {
  downloadFile: function(input, output) {
    console.log('Downloading file from ' + input + ' to ' + output);
  }
};

module.exports = AriaClient;
