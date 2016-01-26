//Initializes map
var limit = 10;

function initMap() {
  var tweetArray = [];
  var rendered = false;
  var socket = io.connect('http://localhost:3000');

//centers on the middle of the US
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.8282, lng: -98.5795},
    zoom: 4
  });

//collects twitter stream api data from server side through socket
  socket.on('stream', function(tweet){

    //fills tweetArray up to limit with usable tweet objects
    if (tweetArray.length < limit && tweet.geo){
      if (tweetArray.length === 0 || tweet.id !== tweetArray[tweetArray.length-1].id){
        tweetArray.push(tweet);
        console.log(tweetArray);
      }
    }

  //loops through tweetArray and displays incoming tweet markers as they get ready
    if (rendered === false){
      infowindow = new google.maps.InfoWindow();
      for (var i = 0; i < tweetArray.length; i++) {
        var contentLocation = {lat: tweetArray[i].coordinates.coordinates[1],
                               lng: tweetArray[i].coordinates.coordinates[0]};
        var icon = 'http://www.bussvc.wisc.edu/swap/enews/images/twittericon.png';

      //create markers for google maps
        var marker = new google.maps.Marker({
          position: contentLocation,
          map: map,
          title: tweetArray[i].user.name,
          icon: icon
        });

      // //attempting to extract the url from the text and turn into link
      //   if (!tweetLink){
      //     var tweetLink = tweetArray[i].text.match(/(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)[0] || '';
      //     console.log(tweetLink);
      //   }


      //formats infowindow content
        marker.content = '<div id= "iw-container"> <header class="iw-title"> <img src="' 
        + tweetArray[i].user.profile_image_url + '"> <a href=https://twitter.com/' 
        + tweetArray[i].user.screen_name + '>' + tweetArray[i].user.name + '</a>'
        + ' in ' + tweetArray[i].place.full_name + ' | ' + tweetArray[i].created_at.substring(0,16) 
        + '</header>' + '<p>' + tweetArray[i].text + '</p>'
        + '</div>' + '<br></br> <button onclick="removeMarker()">Delete</button>';

      //appends infowindows to markers with proper info
        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.setContent(this.content);
          infoWindow.open(this.getMap(), this);
        });
      }
    }
    //toggles falsey value when limit is reached to avoid displaying too many tweets
    if (tweetArray.length === limit) rendered = true;
  })  
}

function removeMarker(){
  setMapOnAll(null);
}