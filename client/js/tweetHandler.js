var tweetArray = [];
var rendered = false;
var socket = io.connect('http://localhost:3000');

socket.on('stream', function(tweet){
  // console.log(tweet);
  if (tweetArray.length < 10 && tweet.geo){
    if (tweetArray.length === 0 || tweet.id !== tweetArray[tweetArray.length-1].id){
      tweetArray.push(tweet);
    }
  console.log(tweetArray);
  }

  if (tweetArray.length === 10 && rendered === false){
    for (var i = 0; i < tweetArray.length; i++) {
      $('#tweets').append(tweetArray[i].text+'<br> <br>');
    }
    rendered = true;
  }
});