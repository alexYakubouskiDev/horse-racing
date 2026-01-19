<template>
  <div class="layout">
    <div class="layout__header">
      <ControlPanel />
    </div>

    <EmptyState v-if="isIdle" />

    <div v-else class="layout__content">
      <div class="layout__left">
        <AllHorses />
      </div>

      <div class="layout__center">
        <RaceTrack />
      </div>

      <div class="layout__right">
        <ProgramResults :rounds="rounds" :currentRound="currentRound" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import ControlPanel from '@/components/controls/ControlPanel.vue'
import RaceTrack from '@/components/race/RaceTrack.vue'
import ProgramResults from '@/components/results/ProgramResults.vue'
import AllHorses from '@/components/horses/AllHorses.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

export default {
  components: {
    ControlPanel,
    RaceTrack,
    ProgramResults,
    AllHorses,
    EmptyState,
  },
  computed: {
    ...mapState('races', ['rounds']),
    ...mapGetters('game', ['isIdle', 'currentRound']),
  },
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background: var(--color-bg-app);
  font-family: var(--font-base);
}

.layout__header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.layout__content {
  display: grid;
  grid-template-columns: 260px 1fr 360px;
  gap: 16px;
  padding: 24px 16px;
  height: 100%;
  box-sizing: border-box;
}

.layout__left,
.layout__center,
.layout__right {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.layout__center {
  position: relative;
  background: transparent;
  box-shadow: none;
}
</style>
