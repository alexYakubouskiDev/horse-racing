import { HORSE_COLORS } from '@/constants/colors'
import { GAME_CONFIG } from '@/constants/game'
import {
  CONDITION_MAX,
  CONDITION_MIN,
  SPEED_MAX,
  SPEED_MIN,
} from '@/constants/horse'
import { HORSE_NAMES } from '@/constants/names'
import { randomInt } from '@/utils/random'

function generateHorse(id, color, name) {
  return {
    id,
    name,
    color,
    speed: randomInt(SPEED_MIN, SPEED_MAX),
    condition: randomInt(CONDITION_MIN, CONDITION_MAX),
  }
}

export const horses = {
  namespaced: true,

  state: () => ({
    list: [],
  }),

  mutations: {
    SET_HORSES(state, horses) {
      state.list = horses
    },
  },

  actions: {
    createHorses({ commit }) {
      const horses = []

      for (let i = 0; i < GAME_CONFIG.HORSES_TOTAL_COUNT; i++) {
        horses.push(
          generateHorse(
            i + 1,
            HORSE_COLORS[i % HORSE_COLORS.length],
            HORSE_NAMES[i % HORSE_NAMES.length]
          )
        )
      }

      commit('SET_HORSES', horses)
    },
  },
}
