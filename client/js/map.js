
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7833, lng: -122.4167},
    zoom: 11
  });

  var contentString = "This is a test";
  var contentLocation = {lat: 37.7835, lng: -122.4169}

  //tweet text will be stored here and is accessed via marker
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: contentLocation,
    map: map,
    title: 'TEST'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

}