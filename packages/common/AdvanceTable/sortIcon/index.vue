<template>
  <span class="ts-sort-container">
    <n-icon
      type="md-arrow-dropdown"
      :style="{
        fontSize: fontSize,
        opacity: opacitys.downOpacity,
        transform: 'scale(0.8)'
      }"
      @click.stop="changeDownSort()"
    />
    <n-icon
      type="md-arrow-dropup"
      :style="{
        fontSize: fontSize,
        opacity: opacitys.upOpacity,
        transform: 'scale(0.8)'
      }"
      @click.stop="changeUpSort()"
    />
  </span>
</template>
<script>
// refer to https://github.com/TuSimple/infra-ecos-webui/blob/develop/src/components/SortIcon.vue
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
  props: {
    fontSize: {
      type: String,
      default: '12px'
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
  margin-top: -1px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
}
.ts-sort-container i:first-child {
  top: 0;
}
.ts-sort-container i {
  display: block;
  height: 19px;
  position: absolute;
  transition: color 0.2s ease-in-out;
  font-size: 19px !important;
  font-weight: 400;
  vertical-align: middle;
}
.ts-sort-container i:last-child {
  bottom: 0;
}
.ts-sort-container i:hover {
  opacity: 1 !important;
}
</style>
