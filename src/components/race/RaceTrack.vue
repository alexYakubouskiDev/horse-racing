<template>
  <div v-if="hasRound" class="race-track">
    <div class="race-track__grid">
      <div class="race-track__lanes">
        <div
          v-for="n in horsesPerRound"
          :key="n"
          class="race-track__lane-number"
        >
          {{ n }}
        </div>
      </div>

      <div class="race-track__track">
        <RaceRound
          :round="currentRoundData"
          :isRunning="isRunning"
          @finished="roundFinished"
        />

        <div class="race-track__finish-line"></div>
        <div class="race-track__finish-label">FINISH</div>
      </div>
    </div>

    <div class="race-track__lap-label">
      {{ roundLabel }} Lap {{ currentRoundData.distance }}m
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import RaceRound from './RaceRound.vue'

import { GAME_CONFIG } from '@/constants/game'
import { ordinal } from '@/utils/ordinal'

export default {
  name: 'RaceTrack',
  components: { RaceRound },

  computed: {
    ...mapState('races', ['rounds']),
    ...mapGetters('game', ['isRunning', 'currentRound']),
    ...mapGetters('races', ['currentRoundData']),

    horsesPerRound() {
      return GAME_CONFIG.HORSES_PER_ROUND
    },

    roundLabel() {
      return ordinal(this.currentRound)
    },

    hasRound() {
      return Boolean(this.currentRoundData)
    },
  },

  methods: {
    ...mapActions('game', ['roundFinished']),
  },
}
</script>

<style scoped>
.race-track {
  margin: var(--gap-medium);
}

.race-track__grid {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: stretch;
}

.race-track__lanes {
  display: flex;
  flex-direction: column;
}

.race-track__lane-number {
  height: var(--lane-height);
  width: var(--lane-width);
  background: var(--color-track-green);
  border: 1px solid var(--color-white);
  color: var(--color-bg-white);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
}

.race-track__track {
  position: relative;
}

.race-track__finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-finish);
}

.race-track__finish-label {
  position: absolute;
  right: -18px;
  bottom: -32px;
  font-weight: bold;
}

.race-track__lap-label {
  text-align: center;
  margin-top: 8px;
  font-weight: 700;
}

.race-track__finish-label,
.race-track__lap-label {
  color: var(--color-finish);
}
</style>
