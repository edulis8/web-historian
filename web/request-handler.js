var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');

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
  GET: helpers.serveAssets,
  POST: function(res, req){
   console.log('xxxx' , req.method, 'url', req.url);
    // get url via helper.getPostedURl
    helpers.getPostedUrl(req, function(url){
      // how to set this to a variable in this scope

      archive.isUrlInList(url, function(found){
        //if its in sites.txt -- if found
        if(found){
          archive.isUrlArchived(url, function(exists){
            if(exists) {
              //check if in sites folder -- isUrlArchived
              //if it is, display page -- send to serveAssets.
              console.log('SSSSSSEEEERVE PPPAAAAGGEE');
              helpers.serveAssets(res, req, url);
            } else {
              //if not, display loading page
              
            }
          });
        } else {
        console.log('trying to serve landing.html')
        helpers.serveAssets(res, req, '/loading.html');
      // if not
      //append to sites.txt -- addUrlToList
        console.log('url before sent to addUrl', url);
        archive.addUrlToList(url, function(){});
      }
    });

    });


 }
};

exports.handleRequest = function (req, res) {
  if (req.method) {

    var action = actions[req.method];

    action(res, req);

  }

  //res.end(archive.paths.list);
};
