var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var actions = {
  'GET': function(req, res){
    if(req.url === "/"){
      httpHelper.handleHeader(res, 'text/html');
      httpHelper.serveAssets(res, 'index.html', archive.paths.siteAssets);
    }
    else if (req.url === "/styles.css"){
      httpHelper.handleHeader(res, 'text/css', 200);
      httpHelper.serveAssets(res, 'styles.css', archive.paths.siteAssets); //We should add favicon case if it messes up
    } else {
      //check if url is sites.txt
      archive.isUrlInList(req.url, function(val){
         console.log(val);
         if (val){
            httpHelper.handleHeader(res, 'text/html');
            httpHelper.serveAssets(res, req.url, archive.paths.archivedSites);
          }
         else{
            console.log('req.url: ' + req.url);
            httpHelper.handleHeader(res, 'text/html', 200);
            httpHelper.serveAssets(res, 'loading.html', archive.paths.siteAssets);
            archive.addUrlToList(req.url);
            archive.downloadUrls(req.url);
          }
        
      }); 
    }
  },

  'POST': function(req, res){
    var message = '';
    req.on('data', function(chunk){
      message += chunk;
    });
    req.on('end', function(){
      archive.addUrlToList(message.slice(4), function(){
      //write header and stuff

      archive.isUrlInList(message.slice(4), function(itIs){
        if(itIs){
          httpHelper.handleHeader(res, 'text/html');
          httpHelper.serveAssets(res, req.url, archive.paths.archivedSites + '/' + message.slice(4));
        } else{
          archive.downloadUrls(message.slice(4));
          httpHelper.handleHeader(res, 'text/html', 201);
          httpHelper.serveAssets(res, 'loading.html', archive.paths.siteAssets);
        }
      });

      
      });
    });
    
    //check if we have the url
      //if not, write it to file
  }
};

exports.handleRequest = function (req, res) {
  if (req.method === 'GET'){
    actions.GET(req, res);
  }
  if (req.method === 'POST'){
    actions.POST(req, res);
  }

};


// res.writeHead(200, httpHelper.headers);
//   fs.readFile(path.join(archive.paths.siteAssets, 'index.html'), 'utf-8', function(err, data) {
//     if (err){
//       throw err;
//     }
//     res.end(data);
//     }
//   );