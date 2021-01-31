import { defineComponent, PropType } from 'vue'
import { TableColumnInfo, TableNode } from '../interface'

export default defineComponent({
  name: 'DataTableCell',
  props: {
    row: {
      type: Object as PropType<TableNode>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    column: {
      type: Object as PropType<TableColumnInfo>,
      required: true
    }
  },
  render () {
    const {
      column: { render, key },
      row
    } = this
    if (render) {
      return render(row, this.index)
    }
    return row[key]
  }
})
