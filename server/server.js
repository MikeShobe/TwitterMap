var express = require('express');
var app = express();
var Twit = require('twit')
var config = require('./config/config.js');
// var twitterAPI = require('twitterAPI');

var tweets = [];

app.use(express.static('client'));

var T = new Twit({
  consumer_key:         config.twitterAPI.consumer_key,
  consumer_secret:      config.twitterAPI.consumer_secret,
  access_token:         config.twitterAPI.access_token,
  access_token_secret:  config.twitterAPI.access_token_secret
})

var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];
var stream = T.stream('statuses/filter', { locations: sanFrancisco })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})


console.log('Server connected - localhost:3000');
app.listen(3000);

module.exports = app;
