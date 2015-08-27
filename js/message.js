/* 
 *  Control.
 */

function handleMessage(e) {
	
	switch(e.keyCode){
		case TvKeyCode.KEY_LEFT:
			if(menu_index == 20){
				backToMain(menu_index, 2);
			} else {
				menu_index--;
				moveMenu(menu_index+1, false)
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_UP:
			if(menu_index == 20){
				backToMain(menu_index, 2);
			} else {
				menu_index--;
				moveMenu(menu_index+1, false)
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_RIGHT:
			if (menu_index == 0){
				menu_index = menu_index +1;
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			else if(menu_index != 28 && menu_index < 28){
				menu_index++;
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_DOWN:
			if (menu_index == 0){
				menu_index = menu_index +1;
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			else if(menu_index != 28 && menu_index < 28){
				menu_index++;
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_ENTER:
			if(menu_index >= 20 && menu_index < 25)
				$(move[menu_index]).click();
			if(menu_index == 24) {
				$("#message_set_time").focus();
				
				$(document).unbind();
				$(document).keydown(handleMessageBack);
			} else if(menu_index == 25) {
				$("#message_set_location").focus();
				
				$(document).unbind();
				$(document).keydown(handleMessageBack);
			}
			changePage(menu_index);
			break;
		case TvKeyCode.KEY_BACK:
			backToMain(menu_index, 2);
			break;
		default:
			break;
	}
}

function handleMessageBack(e) {
	
	switch(e.keyCode){
	case TvKeyCode.KEY_BACK:
		bindKeyToMessage();
		break;
	}
}

function bindKeyToMessage(){
	menu_index = 20;
	moveMenu(menu_index,true);
	
	$(document).unbind();
	$(document).keydown(handleMessage);
}
