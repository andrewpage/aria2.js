'use strict';

var request = require('request'),
    path = require('path');

var Ariaria = function(options) {
  // Default to an empty Object
  var options = options || {};

  this.host = options.host;
  this.port = options.port;

  // Used for Aria RPC authentication.
  this.secretToken = options.token;
};

Ariaria.prototype = {
  /**
   * Verifies our connection by performing a test operation.
   */
  verifyConnection: function(verifyCallback) {
    this.performRequest({
      action: 'aria2.getVersion',
      callback: function(body) {
        verifyCallback(body.result !== null);
      }
    });
  },

  performRequest: function(options) {
    var url = this.getRequestURL(),
        payload = this.buildPayload(options.action, options.params),
        callback = options.callback;

    request.post({ url: url, json: payload }, function(e, r, b) {
      if(callback) callback(b);
    });
  },

  buildPayload: function(action, params) {
    return {
      "jsonrpc" : "2.0",
      "id" : "pem",
      "method": action,
      "params" : params
    };
  },

  getRequestURL: function() {
    return 'http://' + this.host + ':' + this.port + '/jsonrpc';
  }
};

module.exports = Ariaria;
