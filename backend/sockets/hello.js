module.exports = function (socket) {

  socket.on("hello", (data) => {
    console.log(`${data.greetings} : ${data.count}`);
    socket.emit("serverHello", {
      msg:`Hi this is server + ${new Date()}`,
      count: data.count,
    });
    socket.broadcast.emit("serverHello", {
      msg:`Hi this is server + ${new Date()}`,
      count: data.count,
    });
  });
  
}