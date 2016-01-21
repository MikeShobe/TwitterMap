
function initMap() {
  var tweetArray = [];
  var rendered = false;
  var socket = io.connect('http://localhost:3000');

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.8282, lng: -98.5795},
    zoom: 4
  });

  socket.on('stream', function(tweet){
    if (tweetArray.length < 10 && tweet.geo){
      if (tweetArray.length === 0 || tweet.id !== tweetArray[tweetArray.length-1].id){
        tweetArray.push(tweet);
      }
      console.log(tweetArray);
    }

    if (tweetArray.length === 10 && rendered === false){
      infowindow = new google.maps.InfoWindow();
      for (var i = 0; i < tweetArray.length; i++) {
        console.log(tweetArray[i]);
        var contentLocation = {lat: tweetArray[i].coordinates.coordinates[1],
                               lng: tweetArray[i].coordinates.coordinates[0]};

        var marker = new google.maps.Marker({
          position: contentLocation,
          map: map,
          title: tweetArray[i].user.name
        });
        marker.content = '<div id= "iw-container"> <header class="iw-title">' + tweetArray[i].user.name
        + ' in ' + tweetArray[i].place.full_name + '</header>' + '<p>' + tweetArray[i].text + '</p>'
        + '</div>' + '<br></br> <button>Delete</button>';

        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.setContent(this.content);
          infoWindow.open(this.getMap(), this);
        });
        if (i === 10) map.setCenter(marker.getPosition());
      }
    }
    if (tweetArray.length === 10) rendered = true;
  })  
}