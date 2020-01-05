<template>
  <span v-if="column.render" :title="title">
    <render :render="(h) => column.render(h, row, index)" />
  </span>
  <span v-else :title="title">
    {{ row[column.key] }}
  </span>
</template>

<script>
import render from '../../../utils/render'

export default {
  name: 'NDataTableCell',
  components: {
    render
  },
  props: {
    row: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: null
    }
  }
}
</script>
