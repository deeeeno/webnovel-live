const debug = require("debug")("socket");

module.exports = function (server) {
  let io = require("socket.io")(server, { origins: "http://localhost:8080"});
  
  //server.listen should be after socket io startup. (was moved from ./bin/www)
  //this port should be the port in ./bin/www (potential bug)
  server.listen(3000);

  io.on("connection", function (socket) {

    console.log("got a connection");
    require('../sockets/hello')(socket);
    //console.log(socket);

  });
}