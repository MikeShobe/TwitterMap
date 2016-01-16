var express = require('express');
var app = express();
// var twitterAPI = require('twitterAPI');

app.use(express.static('client'));

// app.get('/', function(req, res) {
//   res.send(body);
// });

console.log('Server connected.');
app.listen(3000);

module.exports = app;
