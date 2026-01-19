<template>
  <div class="rounds" ref="roundsList">
    <RoundBlock
      v-for="round in rounds"
      :key="round.round"
      :round="round"
      :mode="mode"
    />
  </div>
</template>

<script>
import RoundBlock from './RoundBlock.vue'

export default {
  name: 'RoundsList',
  components: { RoundBlock },
  props: {
    rounds: Array,
    mode: {
      type: String,
      default: 'program',
    },
    autoScroll: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    rounds() {
      if (!this.autoScroll) return

      this.$nextTick(() => {
        const el = this.$refs.roundsList
        if (el) el.scrollTop = el.scrollHeight
      })
    },
  },
}
</script>

<style scoped>
.rounds {
  height: 85vh;
  overflow-y: auto;
  background-color: var(--color-bg-white);
}
</style>
