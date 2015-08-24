var gcm = require('node-gcm');
var fs = require('fs');

var server_api_key = 'AIzaSyBG5FLRhkW-RC0UPomnhR3A2jrRXPrjLl4';
var sender = new gcm.Sender(server_api_key);

exports.pushMessage = function (title, message, m_duid) {

  var gcm_message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        title: title,
        message: message,
        custom_key1: 'custom data1',
        custom_key2: 'custom data2'
    }
  });

  var registrationIds = [];
  registrationIds.push(m_duid);
  sender.send(gcm_message, registrationIds, 4, function (err, result) {
    console.log(result);
  });

};





