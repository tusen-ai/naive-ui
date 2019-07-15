<template>
  <filterIcon
    :status="filterStatus"
  >
    <ul class="n-table-filter-item">
      <li
        v-for="(item, idx) in items"
        :key="item.value"
        :class="computeItemClass(item)"
        @click="handleSelect(item,idx)"
      >
        <span>{{ item.label }}</span>
        <n-icon
          v-show="item.isChecked"
          type="md-checkmark"
          size="14"
        />
      </li>
    </ul>
  </filterIcon>
</template>

<script>
import filterIcon from '../filterIcon'

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
    }
  },
  data () {
    let items = this.filterItems.map((item) => {
      return {
        ...item,
        isChecked: false
      }
    })
    return {
      items,
      emitData: null

    }
  },
  computed: {
    filterStatus () {
      return !!this.emitData
    }
  },
  methods: {
    reset () {
      this.items.forEach((item) => {
        item.isChecked = false
      })
    },
    handleSelect (item, idx) {
      // single select
      let isChecked = item.isChecked
      !this.filterMultiple && this.reset()
      this.items[idx].isChecked = !isChecked
      let emitData = null
      if (!this.filterMultiple) {
        if (item.isChecked) { emitData = item.value }
      } else {
        emitData = this.items.filter((item) => {
          return item.isChecked === true
        }).map(item => item.value)
        emitData = emitData.length ? emitData : null
      }
      this.emitData = emitData
      console.log('filter select', emitData)
      this.$emit('on-filter', emitData)
    },
    computeItemClass (item) {
      return {
        'n-table-filter-item': true,
        'n-table-filter-item--selected': item.isChecked
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
.n-table-filter-item li{
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
  transition: all .3s;
  cursor: pointer;
}

.n-table-filter-item li:hover{
  background-color: rgba(96,220,178,0.3);
}
.n-table-filter-item--selected{
  background-color:rgba(96,220,178,0.3);
}
.n-table-filter-item--selected,.n-table-filter-item--selected i {
  color: #63E2B7;
}
</style>
