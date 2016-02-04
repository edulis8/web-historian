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

//archive.paths.siteAssets = path.join(__dirname, '../web/public'),

exports.serveAssets = function(res, req, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  asset = req.url;
 /////////// Router ////////////
  var pathParts = asset.split('.');
  var pathEnding = pathParts[pathParts.length - 1];

  if (asset === '/') {
    asset = archive.paths.siteAssets + '/index.html';

  } else if (pathEnding === 'css' || pathEnding === 'js') {
    asset = archive.paths.siteAssets + asset;


  } else if (archive.isUrlArchived(asset.slice(1))) {
    asset = archive.paths.archivedSites + asset;
    console.log('>>>>>' + asset);

  } else {
    res.writeHead(404);
    res.end();
  }

  pathParts = asset.split('.');
  contentType = pathParts[pathParts.length -1];
console.log('ASSETTTTTT' + asset);
  fs.readFile(asset, function (error, content) {
    if (error) {
      res.writeHead(500);
      console.log('error in serveAssets', error);
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/' + contentType });
      res.end(content, 'utf-8');
    }
  });

};

exports.addAssets = function(res, req){
  var body = '';
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', function(){
    archive.addUrlToList(JSON.parse(body));
  });

};

// As you progress, keep thinking about what helper functions you can put here!
