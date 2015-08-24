/* 
 *  Control.
 */

function handleLocation(e){
	switch(e.keyCode){
	
	case TvKeyCode.KEY_UP:
		console.log("위.");
		break;
	case TvKeyCode.KEY_DOWN:
		
		break;
	case TvKeyCode.KEY_RIGHT:
		console.log("오른..");

		if(flag==(markers.length)-1){
			flag = 0;
			initialize2();
		 }
		 else{
			flag = ++flag;
			initialize2();
		 }
		break;
	case TvKeyCode.KEY_LEFT:
		console.log("왼.");

		if(flag==0){
			flag=(markers.length)-1;
			initialize2();
		 }
		 else{
			flag = --flag;
			initialize2();
		 }
		break;
	case TvKeyCode.KEY_VOLUMEUP:
		zoomflag = ++zoomflag;
		initialize2();

		break;
	case TvKeyCode.KEY_VOLUMEDOWN:
		zoomflag = --zoomflag;
		initialize2();
		
	case TvKeyCode.KEY_BACK:
		backToMain(menu_index, 1);
		break;

	default:
		break;
	}

}

function bindKeyToLocation(){
//	menu_index = 50;
//	moveMenu(menu_index,true);
	
	$(document).unbind();
	$(document).keydown(handleLocation);
}

var markers = [
               {
                   "title": '아빠',
                   "lat": '37.503926',
                   "lng": '127.044846',
                   "description": '아빠위치 입니다.'
               },
               {
            	   "title": '엄마',
                   "lat": '37.504026',
                   "lng": '127.043846',
                   "description": '엄마위치 입니다.'
               },
               {
            	   "title": '아들',
                   "lat": '37.504126',
                   "lng": '127.044646',
                   "description": '아들위치 입니다.'
               },
               {
            	   "title": '딸',
                   "lat": '37.504226',
                   "lng": '127.044546',
                   "description": '딸위치 입니다.'
               },
               {
            	   "title": '둘째딸',
                   "lat": '37.504326',
                   "lng": '127.044946',
                   "description": '둘째딸 위치 입니다.'
               }
               ];


var flag = 0;
var zoomflag = 17;


function initMap() {
	  var map = new google.maps.Map(document.getElementById('googleMap'), {
	    zoom: 13,
	    center: {lat: parseFloat(markers[0].lat), lng: parseFloat(markers[0].lng)}
	  });

	  var geocoder = new google.maps.Geocoder();

	  document.getElementById('summitLocation').addEventListener('click', function() {
	    geocodeAddress(geocoder, map);

	  });
	}


 
function geocodeAddress(geocoder, resultsMap) {
	  var address = document.getElementById('search-1').value;

	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      resultsMap.setCenter(results[0].geometry.location);
	      var location = results[0].geometry.location;
	    
	      
	      markerSetting(resultsMap, location);
	      
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}

function markerSetting(resultsMap, location){
	
	marker = new google.maps.Marker({
        map: resultsMap,
        position: location,
        
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

	      } else {
	        window.alert('No results found');
	      }
	    } else {
	     // window.alert('Geocoder failed due to: ' + status);
	    }

	  });
      return addressResult;

	}


function initialize2() {
	
	  var mapProp = {
	    center:new google.maps.LatLng(markers[0].lat, markers[0].lng),
	    zoom:zoomflag,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	  var map=new google.maps.Map(document.getElementById("googleMap2"), mapProp);
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
	        	
	        	$("#locateInfo").html("<h3>"+markers[flag].title+"</h3>");
	        	$("#locateInfo").append("<h6>&nbsp;위치&nbsp;:&nbsp;"+addressResult+"</h6>");
	        	
	        	var center = new google.maps.LatLng(markers[flag].lat, markers[flag].lng);
	            map.panTo(center);
	        	
	        	infoWindow.setContent("<div style = 'width:120px;min-height:8px'>" + data.description +"</div>");
	        	infoWindow.open(map, marker);
	        	
	        }

	}
	google.maps.event.addDomListener(window, 'load', initialize2);
	  
	}