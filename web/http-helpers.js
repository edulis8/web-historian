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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

 /////////// Router ////////////
  var parts2 = asset.split('.');
  var isDotCom = parts2[parts2.length - 1];

    console.log(isDotCom)
    console.log(archive.paths.archivedSites + asset);
    console.log(archive.isUrlArchived())
  if (isDotCom === 'com' && archive.isUrlArchived()) {
    asset = archive.paths.archivedSites + asset;
    // get contents of file and send back
    console.log('!!! served archived page');
    //return;
  } else if (asset === '/') {
    asset = archive.paths.siteAssets + '/index.html';
  } else {
    asset = archive.paths.siteAssets + asset;
  }

  var parts = asset.split('.');

  console.log('boolean',(parts[parts.length - 1] === ('css' || 'html') ));

  var cssOrHTML = (parts[parts.length - 1] === ('css' || 'html')) ? parts[parts.length - 1] : 'plain';

    console.log('cssOrHTML',cssOrHTML);

    console.log('asset', asset);


    fs.readFile(asset, function (error, content) {
      if (error) {
        res.writeHead(500);
        console.log('error in serveAssets', error);
        res.end();

      } else {
        res.writeHead(200, {'Content-Type' : 'text/' + cssOrHTML});
        res.end(content, 'utf-8');

    }
  });


};



// As you progress, keep thinking about what helper functions you can put here!
