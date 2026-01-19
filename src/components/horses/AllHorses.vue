<template>
  <div class="horse-list">
    <SectionPanel title="Horse List (1–20)" variant="horses">
      <HorseList :horses="list" />
    </SectionPanel>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import HorseList from './HorseList.vue'

import SectionPanel from '@/components/ui/SectionPanel.vue'

export default {
  name: 'AllHorses',
  components: { SectionPanel, HorseList },
  computed: {
    ...mapState('horses', ['list']),
  },
}
</script>
