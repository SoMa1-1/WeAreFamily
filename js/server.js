/* ----- Manager -----*/

//var server_address = "http://172.16.101.27:3000";
var server_address = "http://172.16.101.104:3000";

function _createTv(t_duid, code) {
	commonGetFunction('/tv?t_duid=' + t_duid + "&code=" + code);
}

/* ----- Ajax  -----*/

function commonGetFunction(urlStr, data) {

	var callUrl = server_address + urlStr;
	
	$.ajax({
		type : "GET",
		url : callUrl,
		contentType : 'application/json',
		
		success : function(response) {
			alert("Success!");
		},
		error : function() {
			alert("Error!");
		}
	});
}

function commonPostFunction(urlStr, data) {

	var callUrl = server_address + urlStr;
	
	$.ajax({
		type : "POST",
		data: data,
		url : callUrl,
		dataType : "application/json",
		
		success : function(response) {
			alert("Success!");
		},
		error : function(response) {
			alert("Error!");
			console.log(response);
		}
	});
}

