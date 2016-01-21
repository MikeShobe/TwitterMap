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

//San Francisco tweets with geocode
var unitedStates = ['-124.848974','24.396308','-66.885444','49.384358'];
var count = 0;

//The majority of tweets don't have locations. The most reliable source of
//tweets with location I found was filtering the stream api by a location.

io.sockets.on('connection', function (socket){
  console.log('connected');

  var stream = T.stream('statuses/filter', {locations: unitedStates});

  stream.on('tweet', function (tweet) {
    io.sockets.emit('stream',tweet);
  });

});

module.exports = app;
