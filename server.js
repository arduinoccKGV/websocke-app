(function () {
  'use strict';
  // - - - - - - - - - -

  // declarations
  let
    WebSocketServer = require('websocket').server,
    http            = require('http'),
    httpServer      = http.createServer(),
    httpServerPort = 3000,
    server         = null
  ;

  // test output
  console.log("server code works ...");

  // start a http and a socket server
  httpServer.listen(httpServerPort, function () {
    console.log('http/socket server runs on port ' + httpServerPort);
  });

  server = new WebSocketServer({httpServer:httpServer});

  // work with socket events
  server.on('request', function (request) {
    console.log('socket request!');

    // setInterval(function(){
    //   connection.send('{"rotate":"' + (Math.random()*2) + '"}');
    //   console.log('sending a message ...');
    // }, 1000);

    // eventhandler for socket client messages
    let connection = request.accept(null, 'Arduino MKR 1000');

    // event handler for a specific connection
    connection.on('message', function (data) {
      console.log(data.type);
      console.log(data.utf8Data);

      connection.sendUTF(data.utf8Data);

      // convert data string to an object (memory object)
      let dataObject = JSON.parse(data.utf8Data);
      console.log(dataObject.potValue);
      console.log(dataObject.buttonState);
    });

    connection.on('close', function () {
      console.log('socket connection closed!');
    });

  });

  // - - - - - - - - - -
}());
