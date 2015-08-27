/* 
 *  Control.
 */

var today = new Date();
var date_count = 1;

function handleLifeStyle(e) {
	
	switch(e.keyCode){
		case TvKeyCode.KEY_LEFT:
			if(menu_index == 30){
				backToMain(menu_index, 3);
			} else {
				menu_index--;
				moveMenu(menu_index+1, false)
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_UP:
			break;
		case TvKeyCode.KEY_RIGHT:
			 if(menu_index < 31) {
					menu_index++;
					moveMenu(menu_index-1, false)
					moveMenu(menu_index, true);
				}
			break;
		case TvKeyCode.KEY_DOWN:
			break;
		case TvKeyCode.KEY_ENTER:
			if(menu_index == 30) {
				today.setDate(today.getDate() - 1);
				$("#lifestyle_date").text(today.getFullYear() + ". " + (today.getMonth()+1) + ". " + (today.getDate()));
				destroyLifeStyleChart();
				makeLifeStyleChart();
			} else if(menu_index == 31) {
				var now = new Date();
				now.setDate(now.getDate() - 1);
				
				if(today <= now) {
					today.setDate(today.getDate() + 1);
					$("#lifestyle_date").text(today.getFullYear() + ". " + (today.getMonth()+1) + ". " + (today.getDate()));
					destroyLifeStyleChart();
					makeLifeStyleChart();
				} else {
					alert("There is no Data.");
				}
			}
			changePage(menu_index);
			break;
		case TvKeyCode.KEY_BACK:
			backToMain(menu_index, 3);
			break;
		default:
			break;
	}
}

function bindKeyToLifeStyle(){
//	initOptionPage();
	$("#lifestyle_date").text(today.getFullYear() + ". " + (today.getMonth()+1) + ". " + today.getDate());
	
	menu_index = 30;
	moveMenu(menu_index,true);
	
	$(document).unbind();
	$(document).keydown(handleLifeStyle);
}

/*
 *   Chart Format.
 */

Chart.defaults.global.animation = false;
var move_bar, phone_line, sleep_pie1, sleep_pie2, sleep_pie3, sleep_pie4;

var randomNum150to200 = function(){ return Math.round(Math.random()*50) + 150};
var randomNum60to100 = function(){ return Math.round(Math.random()*40) + 60};
var randomNum30to60 = function(){ return Math.round(Math.random()*30) + 30};
var randomNum0to30 = function(){ return Math.round(Math.random()*30)};

var randomNum6to12 = function(){ return Math.round(Math.random()*6) + 6};
var randomNum18to24 = function(){ return Math.round(Math.random()*6) + 18};

//_getOneDayPhoneUTime("test", "2015-08-17", makeTotalPhoneUTime);
//_getWakeUpTime("test", "2015-08-24", makeResultConsole);
//_getGoToBedTime("test", "2015-08-24", makeResultConsole)
