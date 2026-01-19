<template>
  <div class="program-results">
    <div class="program-results__columns">
      <SectionPanel title="Program" variant="program">
        <RoundsList :rounds="rounds" mode="program" />
      </SectionPanel>

      <SectionPanel title="Results" variant="results">
        <RoundsList :rounds="finishedRounds" mode="results" autoScroll />
      </SectionPanel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RoundsList from './RoundsList.vue'

import SectionPanel from '@/components/ui/SectionPanel.vue'

export default {
  name: 'ProgramResults',
  components: { SectionPanel, RoundsList },
  props: {
    rounds: {
      type: Array,
      required: true,
    },
    currentRound: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('races', ['finishedRounds']),
  },
}
</script>

<style scoped>
.program-results {
  height: 100%;
}

.program-results__columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}
</style>
