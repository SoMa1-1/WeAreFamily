/* 
 *  Control.
 */

function handleSetting(e) {
	
	switch(e.keyCode){
		case TvKeyCode.KEY_LEFT:
			if(menu_index == 50){
				backToMain(menu_index, 5);
			} else {
				menu_index--;
				moveMenu(menu_index+1, false)
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_UP:
			break;
		case TvKeyCode.KEY_RIGHT:
			if (menu_index == 0){
				menu_index = menu_index +1;
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			else if(menu_index != 51 && menu_index < 51){
				menu_index++;
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_DOWN:
			break;
		case TvKeyCode.KEY_ENTER:
			changePage(menu_index);
			break;
		case TvKeyCode.KEY_BACK:
			backToMain(menu_index, 5);
			break;
		default:
			break;
	}
}

function initSettingPage() {
	$("#option_menus").show();
	$("#menu1_code").hide();
}

function bindKeyToSetting(){
	initSettingPage();
	menu_index = 50;
	moveMenu(menu_index,true);
	
	$(document).unbind();
	$(document).keydown(handleSetting);
}

/*
 *  Sign Up
 */

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
