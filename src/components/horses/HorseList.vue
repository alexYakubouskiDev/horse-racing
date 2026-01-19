<template>
  <div class="horse-list" role="table">
    <div class="horse-list__header" role="rowgroup">
      <div role="columnheader">Name</div>
      <div role="columnheader">Condition</div>
      <div role="columnheader">Color</div>
    </div>

    <div class="horse-list__body" role="rowgroup">
      <div
        v-for="horse in horses"
        :key="horse.id"
        class="horse-list__row"
        role="row"
      >
        <div role="cell">{{ horse.name }}</div>
        <div role="cell">{{ horse.condition }}</div>
        <div role="cell">{{ horse.color }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorseList',
  props: {
    horses: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.horse-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  background: var(--color-bg-white);
  height: 85vh;
  overflow-y: auto;
}

.horse-list__header {
  display: grid;
  grid-template-columns: 1fr var(--col-condition) var(--col-color);
  font-weight: bold;
  background-color: var(--color-bg-grey);
  border-bottom: 1px solid var(--color-bg-grey);
  padding: var(--space-row);
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1;
}

.horse-list__body {
  flex: 1;
}

.horse-list__row {
  display: grid;
  grid-template-columns: 1fr 80px 60px;
  padding: 12px 0;
  text-align: center;
  border-bottom: 1px dotted #ddd;
}
</style>
