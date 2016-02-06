var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var Twit = require('twit');
var io = require('socket.io').listen(server);
var config = require('./config/config.js');

server.listen(3000);

//serves index.html to page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//status code and other info
app.get('/', function (req, res) {
  if (req) res.sendStatus(200);
  else console.error('Unable to request data');
});

app.use(express.static('client'));

//authentication comes from server-side config file
var T = new Twit({
  consumer_key:         config.twitterAPI.consumer_key,
  consumer_secret:      config.twitterAPI.consumer_secret,
  access_token:         config.twitterAPI.access_token,
  access_token_secret:  config.twitterAPI.access_token_secret
})

//Streams tweets within continental United States
var unitedStates = ['-124.848974','24.396308','-66.885444','49.384358'];

//The majority of tweets don't have locations. The most reliable source of
//tweets with location I found was filtering the stream api by a location.

//Establishes socket connection with client-side
io.sockets.on('connection', function (socket){
  console.log('Socket connected');

  var stream = T.stream('statuses/filter', {locations: unitedStates});

  stream.on('tweet', function (tweet) {
    io.sockets.emit('stream',tweet);
  });

});

module.exports = app;
