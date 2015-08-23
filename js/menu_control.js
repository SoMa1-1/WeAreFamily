var menu_index = 0;

var move = [
            // Main
            "#navi-home", "#navi-location", "#navi-message", "#navi-lifestyle", "#navi-mission",
            "#navi-setting", "", "", "", ""
            
            // Location
            , "", "", "", "", ""
            , "", "", "", "", ""
            
            // Message
            , "", "", "", "", ""
            , "", "", "", "", ""
            
            // LifeStyle
            , "#lifestyle_yesterday", "#lifestyle_tommorow", "", "", ""
            , "", "", "", "", ""
            
            // Family Mission
            , "#lifestyle_mission1", "#lifestyle_mission2", "#lifestyle_mission3", "#lifestyle_mission4", "#lifestyle_mission5"
            , "#content_mission1", "#content_mission2", "#content_mission3", "", ""
            
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
	
	var page_title = ["Main", "Location", "Message", "LifeStyle", "Mission", "Setting"];
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
			
			bindKeyToLifeStyle();
			
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
			
		} else if(menu_index == 4) {
			bindKeyToMission();
		} else if(menu_index == 5) {
			bindKeyToSetting();
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

function backToMain(current, menu) {
	menu_index = menu;
	moveMenu(current, false)
	moveMenu(menu, true);
	bindKeyToMain();
}
