const debug = require("debug")("socketConfig");

module.exports = function (server) {
  let io = require("socket.io")(server, { origins: "*:*"});
  
  //server.listen should be after socket io startup. (was moved from ./bin/www)
  //this port should be the port in ./bin/www (potential bug)
  server.listen(3000);

  io.on("connection", function (socket) {

    debug("got a connection");
    require('../sockets/hello')(socket);
    require('../sockets/paragraphService')(socket);
    //console.log(socket);

  });
}