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

  setInterval(checkLockInterval, 5000);

  socket.on("paragraphAdd", (nextParaIndex) => {
    //create paragraph with calculated Index with claculateIndex(nextParaIndex)

    let index = calculateIndex(nextParaIndex);
    let data = {
      content: '',
      lock: false,
      owner: 'defaultUser'
    };

    paragraphs.set(index, data);

    console.log(paragraphs);
    // socket.emit
  });

  socket.on("paragraphUpdate", (data) => {

    //data.index;
    //data.content;
    let targetPara = paragraphs.get(data.index);
  
    if(canEdit(targetPara, data.owner)) {
      console.log("updatedParagraph");
      targetPara.content = data.content;
      updateLock(data.index, data.owner);
      paragraphs.set(data.index, targetPara);
    }
    console.log(paragraphs);

    // socket.emit
  });

  socket.on("paragraphDelete", (data) => {

    //data.index;
    let targetPara = paragraphs.get(data.index);
    if(canEdit(targetPara, data.owner)) {
      paragraphs.delete(data.index);
    }
    console.log(paragraphs);

  });

  socket.on("sendLock",(data) =>{
    console.log(data.id + " is using");
    socket.broadcast.emit("plzSetLock", { targetLock : data.id });
  });

  socket.on("sendContent",(data) =>{
    console.log("target number : " + data.id);
    console.log("content : " + data.content);
    socket.broadcast.emit("plzSetContent", { target : data.id, content: data.content });
  });
  function findPrevParaIndex(nextParaIndex) {
    let prevIndex = MIN_INDEX;
    paragraphs.forEach(function (value, key, map) {
      let temp = key;
      if (temp < nextParaIndex && temp > prevIndex) {
        prevIndex = temp;
      }
    });

    return prevIndex;
  }

  function canEdit(targetPara, user) {
    if (targetPara.lock == true) {
      if (targetPara.owner == user) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  function calculateIndex(nextParaIndex) {
    let newIndex;
    let prevIndex = findPrevParaIndex(nextParaIndex);

    if (prevIndex === MIN_INDEX) {
      newIndex = nextParaIndex - 1;
    } else if (!nextParaIndex) {
      newIndex = prevIndex + 1;
    } else {
      newIndex = prevIndex + ((nextParaIndex - prevIndex) / 2);
    }

    return newIndex;
  }


  const MAX_LOCK_TIME = 50000;

  function checkLockInterval() {

    //console.log("check lock");
    let currentTime = Date.now();
    paragraphs.forEach((value, key, map) => {
      if (value.lock == true) {
        if (currentTime - value.lockTime > MAX_LOCK_TIME) {
          const temp = value;
          temp.lock = false;
          temp.lockTime = null;
          paragraphs.set(key, temp);
          console.log(`release lock of : ${key} |||| ${value.lockTime} ||||| ${currentTime}`);
        } else {
          console.log(`still got lock of : ${key} |||| ${value.lockTime} ||||| ${currentTime}`)
        }
      }
    });

  }

  function updateLock(index, owner) {
    let targetPara = paragraphs.get(index);
    targetPara.owner = owner;
    targetPara.lock = true;
    targetPara.lockTime = Date.now();
    paragraphs.set(index, targetPara);
  }
};