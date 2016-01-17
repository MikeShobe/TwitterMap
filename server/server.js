var express = require('express');
var app = express();
var Twit = require('twit')
var config = require('./config/config.js');
// var twitterAPI = require('twitterAPI');

app.use(express.static('client'));

var T = new Twit({
  consumer_key:         config.twitterAPI.consumer_key,
  consumer_secret:      config.twitterAPI.consumer_secret,
  access_token:         config.twitterAPI.access_token,
  access_token_secret:  config.twitterAPI.access_token_secret
})

T.get('search/tweets', { q: 'banana since:2011-11-11', count: 10 }, function(err, data, response) {
  console.log(data)
})

console.log('Server connected - localhost:3000');
app.listen(3000);

module.exports = app;
