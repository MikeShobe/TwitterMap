var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7833, lng: -122.4167},
    zoom: 11
  });
}