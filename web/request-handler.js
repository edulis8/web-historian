var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');

// require more modules/folders here!
var fs = require('fs'); //??



var actions = {
  GET: helpers.serveAssets,
  POST: helpers.addAssets
};

exports.handleRequest = function (req, res) {
  if (req.method) {

    var action = actions[req.method];

    action(res, req, function() {});

  }

  //res.end(archive.paths.list);
};
