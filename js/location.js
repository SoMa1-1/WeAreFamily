/* 
 *  Control.
 */

function handleLocation(e){
	
	switch(e.keyCode){
	
		case TvKeyCode.KEY_UP:
			zoom = map.getZoom();
			map.setZoom(zoom+1);
			break;
		case TvKeyCode.KEY_DOWN:
			zoom = map.getZoom();
			map.setZoom(zoom-1);
			break;
		case TvKeyCode.KEY_RIGHT:
			if(flag==(markers.length)-1){
				flag = 0;
				_getRealTimeGPS("tvduid", makeGoogleMap);
			 }
			 else{
				flag = ++flag;
				_getRealTimeGPS("tvduid", makeGoogleMap);
			 }
			break;
		case TvKeyCode.KEY_LEFT:
			if(flag==0){
				flag=(markers.length)-1;
				_getRealTimeGPS("tvduid", makeGoogleMap);
			 }
			 else{
				flag = --flag;
				_getRealTimeGPS("tvduid", makeGoogleMap);
			 }
			break;
		case TvKeyCode.KEY_BACK:
			backToMain(menu_index, 1);
			break;
		case TvKeyCode.KEY_ENTER:
			_getRealTimeGPS("tvduid", makeGoogleMap);
			break;
		default:
			break;
	}

}

var realtime;

function bindKeyToLocation(){
	
	setTimeout(function() {
		_getRealTimeGPS("tvduid", makeGoogleMap);
	}, 1000);
	
	$(document).unbind();
	$(document).keydown(handleLocation);
}

var flag = 0;
var zoomflag = 17;

function initMap() {
	  var map = new google.maps.Map(document.getElementById('googleMap'), {
	    zoom: 17,
	    center: {lat: parseFloat('37.503926'), lng: parseFloat('127.044846')}
	  });

	  var geocoder = new google.maps.Geocoder();

//	  document.getElementById('summitLocation').addEventListener('click', function() {
//	    geocodeAddress(geocoder, map);
//
//	  });
}
 
function geocodeAddress(geocoder, resultsMap) {
	  var address = document.getElementById('set_location_search').value;
	  if(address == "")
		  address = "선릉";

	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      resultsMap.setCenter(results[0].geometry.location);
	      var location = results[0].geometry.location;
	      
	      markerSetting(resultsMap, location);
	      geocodeAddress3(geocoder, resultsMap, location.G, location.K);
	      
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
}

function markerSetting(resultsMap, location){
	
	marker = new google.maps.Marker({
        map: resultsMap,
        position: location
      });
}


var addressResult = "undefined";

function geocodeAddress2(geocoder, map, inputLat, inputLng) {
	  var lat = inputLat;
	  var lng = inputLng;

	  var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
	  geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      if (results[1]) {	        
	        addressResult = results[1].formatted_address;	        
    		$("#location_position").text(addressResult);
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	     // window.alert('Geocoder failed due to: ' + status);
	    }

	  });
      return addressResult;

	}



function geocodeAddress3(geocoder, map, inputLat, inputLng) {
	  var lat = inputLat;
	  var lng = inputLng;

	  var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
	  geocoder.geocode({'location': latlng}, function(results, status) {
		  if (status === google.maps.GeocoderStatus.OK) {
			  if (results[1]) {	        
				  addressResult = results[1].formatted_address;	        
				  $("#set_location_text").text(addressResult);

			  } else {
				  window.alert('No results found');
			  }
	    } else {
	     // window.alert('Geocoder failed due to: ' + status);
	    }

	  });
	  
//	  if(addressResult == "undefined")
//		  addressResult = "대한민국 서울특별시 강남구";
//	  $("#set_location_text").text(addressResult);

}

var markers;
var map;

function makeGoogleMap(returnData) {
	
	var results = returnData.results;
	
	markers = [
           {
               "title": '아빠',
               "lat": results[2].lat,
               "lng": results[2].lon,
               "description": '아빠위치 입니다.'
           },
           {
        	   "title": '엄마',
               "lat": results[0].lat,
               "lng": results[0].lon,
               "description": '엄마위치 입니다.'
           },
           {
        	   "title": '아들',
               "lat": results[1].lat,
               "lng": results[1].lon,
               "description": '아들위치 입니다.'
           }
    ];
	
	  var mapProp = {
	    center:new google.maps.LatLng(markers[0].lat, markers[0].lng),
	    zoom:zoomflag,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	  map = new google.maps.Map(document.getElementById("googleMap2"), mapProp);
	  var geocoder = new google.maps.Geocoder();

	  for (var i = 0; i < markers.length; i++) {
		  
		  var infoWindow = new google.maps.InfoWindow();
		  
	        var data = markers[i];
	        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
	        var marker = new google.maps.Marker({
	            position: myLatlng,
	            panControl: true,
	            zoomControl: true,

	            map: map,
	            title: data.title
	        });
	        if(i == flag){
	        	geocodeAddress2(geocoder, map, markers[flag].lat, markers[flag].lng);
	        	
	        	$("#location_relation").text(markers[flag].title);
	        	

	        	
	        	var center = new google.maps.LatLng(markers[flag].lat, markers[flag].lng);
	            map.panTo(center);
	        	
	        	infoWindow.setContent("<div style = 'width:120px;min-height:8px'>" + data.description +"</div>");
	        	infoWindow.open(map, marker);
	        	
	        }

	}
	google.maps.event.addDomListener(window, 'load', makeGoogleMap);
	  
}