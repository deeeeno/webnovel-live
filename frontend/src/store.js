import Vue from 'vue'
import Vuex from 'vuex'
import io from "socket.io-client";
import createSocketPlugin from './socketplugin';
Vue.use(Vuex)

const socket = io("http://localhost:3000") // for server communication
const plugin = createSocketPlugin(socket); // same as

//저장소 생성 & 외부에서 사용가능하도록.
export default new Vuex.Store({
  state: {
    //내가 사용할 정보에 대한 state
    overall: [{
        index: "1",
        content: "a",
        lock: false
      },
      {
        index: "2",
        content: "b",
        lock: false
      },
      {
        index: "3",
        content: "c",
        lock: false
      },
      {
        index: "4",
        content: "d",
        lock: false
      }
    ] // id, context, lock
  },
  ///getters
  getters: {
    getOverall: function(state) {
      return state.overall;
    }
  },
  //setters sync
  mutations: {
    nowUsing: function (state, payload) { //for set using variable
      var index = state.overall.findIndex(obj => obj.index==payload.target);
      state.overall[index].lock = true;
      socket.emit("sendLock", { target : payload.target });
    },
    editDone: function (state, payload) {
      var index = state.overall.findIndex(obj => obj.index==payload.target);
      state.overall[index].lock = false;
      socket.emit("sendContent", { target : payload.target, content: state.overall[index].content });
    },
    setNewStory: function(state, payload){
      console.log("get target : ", payload.target);
      console.log("get content : ", payload.content);
      var index = state.overall.findIndex(obj => obj.index==payload.target);
      state.overall[index].content = payload.content;
    },
    setNewLock: function(state, payload){
      var index = state.overall.findIndex(obj => obj.index==payload.target);
      state.overall[index].lock = true;
    }
  },
  //setters asyns
  /*actions: {
    setNewStory: function(state, payload){
      var index = state.overall.findIndex(obj => obj.index==payload.target);
      state.storyList[index] = payload.content;
    },
    setNewLock: function(state, payload){
      var index = state.overall.findIndex(obj => obj.index==payload.target);
      state.storyList[index] = true;
    }
  },*/
  plugins: [plugin],
})
