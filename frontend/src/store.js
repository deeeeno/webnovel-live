import Vue from 'vue'
import Vuex from 'vuex'
import io from "socket.io-client";
import createSocketPlugin from './socketplugin';

Vue.use(Vuex)
//Vuex : Vue.js application에 대한 상태 관리 패턴 + 라이브러리.
//application의 모든 컴포넌트에 대한 중앙 집중식 저장소 역할.

const socket = io("http://localhost:3000") // for server communication
const plugin = createSocketPlugin(socket); // same as

//저장소 생성 & 외부에서 사용가능하도록.
export default new Vuex.Store({
  state: { // state 객체 선언 & 초기화
    count: 0,
    serverMessage: "Nothing yet",
  },
  mutations: {
    increment (state) { //increment handler에 들어오면
      state.count++
    },
    serverMessageChange (state, msg) { //serverMessageChange handler에 들어오면
      state.serverMessage = msg
    },
    countChange (state, x) { //countChange handler에 들어오면
      state.count = x;
    }
  },
  actions: {
    //need some more knowledge
    sendMessage (context) {// HelloWorld.vue파일에서 inc버튼이 눌리면 server에게 hello event handler로 쏨
      socket.emit("hello", { greetings: "hello", count: this.state.count });
    }
  },
  plugins: [plugin],
})
