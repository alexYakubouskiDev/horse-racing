<template>
  <div class="controls">
    <div class="controls__title">Horse Racing</div>

    <div class="controls__actions">
      <button @click="generate" :disabled="isRunning">
        {{ primaryLabel }}
      </button>

      <button @click="toggle" :disabled="!canToggle || isTransitioning">
        {{ toggleLabel }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'ControlPanel',

  computed: {
    ...mapState('game', ['isTransitioning']),
    ...mapGetters('game', ['isRunning', 'isPaused', 'canToggle']),
    primaryLabel() {
      return 'Generate program'
    },
    toggleLabel() {
      if (this.isPaused) return 'Resume'
      if (this.isRunning) return 'Pause'
      return 'Start'
    },
  },

  methods: {
    ...mapActions('game', {
      generate: 'generateGame',
      toggle: 'toggleRun',
    }),
  },
}
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 48px;
  background: var(--color-header);
  border-bottom: 1px solid var(--color-header-border);
}

.controls__title {
  font-size: 18px;
  font-weight: 700;
}

.controls__actions {
  display: flex;
  gap: 10px;
}

.controls__actions button {
  width: var(--control-button-width);
  height: var(--control-button-height);
  border-radius: 0;
  border: 1px solid var(--color-bg-app);
  background: var(--color-bg-app);
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls__actions button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
