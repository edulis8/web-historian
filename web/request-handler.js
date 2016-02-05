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
    // get url via helper.getPostedURl
    var url = helpers.getPostedUrl(req, function(){
      // how to set this to a variable in this scope
      url = body;
    });

    archive.isUrlInList(url, function(found){
      //if its in sites.txt -- if found
      if(found){
        isUrlArchived(path, function(exists){
          if(exists) {
            //check if in sites folder -- isUrlArchived
            //if it is, display page -- send to serveAssets.
            helpers.serveAssets(res, req);
          } else {
            //if not, display loading page
            helper.serveAssets(res, req, '/loading.html');
          }
        });
      } else {
    // if not
    //append to sites.txt -- addUrlToList
      addUrlToList(url, function(){});
    }
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
