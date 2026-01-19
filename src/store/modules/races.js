import { GAME_CONFIG } from '@/constants/game'
import { runRace } from '@/domain/race/raceEngine'
import { shuffle } from '@/utils/random'

export const races = {
  namespaced: true,

  state: () => ({
    rounds: [],
  }),

  mutations: {
    SET_ROUNDS(state, rounds) {
      state.rounds = rounds
    },
    SET_RESULT(state, { round, result }) {
      const roundData = state.rounds.find((r) => r.round === round)
      if (roundData) roundData.result = result
    },
    SET_ROUND_HORSES(state, { round, horses }) {
      const roundData = state.rounds.find((r) => r.round === round)
      if (roundData) roundData.horses = horses
    },
    FINISH_ROUND(state, round) {
      const roundData = state.rounds.find((r) => r.round === round)
      if (roundData) roundData.finished = true
    },
  },

  actions: {
    initRounds({ commit, rootState }) {
      const allHorses = rootState.horses.list

      const rounds = GAME_CONFIG.ROUND_DISTANCES.map((distance, index) => {
        const selected = shuffle(allHorses).slice(
          0,
          GAME_CONFIG.HORSES_PER_ROUND
        )

        return {
          round: index + 1,
          distance,
          horses: selected,
          result: null,
          finished: false,
        }
      })

      commit('SET_ROUNDS', rounds)
    },

    runRound({ state, commit }, { round }) {
      const roundData = state.rounds.find((r) => r.round === round)

      if (!roundData) return

      const result = runRace(roundData.horses, roundData.distance)
      commit('SET_RESULT', { round, result })
    },
  },

  getters: {
    roundByNumber: (state) => (round) =>
      state.rounds.find((r) => r.round === round),
    currentRoundData: (state, _, rootState) =>
      state.rounds.find((r) => r.round === rootState.game.currentRound),
    finishedRounds: (state) => state.rounds.filter((r) => r.finished),
  },
}
