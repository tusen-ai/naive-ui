<template>
  <filterIcon :status="filterStatus">
    <ul class="n-table-filter-item">
      <li
        v-for="(item, idx) in items"
        :key="item.value"
        :class="computeItemClass(item)"
        @click="handleSelect(item, idx)"
      >
        <span>{{ item.label }}</span>
        <n-icon
          v-show="checkedIndexs[item.value].isChecked === true"
          type="md-checkmark"
          size="14"
        />
      </li>
    </ul>
  </filterIcon>
</template>

<script>
import filterIcon from '../filterIcon'
import Vue from 'vue'

export default {
  components: {
    filterIcon
  },
  props: {
    filterItems: {
      type: Array,
      default: () => []
    },
    filterMultiple: {
      type: Boolean,
      default: false
    },
    filterKey: {
      type: [String, Number],
      required: true
    },
    filterFn: {
      type: [String, Function],
      default: 'custom'
    }
  },
  data () {
    const checkedIndexs = {}
    this.filterItems.forEach((item, index) => {
      checkedIndexs[item.value] = { isChecked: false, index }
    })
    return {
      // items,
      emitData: null,
      checkedIndexs
    }
  },
  computed: {
    filterStatus () {
      return !!this.emitData
    },
    // checkedIndexs (val, oldVal) {
    //   const checkedIndexs = {}
    //   this.filterItems.forEach((item) => {
    //     checkedIndexs[item.value] = false
    //   })
    //   return { checkedIndexs, ...oldVal }
    // },
    items () {
      let items = this.filterItems.map((item) => {
        return {
          ...item
          // isChecked: false
        }
      })
      return items
    }
  },
  watch: {
    checkedIndexs: {
      handler () {
        let res = []
        Object.keys(this.checkedIndexs).forEach((key) => {
          if (this.checkedIndexs[key].isChecked === true) {
            let index = this.checkedIndexs[key].index
            res.push(this.filterItems[index].value)
          }
        })
        res = res.length ? res : null
        this.emitData = res
        this.$emit('on-filter', { key: this.filterKey, value: res, filterFn: this.filterFn })
      },
      deep: true
    },
    filterItems () {
      const checkedIndexs = {}
      this.filterItems.forEach((item, index) => {
        checkedIndexs[item.value] = { isChecked: false, index }
      })
      this.checkedIndexs = { checkedIndexs, ...this.checkedIndexs }
    }
  },
  methods: {
    setCheckedIndexs (arr) {
      arr.forEach(value => {
        this.checkedIndexs[value].isChecked !== undefined && Vue.set(this.checkedIndexs[value], 'isChecked', true)
      })
    },
    reset () {
      Object.keys(this.checkedIndexs).forEach((key) => {
        this.checkedIndexs[key].isChecked = false
      })
      // this.items.forEach((item) => {
      //   item.isChecked = false
      // })
    },
    handleSelect (item, idx) {
      // single select
      let isChecked = this.checkedIndexs[item.value].isChecked
      !this.filterMultiple && this.reset()
      // this.checkedIndexs[item.value] = !isChecked
      Vue.set(this.checkedIndexs[item.value], 'isChecked', !isChecked)

      // this.checkedIndexs[item.value] = !isChecked

      // if (!this.filterMultiple) {
      //   if (this.checkedIndexs[item.value]) { emitData = item.value }
      // }
      // else {
      //   emitData = this.items.filter((item) => {
      //     return item.isChecked === true
      //   }).map(item => item.value)
      //   emitData = emitData.length ? emitData : null
      // }
      // this.emitData = emitData
      // this.$emit('on-filter', emitData)
    },
    computeItemClass (item) {
      return {
        'n-table-filter-item': true,
        'n-table-filter-item--selected': this.checkedIndexs[item.value].isChecked
      }
    }
  }
}
</script>

<style scoped>
.n-table-filter-item {
  margin: 0;
  padding: 0;
  border-radius: 6px;
}
.n-table-filter-item li:first-of-type {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.n-table-filter-item li:last-of-type {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.n-table-filter-item li {
  padding: 0 12px;
  height: 27px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-width: 154px;
  border-radius: 0;
  cursor: pointer;
}
.n-popup__content-wrapper li {
  font-size: 13px;
  height: 27px;
  line-height: 27px;
  box-sizing: border-box;
  padding: 0 12px;
  transition: all 0.3s;
  cursor: pointer;
}

.n-table-filter-item li:hover {
  background-color: rgba(96, 220, 178, 0.3);
}
.n-table-filter-item--selected {
  background-color: rgba(96, 220, 178, 0.3);
}
.n-table-filter-item--selected,
.n-table-filter-item--selected i {
  color: #63e2b7;
}
</style>
