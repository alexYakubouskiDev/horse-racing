<template>
  <div class="round">
    <div class="round__title">{{ roundLabel }} Lap {{ round.distance }}m</div>

    <div class="round__table" role="table">
      <div class="round__row round__row--header" role="rowgroup">
        <div class="round__cell" role="cell">Position</div>
        <div class="round__cell" role="cell">Name</div>
      </div>

      <div
        v-for="(row, index) in rows"
        :key="row.id"
        class="round__row"
        role="row"
      >
        <div class="round__cell" role="cell">
          {{ mode === 'program' ? index + 1 : row.place }}
        </div>
        <div class="round__cell" role="cell">{{ row.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ordinal } from '@/utils/ordinal'

export default {
  name: 'RoundBlock',
  props: {
    round: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
      validator: (v) => ['program', 'results'].includes(v),
    },
  },
  computed: {
    rows() {
      return this.mode === 'program' ? this.round.horses : this.round.result
    },

    roundLabel() {
      return ordinal(this.round.round)
    },
  },
}
</script>

<style scoped>
.round {
  display: block;
}

.round__title {
  padding: 4px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  background: var(--color-round-title);
}

.round__table {
  font-size: 12px;
  display: grid;
  grid-template-columns: 1fr;
}

.round__row {
  display: grid;
  grid-template-columns: var(--col-position) 1fr;
  column-gap: 16px;
  border-bottom: 1px solid #aaa;
}

.round__cell {
  padding: 4px;
  text-align: center;
}

.round__row--header {
  font-weight: bold;
  background-color: #ccc;
  border-bottom: 1px solid #aaa;
}
</style>
