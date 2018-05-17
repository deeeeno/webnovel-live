module.exports = function (socket) {

  const paragraphs = [];

  socket.on("paragraphAdd", (data) => {
    //create paragraph with calculated Index with claculateIndex(nextParaIndex)
  });

  socket.on("paragraphUpdate", (data) => {

    //data.index;
    //data.content;


  });

  socket.on("paragraphDelete", (data) => {

    //data.index;

  });

  function calculateIndex(nextParaIndex) {
    let newIndex;
    return newIndex;
  }

}