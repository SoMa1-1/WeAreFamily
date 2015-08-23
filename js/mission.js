/* 
 *  Control.
 */

function handleMission(e) {
	
	switch(e.keyCode){
		case TvKeyCode.KEY_LEFT:
			if(menu_index < 45){
				backToMain(menu_index, 4);
			} else if(menu_index >= 45 && menu_index < 48) {
				menu_index -= 5;
				moveMenu(menu_index+5, false)
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_UP:
			if(menu_index != 40){
				menu_index--;
				moveMenu(menu_index+1, false);
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_RIGHT:
			 if(menu_index >= 40 && menu_index < 43) {
					menu_index += 5;
					moveMenu(menu_index-5, false)
					moveMenu(menu_index, true);
				}
			break;
		case TvKeyCode.KEY_DOWN:
			if(menu_index != 47){
				menu_index++;
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_ENTER:
			console.log($(move[menu_index]));
			$(move[menu_index]).click();
			break;
		case TvKeyCode.KEY_BACK:
			backToMain(menu_index, 4);
			break;
		default:
			break;
	}
}

function initMissionPage() {
	$("#option_menus").show();
	$("#menu1_code").hide();
}

function bindKeyToMission(){
//	initOptionPage();
	menu_index = 40;
	moveMenu(menu_index,true);
	
	$(document).unbind();
	$(document).keydown(handleMission);
}
