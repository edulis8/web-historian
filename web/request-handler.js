var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var urlParser = require('url');

// require more modules/folders here!
var fs = require('fs'); //??


// exports.addAssets = function(res, req) {
//   var body = '';
//   req.on('data', function(chunk){
//     body += chunk;
//   });
//   req.on('end', function(){
//     archive.addUrlToList(JSON.parse(body));
//   });



var actions = {
  GET: function(res, req){
    // parses url to various parts
    var parts = urlParser.parse(req.url);
    // actual url = parts.pathname
    // turn / into index.html
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    helpers.serveAssets(res, urlPath, function(){
      // is it in sites.txt?
        // if yes -> loading
        // if no -> 404
      archive.isUrlInList(urlPath.slice(1), function(found){
        if(found){
          helpers.sendRedirect(res, '/loading.html');
        } else {
          helpers.send404(res);
        }
      });
    });

    //look inside public and archive/sites
    // if exists, serve it
    // prioritize loading from public
    // if not found, look in archive
  },
  POST: function(res, req){

    helpers.getPostedUrl(req, function(url){
      // if AJAX not used, url here will be url=www.google.com
      // do:
      // var url = url.split('=')[1];

      // in sites.txt?
      archive.isUrlInList(url, function(found){
        // if yes?
        if(found){
          // is it archived?
          archive.isUrlArchived(url, function(exists){
            // if yes
            if(exists) {
              // display page
              helpers.sendRedirect(res, '/'+url);
            } else {  
              // if no
                // redirect loading 
                // helpers.serveAssets(res, '/loading.html') NOT IDEAL, causes 'form resubmission alert box'
                // *Will send me to the loading page instead of responding with the loading page:*
                console.log('redirect to loading')
                helpers.sendRedirect(res, '/loading.html');
            }
          });
        } else {
        // if no
          //append to sites.txt
        archive.addUrlToList(url, function(){
          // display loading page (redirect)
          console.log('send to loading 2nd else')
          helpers.sendRedirect(res, '/loading.html');

        });

      } }); }); }};

exports.handleRequest = function (req, res) {
  if (req.method) {

    var action = actions[req.method];

    if(action){
      action(res, req);
    } else {
      // util.sendResponse(response, "Not Found", 404)
    }

  }

  //res.end(archive.paths.list);
};
