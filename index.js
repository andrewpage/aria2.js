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

  addURI: function(uris, options, responseCallback) {
    if(typeof callback === 'undefined') {
      responseCallback = options;
      options = {};
    }

    var params = [ uris ];
    if(options.position) params.push(options.position);

    this.performRequest({
      action: 'aria2.addUri',
      params: params,
      callback: function(body) {
        if(body.result) responseCallback(body.result);
      }
    });
  },

  /**
   * Initialize a request to the aria2 server.
   */
  performRequest: function(options) {
    var url = this.getRequestURL(),
        payload = this.buildPayload(options.action, options.params),
        callback = options.callback;

    request.post({ url: url, json: payload }, function(e, r, b) {
      if(callback) callback(b);
    });
  },

  /**
   * Aria2 request payload.
   */
  buildPayload: function(action, params) {
    // Prepend the params array with a secret token if one is specified.
    if(this.secretToken) params.unshift('token:' + this.secretToken);

    return {
      "jsonrpc" : "2.0",
      "id" : "pem",
      "method": action,
      "params" : params
    };
  },

  /**
   * URL endpoint for aria2 API requests.
   */
  getRequestURL: function() {
    return 'http://' + this.host + ':' + this.port + '/jsonrpc';
  }
};

module.exports = Ariaria;
