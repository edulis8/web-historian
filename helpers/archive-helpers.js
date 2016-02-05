var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http')
var httpR = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
// ABSOLUTE FILE PATHS
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// fs.readFile??
exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf-8', function(err, data){
    if(err){
      console.log("Error in readListOfUrls", data);
      throw error;
    }
    // this takes list of urls and splits them into an array
    if(callback){
      // toString why? from solution vid.
      callback(data.toString().split('\n'));
    }
  }
  );
};

exports.isUrlInList = function(target, callback) {
  exports.readListOfUrls(function(urls) {
    var found = urls.some(function(url){ return url === target });
    
    callback(found);
  });

};
// isUrlInList(targetURL, function(urls){ return urls.contains(target) })


// fs.appendFile('message.txt', 'data to append', function (err) {

// });

// fs.writeFile(file, data, callback)
exports.addUrlToList = function(url, callback){
  // get all data, append thing, put it back
  exports.readListOfUrls(function(urls){
    urls.pop();
    urls.push(url);
    console.log(url + '*****' + urls);

    fs.appendFile(exports.paths.list, url+'\n', function (err) {
      console.log('appendFile!');
    });


    //fs.writeFile(exports.paths.list, urls.join('\n'));
    callback();
  });
};

exports.isUrlArchived = function(path, callback) {
  console.log('isUrlArchived----' + path);

  fs.exists(exports.paths.archivedSites + '/' + path, function(exists) {
    if(callback){
      callback(exists);
    }
  });
 /// still need? ////
  // if (path.split('.')[0] === 'www') {
  // return true;
//}

};
// Use the library called HTTP-request?
exports.downloadUrls = function(param){

  if(param && param.length){
    param.forEach(function(url){
      console.log('URL!', url);
      exports.getUrl(url, exports.paths.archivedSites);
    });
  } else {
    exports.readListOfUrls(function(urls){
      urls.forEach(function(url){

        exports.getUrl(url, exports.paths.archivedSites);
      });
    });
  }

};


exports.getUrl = function(url, destination){
  console.log("$$$",destination+"/"+url)

  httpR.get({
    url: url,
    progress: function (current, total) {
      //console.log('downloaded %d bytes from %d', current, total);
      }
    },
  destination+"/"+url, function(error, result) {
    if (error) {
      console.log('ERROR!', exports.paths.archivedSites);
      console.log('result', result)
    return;
  }
    console.log(result.code, result.headers, result.file);
});
}

//setInterval(exports.downloadUrls, 100);
//exports.downloadUrls();
exports.getUrl('www.google.com',exports.paths.archivedSites );
