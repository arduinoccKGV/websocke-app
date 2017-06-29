/*
a web socket-client script
*/
(function(){
  'use strict';

  console.log('browser with socket cleints runs ...');

  var
  socket = null,
socketHost = 'ws://192.168.0.195',
socketPort = 3000;

  socket = new WebSocket(socketHost + ':' + socketPort); // ws://192.168.0.195:3000

// the socket event handler und their callback funtions

socket.onopen = function () {
console.log('socket opened');
}; //eventhandler
socket.onerror = function () {
console.log('socket error');
};
socket.onmessage = function(message) {
console.log('socket message available!');
var
 potValue = message.data.potValue,
 buttonState= message.data.buttonState;

 document.querySelector('#potValue').innerHTML = potValue;
 document.querySelector('#buttonState').innerHTML = buttonState;

};

}());
