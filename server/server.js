var express = require('express');
var app = express();
//request?
// var twitterAPI = require('twitterAPI');

app.use(express.static('client'));

// app.get('/', function(req, res) {
//   res.send(body);
// });

console.log('Server connected - localhost:3000');
app.listen(3000);

module.exports = app;
