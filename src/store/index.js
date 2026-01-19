import Vue from 'vue'
import Vuex from 'vuex'

import { game } from './modules/game'
import { races } from './modules/races'
import { horses } from './modules/horses'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    races,
    horses,
  },
})
