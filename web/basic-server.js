var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var urlParser = require('url');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";



var server = http.createServer(handler.handleRequest);

// var routes = {
//     '/': handler.handleRequest
// };


// var server = http.createServer(function(request, response) {
//   console.log('server');
//   var parts = urlParser.parse(request.url);
//   // './'
//   console.log("parts.pathname",parts.pathname);
//   var route = routes[parts.pathname];
//   if (route) {
//     console.log("routes", routes);
//     console.log("calling route")
//     route(request, response);
//   } else {
//     // TODO: error handling
//   }


// });

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}
