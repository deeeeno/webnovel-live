import Vue from 'vue'
import Vuex from 'vuex'
import io from "socket.io-client";
import createSocketPlugin from './socketplugin';
Vue.use(Vuex)

const socket = io("http://localhost:3000");
const plugin = createSocketPlugin(socket);

//저장소 생성 & 외부에서 사용가능하도록.
export default new Vuex.Store({
  state: {
    //내가 사용할 정보에 대한 state
    overall: [{
        id: 1,
        content: "a",
        lock: false,
        owner: ''
      },
      {
        id: 2,
        content: "b",
        lock: false,
        owner: ''
      },
      {
        id: 3,
        content: "c",
        lock: false,
        owner: ''
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
    //index는 버튼 눌렀을 떄 그 아이디에 대한 위치
    nowUsing: function (state, payload) { //for set using variable
      var index = state.overall.findIndex(obj => obj.id==payload.id);
      state.overall[index].lock = true;
      state.overall[index].owner = payload.owner;
      socket.emit("sendLock", { id : payload.id });
    },
    editDone: function (state, payload) {
      var index = state.overall.findIndex(obj => obj.id==payload.id);
      state.overall[index].lock = false;
      socket.emit("sendContent", { id : payload.id, content: state.overall[index].content });
    },
    addParagraph: function(state, payload) {
      var Index = state.overall.findIndex(obj => obj.id==payload.id);
      var target = null;
      if((Index+1) < state.overall.length) target = (state.overall[Index+1].id)*1;
      socket.emit("paragraphAdd",target);
    },

    setNewStory: function(state, payload){
      console.log("get target : ", payload.target);
      console.log("get content : ", payload.content);
      var index = state.overall.findIndex(obj => obj.id==payload.target);
      state.overall[index].content = payload.content;
    },
    setNewLock: function(state, payload){
      var index = state.overall.findIndex(obj => obj.index==payload.target);
      state.overall[index].lock = true;
    },
    setNewPara: function(state, payload){
      var threshold = 0;
      for(var i=0; i<state.overall.length; i++)
      {
        if(state.overall[i].id < payload){ threshold = i;}
        if(state.overall[i].id > payload){ break; }
      }
      var data = {
        id : payload,
        content: "add example",
        lock: false,
        owner: ''
      }
      state.overall.splice(threshold+1,0,data);
      console.log("threshold : " + threshold);
    }
  },
  //setters asyns
  /*actions: {
  },*/
  plugins: [plugin],
})
