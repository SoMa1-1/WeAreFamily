var menu_index = 0;

var move = [
            // Main
            "#navi-home", "#navi-location", "#navi-message", "#navi-lifestyle", "#navi-mission",
            "#navi-option", "", "", "", ""
            
            // Location
            , "", "", "", "", ""
            , "", "", "", "", ""
            
            // Message
            , "", "", "", "", ""
            , "", "", "", "", ""
            
            // LifeStyle
            , "", "", "", "", ""
            , "", "", "", "", ""
            
            // Family Mission
            , "", "", "", "", ""
            , "", "", "", "", ""
            
            // Option
            , "#option-generate_code", "#option-set_location", "", "", ""
            , "", "", "", "", ""
           ];

function moveMenu(index, state) {
	
	if(state) {
		$(move[index]).addClass("ui-btn-active");
	} else {
		$(move[index]).removeClass("ui-btn-active");
	}
	
}

function changePage(menu_index){
	
	var page_title = ["Main", "Location", "Message", "LifeStyle", "Mission", "Options"];
	$("#section-title").text(page_title[menu_index]);
	
	if(menu_index == 0) {
		$("#content-background").fadeOut();
		$("#main_title").fadeIn();
	} else if(menu_index > 0 && menu_index < 10) {
		$("#main_title").fadeOut();
		$("#content-background").fadeIn();
		$("#section-" + page_title[view_stack[view_stack.length-1]]).hide();
		
		view_stack.push(menu_index);
		$("#section-" + page_title[menu_index]).fadeIn();
		
		if(menu_index == 1) {
			
			initialize2();
			
			function initialize2() {
			  var mapProp = {
			    center:new google.maps.LatLng(51.508742,-0.120850),
			    zoom:8,
			    mapTypeId:google.maps.MapTypeId.ROADMAP
			  };
			  var map=new google.maps.Map(document.getElementById("googleMap2"), mapProp);
			}
			
		} else if(menu_index == 2) {
			
			initialize();
			
			function initialize() {
			  var mapProp = {
			    center:new google.maps.LatLng(51.508742,-0.120850),
			    zoom:8,
			    mapTypeId:google.maps.MapTypeId.ROADMAP
			  };
			  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
			}
//			google.maps.event.addDomListener(window, 'load', initialize);
				
		} else if(menu_index == 3) {
			
			var ctx_move = document.getElementById("canvas_move").getContext("2d");
			var move_bar = new Chart(ctx_move).Bar(barChartData, {
				responsive : true
			});
			
			var ctx_phone = document.getElementById("canvas_phone").getContext("2d");
			var phone_line = new Chart(ctx_phone).Line(lineChartData, {
				responsive: true
			});
			
			var ctx_sleep1 = document.getElementById("canvas_sleep1").getContext("2d");
			var pie1 = new Chart(ctx_sleep1).Pie(pieData);
			
			var ctx_sleep2 = document.getElementById("canvas_sleep2").getContext("2d");
			var pie2 = new Chart(ctx_sleep2).Pie(pieData);
			
			var ctx_sleep3 = document.getElementById("canvas_sleep3").getContext("2d");
			var pie3 = new Chart(ctx_sleep3).Pie(pieData);
			
			var ctx_sleep4 = document.getElementById("canvas_sleep4").getContext("2d");
			var pie4 = new Chart(ctx_sleep4).Pie(pieData);
			
			$(function() {
			    var progressbar = $( ".progressbar" ),
			      progressLabel = $( ".progress-label" );
			 
			    progressbar.progressbar({
			      value: false,
			      change: function() {
			        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
			      },
			      complete: function() {
			        progressLabel.text( "Tired...!" );
			      }
			    });
			 
			    function progress() {
			      var val = progressbar.progressbar( "value" ) || 0;
			 
			      progressbar.progressbar( "value", val + 2 );
			 
			      if ( val < 99 ) {
			        setTimeout( progress, 80 );
			      }
			    }
			 
			    setTimeout( progress, 2000 );
			  });
		} else if(menu_index == 5) {
			document.body.removeEventListener("keydown",handelMain,false);
			bindKeyToOption();
		}
	} else if(menu_index == 50) {
		$("#option_menus").hide();
		$("#menu1_code").show();
		
		var code = makePairingCode();
		$("#code").text(code);
//		var duid = webapis.productinfo.getDuid();
		
		var fiveMinutes = 60 * 3;
		startTimer(fiveMinutes, $('#time'));
		generateTvCode("12345", code);
	}
}


function makePairingCode() {
	var code = "";
	for(var i = 0; i < 6; i++)
		code += Math.floor(Math.random() * 9) + 1 
	return code;
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var timer_count = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
        	clearInterval(timer_count);
            display.text("00:00");
        }
    }, 1000);
}

function generateTvCode(t_duid, code) {
    var xhr = new XMLHttpRequest();
    var server_address = "http://172.16.100.56/tv";
    xhr.open("GET", server_address + "?t_duid=" + t_duid + "&code=" + code, true);
    
    xhr.onreadystatechange = function(e){
    	console.log(xhr);
    		if(xhr.readyState == 4){
    			if(xhr.status = 200){
    				console.log(xhr.responseText);
    			}else{
    				console.log("Error loading page");
    			}
    		}
    	};
    xhr.send(null);
}