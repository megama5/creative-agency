function initMap() {
  var map;
  var mapContainer = $('#data__map')[0];
  var myCenter = {lat: 46.478684, lng: 30.723375};
  map = new google.maps.Map(mapContainer, {
    center: myCenter,
    zoom: 16,
  });

  var contentString = "<div style='float:left; padding-top: 20px;'><img width='80px' src='https://beetroot.se/wp-content/uploads/2016/04/logo.svg?x17685'></div><div style='float:right; padding: 20px;'><h3>Beetroot</h3>Astahkina Street 29<br/> Odessa,Ukraine</div>";
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var marker = new google.maps.Marker({
    position: myCenter,
    icon: {
          url: 'assets/img/favicon.png',
          scaledSize: new google.maps.Size(28, 38) 
        },
    map: map,
    title: 'Beetroot'
  });

  marker.addListener('click', function() {
          infowindow.open(map, marker);
        });  
}
