var gcm = require('./gcm');
var push = require('./handlers/push');

var db_push = push.db;

exports.mornitoring = function () {
    setInterval(function() {
      db_push.find({}, getPushCondition);  
    }, 1000 * 5);  
};

var numFamily=0;
var cnt=0;

getPushCondition = function(error, results) {

	numFamily = results.length;
	cnt=0;

	for(var i = 0; i < results.length; i++) {
		if(Math.abs(results[i].home_lat-results[i].lat)<0.0005 
			&& Math.abs(results[i].home_lon-results[i].lon)<0.0005){
			cnt++;
		}
	}

	console.log("***** 집에 있는 사람 수 *****");
	console.log("=" + cnt + "명");
	console.log("*******************");

	for(var i = 0; i < results.length; i++) {

		var home = new Object();
		home["t_duid"] = results[i].t_duid;
		home["lat"] = results[i].home_lat;
		home["lon"] = results[i].home_lon;

		var member = new Object();
		member["m_duid"] = results[i].m_duid;
		member["lat"] = results[i].lat;
		member["lon"] = results[i].lon;
		member["name"] = results[i].name;
		member["relation"] = results[i].relation;

		console.log("***** 위치 출력 *****");
		console.log("name : " + member.name);
		console.log("home : " + home.lat + " " + home.lon);
		console.log("member : " + member.lat + " " + member.lon);
		console.log("*******************");
		console.log("");

		isOutOrInHome(home, member, results);

	}
}

//prevLat & prevLon 배열은 m_duid 인덱스에 각각 해당 사용자의 이전의 위도, 경도 값을 갖는다.
var prevLat = new Array();
var prevLon = new Array();
//다음 변수는 배열의 값을 그대로 가져와서 사용한다
var prev_lat = 0;
var prev_lon = 0;

//집을 나갔는지 검사.
var isOutOrInHome = function(home, member, family){

	if(prevLat[member["m_duid"]] == "undefined" || prevLon[member["m_duid"]] == "undefined") {
		prevLat[member["m_duid"]] = member.lat;
		prevLon[member["m_duid"]] = member.lon;
	}

	prev_lat = prevLat[member["m_duid"]];
	prev_lon = prevLon[member["m_duid"]];

	//두 값의 차의 절대값이 0.0005 이하이면 같은 값이라고 간주

	//prev의 좌표가 home의 좌표와 같고, member의 좌표가 home의 좌표와 다르면 (=집에서 나갔을 경우)
	if ( Math.abs(prev_lat-home.lat)<0.0005 && Math.abs(prev_lon-home.lon)<0.0005 ){
		if( Math.abs(member.lat-home.lat)>=0.0005 || Math.abs(member.lon-home.lon)>=0.0005 ) {
			console.log(member.name + "님(" + member.relation + ")이 집을 나갔습니다.");
  			for(i=0;i<family.length;i++){
  				if(family[i].name!=member["name"]){
  					gcm.pushMessage("We Are Family", member.name + "님이 집을 나갔습니다.", family[i].m_duid);
  				}
  			}
  			if(cnt==0){
				console.log("마지막 멤버 " + member.name + "님(" + member.relation + ")이 집을 나갔습니다.");
	  			gcm.pushMessage("We Are Family", member.name + "님 가스불 조심하세요~!", member.m_duid);
  			}
  			else{
  				gcm.pushMessage("We Are Family", member.name + "님 잘 다녀오세요~!", member.m_duid);
  			}
		}
	}

	//prev의 좌표가 home의 좌표와 다르고, member의 좌표가 home의 좌표와 같으면 (=집에 들어왔을 경우)
	if ( Math.abs(prev_lat-home.lat)>=0.0005 || Math.abs(prev_lon-home.lon)>=0.0005 ){
		if( Math.abs(member.lat-home.lat)<0.0005 && Math.abs(member.lon-home.lon)<0.0005 ) {
			console.log(member.name + "님(" + member.relation + ")이 집에 들어왔습니다..");
			gcm.pushMessage("We Are Family", member.name + "님 다녀오셨어요~!", member.m_duid);
  			for(i=0;i<family.length;i++){
  				if(family[i].name!=member["name"]){
  					gcm.pushMessage("We Are Family", member.name + "님이 집에 들어왔습니다.", family[i].m_duid);
  				}
  			}
  			if(cnt==numFamily-1){
				for(i=0;i<family.length;i++) {
					if(Math.abs(family[i].home_lat-family[i].lat)>=0.0005 
						|| Math.abs(family[i].home_lon-family[i].lon)>=0.0005){
						console.log(family[i].name + "님(" + family[i].relation + ")을 제외한 모든 가족이 모였습니다.");
						gcm.pushMessage("We Are Family", family[i].name + "님, 가족들이 모두 집에 모여있네요. 집에 갈떄 치킨 한마리 어떠신가요? :D", family[i].m_duid);
						break;
					}
				}
  			}
		}
	}

	prevLat[member["m_duid"]] = member.lat;
	prevLon[member["m_duid"]] = member.lon;


}
