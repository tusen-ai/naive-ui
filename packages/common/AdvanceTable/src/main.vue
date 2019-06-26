<template>
  <n-table>
    <n-thead>
      <n-tr>
        <n-th v-for="(column, i) in columns" :key="column.key"
          >{{ column.title }}
          <SortIcon
            v-if="column.sortable"
            v-model="sortIndexs[i]"
            class="table-head-icon"
            @onSortTypeChange="
              type =>
                onSortTypeChange(i, column.sortable, column.key, type, column)
            "
          />
          <filterIcon></filterIcon>
        </n-th>
      </n-tr>
    </n-thead>
    <n-tbody>
      <n-tr v-for="(rowData, i) in copyData" :key="i">
        <n-td v-for="column in columns" :key="column.key"
          ><row
            :index="i"
            :row="rowData"
            :keyName="column.key"
            :render="column.render"
          ></row
        ></n-td>
      </n-tr>
    </n-tbody>
  </n-table>
</template>

<script>
import row from '../row/index.jsx'
import SortIcon from '../sortIcon'
import filterIcon from '../filterIcon'

export default {
  name: 'NAdvanceTable',
  components: {
    row,
    SortIcon,
    filterIcon
  },
  props: {
    hoverColor: {
      default: '#323850',
      type: String
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data () {
      this.copyData = this.data.slice(0)
    }
  },
  data () {
    const sortIndexs = new Array(this.columns.length).fill(0)
    return { copyData: this.data.slice(0), sortIndexs }
  },
  methods: {
    onSortTypeChange (i, sortable, key, type, column) {
      if (sortable === 'custom') {
        this.$emit('on-sort-change', {
          key,
          type,
          column
        })
      } else if (sortable === true) {
        this.copyData = this.copyData.sort((a, b) => {
          return type >= 0
            ? ('' + a[key]).localeCompare('' + b[key])
            : ('' + b[key]).localeCompare('' + a[key])
        })
      }
      if (type !== 0) {
        this.sortIndexs = this.sortIndexs.map((item, idx) => {
          if (idx !== i) {
            return 0
          } else {
            return this.sortIndexs[idx]
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.ts-sort-container {
  display: inline-block;
  width: 14px;
  height: 12px;
  margin-top: -1px;
  cursor: pointer;
  position: relative;
}
</style>
