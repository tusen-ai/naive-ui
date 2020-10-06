<template>
  <template v-if="column.render">
    <render :render="() => column.render(row, index)" />
  </template>
  <template v-else>
    {{ row[column.key] }}
  </template>
</template>

<script>
import { render } from '../../../_utils/vue'

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
