<template>
  <div
    class="section-panel"
    :class="{
      [`section-panel--${variant}`]: true,
    }"
  >
    <div class="section-panel__header" role="heading" aria-level="2">
      {{ title }}
    </div>
    <div class="section-panel__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionPanel',
  props: {
    title: String,
    variant: {
      type: String,
      required: true,
      validator: (v) => ['program', 'results', 'horses'].includes(v),
    },
  },
}
</script>

<style scoped>
.section-panel {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.section-panel__header {
  padding: 6px;
  text-align: center;
  font-weight: 700;
}

.section-panel__body {
  flex: 1;
}

.section-panel--program .section-panel__header {
  background: var(--color-program);
}

.section-panel--results .section-panel__header {
  background: var(--color-results);
}

.section-panel--horses .section-panel__header {
  background: var(--color-horses);
}
</style>
