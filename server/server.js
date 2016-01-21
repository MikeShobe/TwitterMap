var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var Twit = require('twit');
var io = require('socket.io').listen(server);
var config = require('./config/config.js');

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

//Since using streaming API needed reliable storage of tweets, though 
//finished product won't rely on this kind of variable.
var tweetArray = [];

app.use(express.static('client'));

var T = new Twit({
  consumer_key:         config.twitterAPI.consumer_key,
  consumer_secret:      config.twitterAPI.consumer_secret,
  access_token:         config.twitterAPI.access_token,
  access_token_secret:  config.twitterAPI.access_token_secret
})

var sanFrancisco = ['-122.75', '36.8', '-121.75', '37.8'];
var count = 0;

//The majority of tweets don't have locations. The most reliable source of
//tweets with location I found was filterin the stream api by a location.

//FIX: Ran into errors with socket.io
io.sockets.on('connection', function (socket){
  console.log('connected');

  var stream = T.stream('statuses/filter', { locations: sanFrancisco });

  stream.on('tweet', function (tweet) {
  // console.log(tweet.text);
  // console.log(Object.keys(tweet));

  // while (tweetArray.length < 10){
  //   for (key in tweet){
  //     var newObj = {};
  //     newObj[key] = tweet[key];
  //     tweetArray.push(newObj);
  //   }
  // }
  // console.log(tweetArray);

  io.sockets.emit('stream',tweet);

  });
});

module.exports = app;
