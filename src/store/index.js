import Vue from 'vue'
import Vuex from 'vuex'
import Twitter from './module/twitter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    twitter: Twitter
  }
})
