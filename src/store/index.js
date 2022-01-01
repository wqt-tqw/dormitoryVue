import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // collegelist:[]
    role:'',
    username:'',
    primarykeyId:''
  },
  mutations: {
    primarykeyIdMutations(state,data){
      state.primarykeyId= data
    },
    roleMutations(state,data){
      state.role = data
    },
    usernameMutations(state,data){
      state.username = data
    }
  },
  actions: {
    // selectCollege(store,data){
    //   axios("/ajax/selectcollege?"+ (new Date()).getTime().toString()).then(res=>{
    //       console.log(res.data)//axios自动包装data属性 res.data
    //       console.log(store)
    //       // this.tableData=res.data.data
    //       // this.total=res.data.total
    //       store.commit('collegelistMutations',res.data)
    //   }).catch(err=>{
    //       console.log(err);
    //   })
    // }
  },
  modules: {
  }
})
