var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var util = require('util');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */


exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  //read the file, return in usable format?
  //store with , string.split(',');
  fs.readFile(exports.paths.list, 'utf-8', function(err, data){
    // if (err){
    //   throw err;
    // }
    callback(data.split('\n'));
  });
  
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(urlList){
    var retVal = false;
    _.each(urlList, function(item){
      if (item === url){ 
      retVal = true;
      }
    });
    cb(retVal);
  });
  
  
};

exports.addUrlToList = function(url, callback){
  //add url to sites.txt + ','
  fs.appendFile(exports.paths.list, '\n' + url, function(){
    if (callback){
      callback();
    }
  });


};

exports.isURLArchived = function(){
  
};

exports.downloadUrls = function(url, callback){
  console.log('url in download: ' + url);
  goodUrl = 'http://www.' + url.slice(1);
  var data = '';
  http.get(goodUrl, function(res){
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){
      fs.writeFile(exports.paths.archivedSites + "/" +  url, util.inspect(data), 'utf-8');
    });
    res.on('error', function(){
      throw error;
    });

    if (callback){
      callback();
    }
  });
};
