<template>
  <span class="ts-sort-container">
    <n-icon
      :size="fontSize"
      :style="{
        opacity: opacitys.downOpacity
      }"
      @click.stop="changeDownSort()"
    >
      <md-arrow-dropdown />
    </n-icon>
    <n-icon
      type="md-arrow-dropup"
      :size="fontSize"
      :style="{
        opacity: opacitys.upOpacity
      }"
      @click.stop="changeUpSort()"
    >
      <md-arrow-dropup />
    </n-icon>
  </span>
</template>
<script>
// refer to https://github.com/TuSimple/infra-ecos-webui/blob/develop/src/components/SortIcon.vue
import mdArrowDropdown from 'naive-ui/lib/icons/md-arrow-dropdown'
import mdArrowDropup from 'naive-ui/lib/icons/md-arrow-dropup'

const computeOpacity = val => {
  let upOpacity = 0.4
  let downOpacity = 0.4

  switch (val) {
    case 1:
      upOpacity = 1
      downOpacity = 0.4
      break
    case -1:
      upOpacity = 0.4
      downOpacity = 1
      break
  }
  return {
    downOpacity,
    upOpacity
  }
}
export default {
  name: 'SortIcon',
  components: {
    mdArrowDropdown,
    mdArrowDropup
  },
  props: {
    fontSize: {
      type: Number,
      default: 17
    },
    value: {
      type: Number,
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
    currentKey: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      upOpacity: 0.4,
      downOpacity: 0.4
    }
  },
  computed: {
    opacitys () {
      const normalOpacity = 0.4
      if (this.currentKey !== this.column.key) {
        return {
          upOpacity: normalOpacity,
          downOpacity: normalOpacity
        }
      }
      let val = this.value
      console.log(this.currentKey)
      return computeOpacity(val)
    }
  },
  watch: {
    // value (val, pldVal) {
    //   if (val !== null) {
    //     console.log('from watch', val, pldVal)
    //     const sorter = {
    //       i: this.index,
    //       sortable: this.column.sortable,
    //       key: this.column.key || this.index,
    //       type: val,
    //       column: this.column
    //     }
    //     this.$emit('on-sort-change', val, this.column, sorter)
    //   }
    // }
  },
  mounted () {
    if (this.value !== 0 && this.value !== null) {
      this.setSort(this.value)
    }
  },
  methods: {
    changeDownSort () {
      let v = this.value
      if (v === -1) {
        v = 0
      } else {
        v = -1
      }
      this.setSort(v)
    },
    changeUpSort () {
      let v = this.value

      if (v === 1) {
        v = 0
      } else {
        v = 1
      }
      this.setSort(v)
    },
    changeSort () {
      if (this.value === 0 || this.value === null) {
        this.setSort(1)
      } else if (this.value === 1) {
        this.setSort(-1)
      } else {
        this.setSort(0)
      }
    },
    setSort (val) {
      const sorter = {
        i: this.index,
        sortable: this.column.sortable,
        key: this.column.key || this.index,
        type: val,
        column: this.column
      }
      this.$emit('input', val, this.column, sorter)
    }
  }
}
</script>

<style scoped>
.ts-sort-container {
  display: inline-block;
  width: 14px;
  height: 12px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  top: 1px;
}
.ts-sort-container i:first-child {
  top: 0;
}
.ts-sort-container i {
  display: block;
  height: 19px;
  position: absolute;
  transition: color 0.2s ease-in-out;
  font-weight: 400;
}
.ts-sort-container i:last-child {
  bottom: 0;
}
.ts-sort-container i:hover {
  opacity: 1 !important;
}
</style>
