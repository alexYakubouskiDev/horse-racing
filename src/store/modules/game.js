import { GAME_CONFIG } from '@/constants/game'
import { STATUSES } from '@/constants/statuses'

export const game = {
  namespaced: true,

  state: () => ({
    status: STATUSES.idle,
    currentRound: 1,
    isTransitioning: false,
  }),

  mutations: {
    SET_STATUS(state, status) {
      state.status = status
    },
    SET_CURRENT_ROUND(state, round) {
      state.currentRound = round
    },
    SET_TRANSITION(state, value) {
      state.isTransitioning = value
    },
  },

  actions: {
    generateGame({ commit, dispatch }) {
      dispatch('horses/createHorses', null, { root: true })
      dispatch('races/initRounds', null, { root: true })

      commit('SET_STATUS', STATUSES.ready)
      commit('SET_CURRENT_ROUND', 1)
    },

    toggleRun({ state, commit, dispatch }) {
      switch (state.status) {
        case STATUSES.ready:
          commit('SET_STATUS', STATUSES.running)
          dispatch(
            'races/runRound',
            { round: state.currentRound },
            { root: true }
          )
          break

        case STATUSES.running:
          commit('SET_STATUS', STATUSES.paused)
          break

        case STATUSES.paused:
          commit('SET_STATUS', STATUSES.running)
          break
        default:
          console.warn('Unknown game status:', state.status)
      }
    },

    async roundFinished({ state, commit, dispatch }) {
      commit('races/FINISH_ROUND', state.currentRound, { root: true })

      if (state.currentRound >= GAME_CONFIG.TOTAL_ROUNDS) {
        commit('SET_STATUS', STATUSES.finished)
        return
      }

      commit('SET_TRANSITION', true)

      await new Promise((r) => setTimeout(r, GAME_CONFIG.DELAY_BETWEEN_ROUNDS))

      const nextRound = state.currentRound + 1
      commit('SET_CURRENT_ROUND', nextRound)

      commit('SET_TRANSITION', false)

      dispatch('races/runRound', { round: nextRound }, { root: true })
    },
  },

  getters: {
    isIdle: (state) => state.status === STATUSES.idle,
    isReady: (state) => state.status === STATUSES.ready,
    isRunning: (state) => state.status === STATUSES.running,
    isFinished: (state) => state.status === STATUSES.finished,
    currentRound: (state) => state.currentRound,
    isPaused: (state) => state.status === STATUSES.paused,
    canToggle: (state) =>
      state.status === STATUSES.ready ||
      state.status === STATUSES.running ||
      state.status === STATUSES.paused,
  },
}
