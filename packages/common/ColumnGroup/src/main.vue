<template>
  <div class="n-column-group">
    <div class="columns">
      <div
        v-for="index in colIndexes"
        :key="index"
        class="column"
      >
        <slot :name="`col(${index})`" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NColumnGroup',
  props: {
    cols: {
      type: Number,
      required: true
    }
  },
  computed: {
    colIndexes () {
      const indexes = []
      for (let i = 0; i < this.col; ++i) {
        indexes.push(i + 1)
      }
      return indexes
    }
  }
}
</script>
