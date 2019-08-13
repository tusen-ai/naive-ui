<template>
  <span class="ts-sort-container">
    <n-icon
      type="md-arrow-dropdown"
      :style="{
        fontSize: fontSize,
        opacity: opacitys.downOpacity,
        transform: 'scale(0.8)'
      }"
      @click.native="changeDownSort()"
    />
    <n-icon
      type="md-arrow-dropup"
      :style="{
        fontSize: fontSize,
        opacity: opacitys.upOpacity,
        transform: 'scale(0.8)'
      }"
      @click.native="changeUpSort()"
    />
  </span>
</template>
<script>
// refer to https://github.com/TuSimple/infra-ecos-webui/blob/develop/src/components/SortIcon.vue
const computeOpacity = (val) => {
  let self = {}
  switch (val) {
    case 0:
      self.upOpacity = 0.3
      self.downOpacity = 0.3
      break
    case 1:
      self.upOpacity = 1
      self.downOpacity = 0.3
      break
    case -1:
      self.upOpacity = 0.3
      self.downOpacity = 1
  }
  return self
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
    }
  },
  data () {
    return {
      upOpacity: 0.3,
      downOpacity: 0.3
    }
  },
  computed: {
    opacitys () {
      let val = this.value
      return computeOpacity(val)
    }
  },
  mounted () {
    if (this.value !== 0) {
      this.setSort(this.value)
    }
    // this.setSort(this.value)
    // console.log('value', this.value, this.upOpacity, this.downOpacity)
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
    setSort (val) {
      this.$emit('input', val)
      this.$emit('onSortTypeChange', {
        i: this.index,
        sortable: this.column.sortable,
        key: this.column.key || this.index,
        type: val,
        column: this.column
      })
      // this.changeOpacity(val)
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
  color: #63e2b7 !important;
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
