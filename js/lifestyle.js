/* 
 *  Control.
 */

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
	menu_index = 30;
	moveMenu(menu_index,true);
	
	$(document).unbind();
	$(document).keydown(handleLifeStyle);
}

_getOneDayDistance("5", "2015-08-18", makeTotalDistance);
_getOneDayPhoneUTime("test", "2015-08-17", makeTotalPhoneUTime);
_getWakeUpTime("test", "2015-08-24", makeResultConsole);
_getGoToBedTime("test", "2015-08-24", makeResultConsole);

/*
 *   Chart.
 */

Chart.defaults.global.animation = false;

var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var barChartData = {
	labels : ["Father","Mother","Son","Daughter"],
	datasets : [
		{
			fillColor : "#60A51E",
			strokeColor : "rgb(220,220,220)",
			highlightFill: "rgb(220,220,220)",
			highlightStroke: "rgb(220,220,220)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		}
	]

}

var lineChartData = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				label: "My First dataset",
				fillColor : "#50A51E",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(220,220,220,1)",
				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			},
			{
				label: "My First dataset",
				fillColor : "#90A51E",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(220,220,220,1)",
				data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
			}
		]
}

var pieData = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Green"
				},
				{
					value: 100,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Yellow"
				},
				{
					value: 40,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Grey"
				},
				{
					value: 120,
					color: "#4D5360",
					highlight: "#616774",
					label: "Dark Grey"
				}
];
