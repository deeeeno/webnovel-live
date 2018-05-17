module.exports = function (socket) {
  const paragraphs = new Map([
    [0, {
      content: 'Hello World!',
      lock: false,
      owner: ''
    }],
    [1, {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      lock: false,
      owner: ''
    }],
    [2, {
      content: 'Nam dui velit, tempor a magna vitae, vulputate aliquam lacus.',
      lock: false,
      owner: ''
    }]
  ]);
  const MIN_INDEX = -99999;

  socket.on("sendLock",(data) =>{
    console.log(data.id + " is using");
    socket.broadcast.emit("plzSetLock", { targetLock : data.id });
  });

  socket.on("sendContent",(data) =>{
    console.log("target number : " + data.id);
    console.log("content : " + data.content);
    socket.broadcast.emit("plzSetContent", { target : data.id, content: data.content });
  });

  socket.on("paragraphAdd", (nextParaIndex) => {
    var index = calculateIndex(nextParaIndex);
    var data = {
      content: 'add example',
      lock: false,
      owner: ''
    };
    paragraphs.set(index, data);
    socket.emit("plzSetNewPara",index);
    socket.broadcast.emit("plzSetNewPara",index);
  });
  function findPrevParaIndex(nextParaIndex) {
    let index = MIN_INDEX;
    if (nextParaIndex === null) {
      if (paragraphs.length === 0) {  // Document에 아무 paragraph도 없을 때
        return 0;
      } else {  // 맨 마지막 paragraph 뒤에 새로운 paragraph 추가할 때
        paragraphs.forEach(function (value, key, map) {
          let temp = key;
          if (temp > index) {
            index = temp
          }
        });

        return index;
      }
    } else {  // 두 paragraph 사이에 새로운 paragraph 추가할 때
      paragraphs.forEach(function (value, key, map) {
        let temp = key;
        if (temp < nextParaIndex && temp > index) {
          index = temp;
        }
      });

      return index;
    }
  }

  function calculateIndex(nextParaIndex) {
    let newIndex;
    let prevIndex = findPrevParaIndex(nextParaIndex);
    console.log("previous ID : " + prevIndex);
    if (prevIndex === 0) {
      newIndex = prevIndex;
    } else if (nextParaIndex === null) {
      newIndex = prevIndex + 1;
    } else {
      newIndex = (prevIndex + nextParaIndex) / 2;
    }

    return newIndex;
  }
}
