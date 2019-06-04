<template>
  <div class="nv-column-group">
    <div class="columns">
      <div
        v-for="index in cols"
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
  name: 'NvColumnGroup',
  props: {
    col: {
      type: Number,
      required: true
    }
  },
  computed: {
    cols () {
      const colIndexes = []
      for (let i = 0; i < this.col; ++i) {
        colIndexes.push(i + 1)
      }
      return colIndexes
    }
  }
}
</script>
