var express = require('express');
var app = express();
var request = require('request');
// var twitterAPI = require('twitterAPI');

app.use(express.static('client'));

// app.get('/test', function(req, res) {
//   request.get('', 
//     function(err, response, body) {
//       if (err || response.statusCode !== 200) throw err;
//       console.log(body);
//   });
// });

console.log('Server connected - localhost:3000');
app.listen(3000);

module.exports = app;
