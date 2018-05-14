//server와 통신이 되는 역할을 하는 javascript
//Plugin형태로 import해서 사용
export default function createSocketPlugin (socket) {
  return store => {
    socket.on("serverHello", (data) => { // serverHello가 오면 store의 data들을 최신화 해줘
      console.log(data);
      store.commit("serverMessageChange", data.msg);
      store.commit("countChange", data.count);
    });
  }
}
