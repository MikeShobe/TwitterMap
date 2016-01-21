
function initMap() {
  var tweetArray = [];
  var rendered = false;
  var socket = io.connect('http://localhost:3000');

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7833, lng: -122.4167},
    zoom: 11
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
        marker.content = tweetArray[i].text;

        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.setContent(this.content);
          infoWindow.open(this.getMap(), this);
        });
        // map.setCenter(marker.getPosition());

        // $('#map').append(marker);
        // marker.setMap(map);
      }
    }
    if (tweetArray.length === 10) rendered = true;
  })  
}