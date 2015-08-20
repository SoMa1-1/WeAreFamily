var view_stack = new Array();
var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

//Initialize function
var init = function () {
	
//	setTimeout(function() {
		$("#intro").hide(); 
		$("#main").css('visibility', 'visible');
//	}, 3000);
	
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
    // TODO:: Do your initialization job
    console.log("init() called");
    
    var backEvent = function(e) {
        if ( e.keyName == "back" ) {
            try {
                if ( $.mobile.urlHistory.activemenu_index <= 0 ) {
                    // if first page, terminate app
                    unregister();
                } else {
                    // move previous page
                    $.mobile.urlHistory.activemenu_index -= 1;
                    $.mobile.urlHistory.clearForward();
                    window.history.back();
                }
            } catch( ex ) {
                unregister();
            }
        }
    }
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );

function naviToggle() {
	$(".navigator").mouseenter(function() {
		naviFocus();
    }).mouseleave(function() {
    	naviUnFocus();
    });
}

function naviFocus() {
	$(".navigator").css("width", "20%");
	$(".content-main").css("width", "80%");
	$("#content-background").css('left', '22%');
	$("#content-background").css("width", "77%");
}

function naviUnFocus() {
	$(".navigator").css("width", "7%");
	$(".content-main").css("width", "93%");
	$("#content-background").css('left', '8.5%');
	$("#content-background").css("width", "90%");
}

function naviOnClick() {
	$("#navi-home").click(function() {
		changePage(0);
    });
	
	$("#navi-location").click(function() {
		changePage(1);
    });
	
	$("#navi-message").click(function() {
		changePage(2);
    });
	
	$("#navi-lifestyle").click(function() {
		changePage(3);
    });
	
	$("#navi-mission").click(function() {
		changePage(4);
    });
	
	$("#navi-option").click(function() {
		changePage(5);
    });
}

function setFocusVisible(menu_index1,state){
	var list = $.mobile.activePage.find("a[href]");
	
	$item = list[menu_index1];
	if (state) {
		$item.focus();
		if(menu_index1 != 0) {
			naviFocus();
		} else {
			naviUnFocus();
		}
	}
	else {
		$item.blur();
	}
}

function handelMain(e) {
	switch(e.keyCode){
		case TvKeyCode.KEY_LEFT:
		case TvKeyCode.KEY_UP:
			if(menu_index != 0  && menu_index >0){
				menu_index--;
			}
			setFocusVisible(menu_index+1,false);
			setFocusVisible(menu_index,true);
			moveMenu(menu_index+1, false)
			moveMenu(menu_index, true);
			break;
		case TvKeyCode.KEY_RIGHT:
			$(".option_menu1").addClass("ui-btn-active");
			menu_index = menu_index +1;
			break;
		case TvKeyCode.KEY_DOWN:
			if (menu_index == 0){
				menu_index = menu_index +1;
				setFocusVisible(menu_index-1,false);
				setFocusVisible(menu_index,true);
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			else if(menu_index != 5 && menu_index < 5){
				menu_index++;
				setFocusVisible(menu_index-1,false);
				setFocusVisible(menu_index,true);
				moveMenu(menu_index-1, false);
				moveMenu(menu_index, true);
			}
			break;
		case TvKeyCode.KEY_ENTER:
			if(menu_index != 6) {
				moveMenu(menu_index, false);
				changePage(menu_index);
			}
			break;
		default:
			break;
	}
}

function bindKeyToMain(){
	
	naviToggle();
	naviOnClick();
	
	changePage(0);
	
	setFocusVisible(menu_index, true);
	moveMenu(menu_index, true);
	
	document.body.removeEventListener("keydown",handelMain,false);
	document.body.addEventListener("keydown",handelMain ,false);
}

$(document).on("pageshow", "#main", bindKeyToMain);
