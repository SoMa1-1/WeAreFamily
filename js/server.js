/*
 *  Server API
 */

//var server_address = "http://172.16.101.27:3000";
var server_address = "http://localhost:3000";

function _createTv(t_duid, code) {
	commonAjaxFuction('/tv?t_duid=' + t_duid + "&code=" + code);
}

function _generateTvCode(t_duid, code, callBack) {
	commonAjaxFuction(server_address + "/tv?t_duid=" + t_duid + "&code=" + code, callBack);
}

function _getOneDayDistance(m_duid, date, callBack) {
	commonAjaxFuction(server_address + "/gps?m_duid=" + m_duid + "&date=" + date, callBack);
}


function _getOneDayPhoneUTime(m_duid, date, callBack) {
	commonAjaxFuction(server_address + "/lock?m_duid=" + m_duid + "&date=" + date, callBack);
}

function _getWakeUpTime(m_duid, date, callBack) {
	commonAjaxFuction(server_address + "/lock?m_duid=" + m_duid + "&date=" + date + "&event=0", callBack);
}

function _getGoToBedTime(m_duid, date, callBack) {
	commonAjaxFuction(server_address + "/lock?m_duid=" + m_duid + "&date=" + date + "&event=1", callBack);
}

// Ajax

function commonAjaxFuction(urlStr, callBack) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", urlStr, true);
    
    xhr.onreadystatechange = function(e){
    		if(xhr.readyState == 4){
    			if(xhr.status = 200){
    				callBack($.parseJSON(xhr.responseText));
    			}else{
    				console.log("Error loading page");
    			}
    		}
    	};
    xhr.send(null);
}

/*
 *  CallBack
 */

function makeResultConsole(returnData) {
	console.log(returnData);
}

function makeTotalDistance(returnData) {
	var results = returnData.results;
	var total = 0;
	
	for(var i = 0; i < results.length-1; i++) {
		var from = results[i];
		var to = results[i+1];
		total += getDistance(from.lat, from.lon, to.lat, to.lon);
	}
	
	console.log("총 이동거리 : " + total);
}

function makeTotalPhoneUTime(returnData) {
	var results = returnData.results;
	var startIndex = 0;
	var total = 0;
	
	if(results[0].event == 1)
		startIndex = 1;
	
	for(var i = startIndex; i < results.length-1; i += 2) {
		var from = results[i].date;
		var to = results[i+1].date;
		total += getTimeDiff(from, to);
	}
	
	console.log("사용시간 : " + total + "ms");
}

function getTimeDiff(from, to)
{
    var from = new Date(from).getTime();
    var to = new Date(to).getTime();
    var milisec_diff = to - from;
    return milisec_diff;
}

/* ----- Ajax  -----*/

//function commonGetFunction(urlStr, data) {
//
//	var callUrl = server_address + urlStr;
//	
//	$.ajax({
//		type : "GET",
//		url : callUrl,
//		contentType : 'application/json',
//		
//		success : function(response) {
//			alert("Success!");
//		},
//		error : function() {
//			alert("Error!");
//		}
//	});
//}
//
//function commonPostFunction(urlStr, data) {
//
//	var callUrl = server_address + urlStr;
//	
//	$.ajax({
//		type : "POST",
//		data: data,
//		url : callUrl,
//		dataType : "application/json",
//		
//		success : function(response) {
//			alert("Success!");
//		},
//		error : function(response) {
//			alert("Error!");
//			console.log(response);
//		}
//	});
//}

