<template>
  <!-- table body -->
  <n-table
    :style="tableStl"
    style="border-top-left-radius:0;border-top-right-radius:0;"
    @scroll.native="onBodyScrolll"
  >
    <colgroup v-if="showingData.length !== 0">
      <col
        v-for="(column, i) in columns"
        :key="i"
        :style="computeCustomWidthStl(column)"
      >
    </colgroup>
    <n-tbody v-show="!loading">
      <n-tr
        v-for="(rowData, i) in showingData"
        :key="i"
        :class="
          typeof rowClassName === 'function'
            ? rowClassName(rowData, i)
            : rowClassName
        "
      >
        <template v-for="column in columns">
          <!-- fixed列不显示 -->
          <n-td v-if="column.fixed" :key="column.key">
            <i />
          </n-td>
          <n-td
            v-else
            :key="column.key"
            :style="computeAlign(column)"
            :class="computeTdClass(column, rowData)"
          >
            <!-- 批量选择 -->
            <n-checkbox
              v-if="
                column.type === 'selection' &&
                  (column.disabled && !column.disabled(rowData, i))
              "
              v-model="checkBoxes[rowData._index]"
            />
            <n-checkbox
              v-else-if="
                column.type === 'selection' &&
                  (column.disabled && column.disabled(rowData, i))
              "
              v-model="disabledCheckBox[rowData._index]"
              :disabled="!(disabledCheckBox[rowData._index] = false)"
            />
            <n-checkbox
              v-else-if="column.type === 'selection'"
              v-model="checkBoxes[rowData._index]"
            />
            <row
              v-else
              :index="i"
              :row="rowData"
              :key-name="column.key"
              :render="column.render"
            />
          </n-td>
        </template>
      </n-tr>
      <div v-if="showingData.length === 0" class="n-advance-table__no-data-tip">
        No data
      </div>
    </n-tbody>
    <template v-if="loading">
      <n-spin :spinning="loading" style="width:100%;display:table-caption;" />
    </template>
  </n-table>
</template>

<script>
import row from '../row/index.js'

export default {
  components: {
    row
  },
  props: {
    tableStl: {},
    showingData: {},
    columns: {},
    rowClassName: {},
    checkBoxes: {},
    disabledCheckBox: {},
    headerRefName: {},
    loading: {}
  },
  data () {
    return {}
  },
  mounted () {
    if (this.headerRefName) {
      let headerRef = this.$parent.$refs[this.headerRefName]
      this.headerRealEl = headerRef.$el.querySelector('thead')
    }
  },
  methods: {
    computeCustomWidthStl (column) {
      if (column.width) {
        let width = column.width
        return {
          width: width + 'px',
          'padding-right': this.scrollBarWidth + 'px'
          // minWidth: width + 'px'
        }
      } else if (column.type === 'selection') {
        let width = 60
        return {
          width: width + 'px',
          'padding-right': this.scrollBarWidth + 'px'
          // minWidth: width + 'px'
        }
      }
      return null
    },
    computeAlign (column) {
      if (column.align) {
        return {
          'text-align': column.align
        }
      }
    },
    computeTdClass (column, params) {
      let className = []
      if (column.ellipsis) {
        className.push('n-advanced-table__td-text--ellipsis')
      }
      if (!column.className) {
        return className
      }
      if (typeof column.className === 'string') {
        className.push(column.className)
      } else if (typeof column.className === 'function') {
        className.push(column.className(params))
      }
      // console.log(className)
      return className
    },
    onBodyScrolll (event) {
      this.headerRealEl.style.transform = `translate3d(-${event.target.scrollLeft}px,0,0)`
      event.stopPropagation()
    }
  }
}
</script>

<style>
</style>
