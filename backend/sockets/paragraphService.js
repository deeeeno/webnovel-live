module.exports = function (socket) {

  socket.on("paragraphUpdate", (data) => {
    //socket.emit("serverHello", {
    //  msg:`Hi this is server + ${new Date()}`,
    //  count: data.count,
    //});
    //socket.broadcast.emit("serverHello", {
    //  msg:`Hi this is server + ${new Date()}`,
    //  count: data.count,
    //});
  });

}