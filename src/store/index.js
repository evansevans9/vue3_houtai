// import Vue from "vue";
import Vuex from "vuex";
import storage from '../utils/storage'

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo : "" || storage.getItem('userInfo')
  },
  getters: {

  },
  mutations: {
    saveuserInfo(state,userInfo){
        state.userInfo = userInfo
        storage.setItem("userInfo",userInfo)
    }

  },
  actions: {

  },
  modules: {

  },
});
