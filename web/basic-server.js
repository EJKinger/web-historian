var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var urlParser = require('url');

initialize();

var port = 8080;
var ip = "127.0.0.1";

// var routes = {
//   '/classes/chatterbox': handleRequest
// }

/*// var server = http.createServer(function(request, respons{
  var parts = urlParser.parse(request.url)
  var route = routes[parts.pathName]
  e (rout  ){
  
  }
})
*/
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
