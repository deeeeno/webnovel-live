module.exports = function (socket) {
  socket.on("sendLock",(data) =>{
    console.log(data.target + " is using");
    socket.broadcast.emit("plzSetLock", { targetLock : data.target });
  });

  socket.on("sendContent",(data) =>{
    console.log("target number : " + data.target);
    console.log("content : " + data.content);
    socket.broadcast.emit("plzSetContent", { target : data.target, content: data.content });
  });
}
