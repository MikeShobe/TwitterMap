var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.0500, lng: -118.2500},
    zoom: 10
  });
}