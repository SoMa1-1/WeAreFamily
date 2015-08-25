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
			
			bindKeyToLocation();
			_getRealTimeGPS("tvduid", makeGoogleMap);
//			initialize2();
			
		} else if(menu_index == 2) {
			
			initMap();
			
		} else if(menu_index == 3) {
			
			bindKeyToLifeStyle();
			makeLifeStyleChart();
			
//			_getOneDayDistance("5", "2015-08-18", makeTotalDistance);
//			_getOneDayDistance("5", "2015-08-18", makeTotalDistance);
//			_getOneDayDistance("5", "2015-08-18", makeTotalDistance);
//			_getOneDayDistance("5", "2015-08-18", makeTotalDistance);
			
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
		_generateTvCode("12345", code, makeResultConsole);
	}
}

function backToMain(current, menu) {
	menu_index = menu;
	moveMenu(current, false)
	moveMenu(menu, true);
	bindKeyToMain();
}

function destroyLifeStyleChart() {
	move_bar.destroy();
	phone_line.destroy();
	sleep_pie1.destroy();
	sleep_pie2.destroy();
	sleep_pie3.destroy();
	sleep_pie4.destroy();
}

function makeLifeStyleChart() {
	
	var barChartData = {
			labels : ["Father", "Mother", "Son", "Daughter"],
			datasets : [
				{
					fillColor : "#60A51E",
					strokeColor : "rgb(220,220,220)",
					highlightFill: "rgb(220,220,220)",
					highlightStroke: "rgb(220,220,220)",
					data : [randomNum60to100(), randomNum0to30(), randomNum30to60(), randomNum30to60()]
				}
			]
		}

		var lineChartData = {
				labels : ["Father","Mother","Son","Daughter"],
				datasets : [
					{
						label: "My First dataset",
						fillColor : "#90A51E",
						strokeColor : "rgba(220,220,220,1)",
						pointColor : "rgba(220,220,220,1)",
						pointStrokeColor : "#fff",
						pointHighlightFill : "#fff",
						pointHighlightStroke : "rgba(220,220,220,1)",
						data : [randomNum0to30(), randomNum0to30(), randomNum30to60(), randomNum30to60()]
					}
				]
		}
	
	var pieData_father = [
      				{
      					value: randomNum6to12(),
      					color:"#60A51E",
      					highlight: "#90A51E",
      					label: "Sleep"
      				},
      				{
      					value: randomNum18to24(),
      					color: "#D3D3D3",
      					highlight: "#F5F5F5",
      					label: "Wake Up"
      				}
      ];

      var pieData_mother = [
      				{
      					value: randomNum6to12(),
      					color:"#60A51E",
      					highlight: "#90A51E",
      					label: "Sleep"
      				},
      				{
      					value: randomNum18to24(),
      					color: "#D3D3D3",
      					highlight: "#F5F5F5",
      					label: "Wake Up"
      				}
      ];

      var pieData_son = [
      				{
      					value: randomNum6to12(),
      					color:"#60A51E",
      					highlight: "#90A51E",
      					label: "Sleep"
      				},
      				{
      					value: randomNum18to24(),
      					color: "#D3D3D3",
      					highlight: "#F5F5F5",
      					label: "Wake Up"
      				}
      ];

      var pieData_daughter = [
      				{
      					value: randomNum6to12(),
      					color:"#60A51E",
      					highlight: "#90A51E",
      					label: "Sleep"
      				},
      				{
      					value: randomNum18to24(),
      					color: "#D3D3D3",
      					highlight: "#F5F5F5",
      					label: "Wake Up"
      				}
      ];
	
	var ctx_move = document.getElementById("canvas_move").getContext("2d");
	move_bar = new Chart(ctx_move).Bar(barChartData, {
		responsive : true
	});
	
	var ctx_phone = document.getElementById("canvas_phone").getContext("2d");
	phone_line = new Chart(ctx_phone).Line(lineChartData, {
		responsive: true
	});
	
	var ctx_sleep1 = document.getElementById("canvas_sleep1").getContext("2d");
	sleep_pie1 = new Chart(ctx_sleep1).Pie(pieData_father);
	
	var ctx_sleep2 = document.getElementById("canvas_sleep2").getContext("2d");
	sleep_pie2 = new Chart(ctx_sleep2).Pie(pieData_mother);
	
	var ctx_sleep3 = document.getElementById("canvas_sleep3").getContext("2d");
	sleep_pie3 = new Chart(ctx_sleep3).Pie(pieData_son);
	
	var ctx_sleep4 = document.getElementById("canvas_sleep4").getContext("2d");
	sleep_pie4 = new Chart(ctx_sleep4).Pie(pieData_daughter);
	
	memberHPbar("father", 51);
	memberHPbar("mother", 81);
	memberHPbar("son", 82);
	memberHPbar("daughter", 70);
	
	function memberHPbar(member, energy) {
	    var progressbar = $( "#HPbar_" + member ),
	      progressLabel = $( "#HPlabel_" + member );
	 
	    progressbar.progressbar({
	      value: false,
	      change: function() {
	        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
	      },
	      complete: function() {
	        progressLabel.text( "Tired...!" );
	      }
	    });
	    
	    progressbar.progressbar( "value", energy );
	}
	 
//	    function progress() {
//	      var val = progressbar.progressbar( "value" ) || 0;
//	 
//	      progressbar.progressbar( "value", val + 2 );
//	 
//	      if ( val < 99 ) {
//	        setTimeout( progress, 80 );
//	      }
//	    }
//	 
//	    setTimeout( progress, 2000 );
//	  });
}
