var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');


var request = require('request');
var getJsonFromJsonP = function (url, callback) {
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var jsonpData = body;
    var json;
    //if you don't know for sure that you are getting jsonp, then i'd do something like this
    try
    {
       json = JSON.parse(jsonpData);
    }
    catch(e)
    {
        var startPos = jsonpData.indexOf('({');
        var endPos = jsonpData.indexOf('})');
        var jsonString = jsonpData.substring(startPos+1, endPos+1);
        json = JSON.parse(jsonString);
    }
    callback(null, json);
  } else {
    callback(error);
  }
})
}
//const Bluebird = require('bluebird');
 
//fetch.Promise = Bluebird;
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});



router.get('/api1', function(req, res, next) {
  console.log('hey');
  getJsonFromJsonP('https://www.pipelines.quickbase.com/hooks/webhooks/1f62pvrfl6o?api=api1', function (err,response) {
    res.send(response)
});
  
});

router.get('/api2', function(req, res, next) {
  getJsonFromJsonP('https://www.pipelines.quickbase.com/hooks/webhooks/1f62pvrfl6o?api=api2', function (err,response) {
    res.send(response)
});
});

router.get('/api3', function(req, res, next) {
  getJsonFromJsonP('https://www.pipelines.quickbase.com/hooks/webhooks/1f62pvrfl6o?api=api3', function (err,response) {
    res.send(response)
});
});


module.exports = router;