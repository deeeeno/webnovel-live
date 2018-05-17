module.exports = function (socket) {

  const paragraphs = new Map([]);

  setInterval(checkLockInterval, 1500);

  socket.on("paragraphAdd", (nextParaIndex) => {
    //create paragraph with calculated Index with claculateIndex(nextParaIndex)
    
    let index = calculateIndex(nextParaIndex);
    let content = '';
    
    paragraphs.set(index, content);
    
    console.log(paragraphs);
    // socket.emit
  });

  socket.on("paragraphUpdate", (data) => {

    //data.index;
    //data.content;
    
    paragraphs.set(data.index, data.content);
    console.log(paragraphs);
    
    // socket.emit
  });

  socket.on("paragraphDelete", (index) => {

    //data.index;
    paragraphs.delete(index);
    console.log(paragraphs);
    
  });
  
  function findPrevParaIndex(nextParaIndex) {
    let prevIndex = 0;
    paragraphs.forEach(function (value, key, map) {
      let temp = key;
      if (temp < nextParaIndex && temp > prevIndex) {
        prevIndex = temp;
      }
    });
    
    return prevIndex;
  }
  
  function calculateIndex(nextParaIndex) {
    let newIndex;
    let prevIndex = findPrevParaIndex(nextParaIndex);
    
    if (prevIndex === 0) {
      newIndex = 0;
    } else if (!nextParaIndex) {
      newIndex = prevIndex + 1;
    } else {
      newIndex = prevIndex + ((nextParaIndex - prevIndex) / 2);
    }
    
    return newIndex;
  }


  const MAX_LOCK_TIME = 20000;
  function checkLockInterval(paragraphs) {

    console.log("check lock");
    const currentTime = Date.now();
    paragraphs.forEach((value, key, map) => {
      if(value.lock == true) {
        if(value.lockTime - currentTime > MAX_LOCK_TIME) {
          const temp = value;
          temp.lock = false;
          temp.lockTime = null;
          paragraphs.set(key, temp);
        }
      }      
    });
  
  }
  
  function updateLock(index) {
    let paragraphObject = paragraphs.get(index);
    paragraphObject.lockTime = Date.now();
    paragraphs.set(index, paragraphObject);
  }
};

