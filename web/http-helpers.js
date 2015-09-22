var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, directoryPath, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  
    exports.readFile(directoryPath, asset, function(data){
    res.end(data);
  });
}; // We may want server assets to call res.end period

exports.readFile = function(directoryPath, fileNameString, callback){
  fs.readFile(path.join(directoryPath, fileNameString), 'utf-8', function(err, data){  
    if (err){
      throw err;
    }
    callback(data);
  });
};

exports.handleHeader = function(res, contentType, statusCode){
  var header = headers;
  headers['Content-Type'] = contentType;
  statusCode = statusCode || 200;
  res.writeHead(statusCode, header);
};

// As you progress, keep thinking about what helper functions you can put here!


// exports.collectData = function(request, callback){
//   var data = "";
//   request.on('data', function(chunk){
//     data += chunk;
//   })
//   request.on('end', function(){
//     callback( JSON.parse(data) )
//   })
// }