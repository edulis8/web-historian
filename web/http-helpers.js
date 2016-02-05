var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(response, obj, status){
  status = status || 404;
  response.writeHead(status, headers);
  response.end(obj);
};
exports.send404 = function(response){
  exports.sendResponse(response, '404: Page not found', 404);
};
exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};


exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};
  // 1. check in public folder?
  fs.readFile(archive.paths.siteAssets + asset, encoding, function(err, content){
    if(err){
      // 2. file doesn't exist in public, check in archive folder
      fs.readFile(archive.paths.archivedSites + asset, encoding, function(err, content){
        if(err){
          // 3. file doesn't exist in either location
          callback ? callback() : exports.send404(res);
        } else {
          // file exists in archive, serve it
          exports.sendResponse(res, content);
        }
      });
    } else {
      // file exists in public, serve it
      exports.sendResponse(res, content);
    }
  });

};

exports.getPostedUrl = function(req, cb) {
  var body = '';
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', function(){

    console.log('###body##', body);
    // not JSON parsing, via solution vid
    cb(body);
  });
};


exports.addAssets = function(res, req) {
  var body = '';
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', function(){
    archive.addUrlToList(JSON.parse(body));
  });
};

// As you progress, keep thinking about what helper functions you can put here!
