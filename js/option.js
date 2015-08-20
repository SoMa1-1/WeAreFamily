function handelOption(e) {
	
	switch(e.keyCode){
		case TvKeyCode.KEY_LEFT:
			if(menu_index == 50){
				backToMain();
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
			backToMain();
			break;
		default:
			break;
	}
}

function initOptionPage() {
	$("#option_menus").show();
	$("#menu1_code").hide();
}

function backToMain() {
	menu_index = 5;
	moveMenu(50, false)
	moveMenu(menu_index, true);
	bindKeyToMain();
	document.body.removeEventListener("keydown",handelOption,false);
}

function bindKeyToOption(){
	initOptionPage();
	menu_index = 50;
	moveMenu(menu_index,true);
	
	document.body.removeEventListener("keydown",handelOption,false);
	document.body.addEventListener("keydown",handelOption ,false);
}
