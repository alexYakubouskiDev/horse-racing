<template>
  <div class="round">
    <div
      v-for="horse in round.horses"
      :key="horse.id"
      class="round__lane"
      ref="lanes"
    >
      <div
        class="round__horse"
        ref="horses"
        :style="{
          transform: `translateX(${positions[horse.id] || 0}px) scaleX(-1)`,
        }"
      >
        <img :src="horseIcon" class="round__horse-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import horseIcon from '@/assets/icons/horse.svg'

export default {
  name: 'RaceRound',

  computed: {
    horseIcon() {
      return horseIcon
    },
  },

  props: {
    round: Object,
    isRunning: Boolean,
  },

  data() {
    return {
      startTime: null,
      animationFrame: null,
      positions: {},
      maxDuration: 0,
      resultData: [],
      finishedOnce: false,
      trackWidth: 0,
      horseWidth: 0,
      pausedAt: null,
      totalPausedTime: 0,
    }
  },

  watch: {
    isRunning(newVal, oldVal) {
      if (!newVal && oldVal) {
        this.pause()
      }
      if (newVal && !oldVal) {
        this.resume()
      }
    },

    'round.result': {
      immediate: true,
      handler(result) {
        if (!result || !this.isRunning) return
        this.startAnimation(result)
      },
    },

    round: {
      immediate: true,
      handler() {
        this.positions = {}
        this.finishedOnce = false
        this.pausedAt = null
        this.totalPausedTime = 0

        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame)
          this.animationFrame = null
        }
      },
    },
  },

  methods: {
    startAnimation(result) {
      this.finishedOnce = false
      this.totalPausedTime = 0
      this.pausedAt = null
      this.startTime = performance.now()
      this.maxDuration = Math.max(...result.map((h) => h.time)) * 1000
      this.positions = {}
      this.resultData = result

      this.$nextTick(() => {
        const laneEl = this.$refs.lanes[0]
        const horseEl = this.$refs.horses[0]

        this.trackWidth = laneEl.offsetWidth
        this.horseWidth = horseEl.offsetWidth

        this.loop()
      })
    },

    loop() {
      const now = performance.now()
      const elapsed = now - this.startTime - this.totalPausedTime
      const maxX = this.trackWidth - this.horseWidth

      this.resultData.forEach((horse) => {
        const progress = Math.min(elapsed / (horse.time * 1000), 1)
        const x = progress * maxX
        this.$set(this.positions, horse.id, x)
      })

      if (elapsed < this.maxDuration) {
        this.animationFrame = requestAnimationFrame(() => this.loop())
      } else {
        this.finish()
      }
    },

    pause() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
        this.pausedAt = performance.now()
      }
    },

    resume() {
      if (this.pausedAt) {
        this.totalPausedTime += performance.now() - this.pausedAt
        this.pausedAt = null
        this.loop()
      }
    },

    finish() {
      if (this.finishedOnce) return
      this.finishedOnce = true

      cancelAnimationFrame(this.animationFrame)
      this.$emit('finished')
    },
  },

  beforeDestroy() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame)
  },
}
</script>

<style scoped>
.round__lane {
  position: relative;
  height: var(--lane-height);
  border-bottom: 1px dashed var(--color-bg-grey);
}

.round__horse {
  position: absolute;
  left: 0;
  width: var(--horse-width);
  height: var(--horse-height);
  display: flex;
  align-items: center;
  justify-content: center;
}

.round__horse-icon {
  width: var(--horse-icon-size);
  height: auto;
  transform: scaleX(-1);
}
</style>
