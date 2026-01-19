<template>
  <div class="empty-state">
    <div class="empty-state__content">
      <div class="empty-state__title">Horse Racing Simulator</div>
      <div class="empty-state__hint">Press "Generate program" to start</div>
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
}

.empty-state__content {
  text-align: center;
  opacity: 0.6;
}

.empty-state__title {
  font-size: 20px;
  font-weight: 600;
}

.empty-state__hint {
  margin-top: 8px;
  font-size: 14px;
}
</style>
