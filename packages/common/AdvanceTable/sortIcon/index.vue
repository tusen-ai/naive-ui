<template>
  <span class="ts-sort-container">
    <n-icon
      type="md-arrow-dropdown"
      :style="{
        fontSize: fontSize,
        opacity: downOpacity,
        transform: 'scale(0.8)'
      }"
      @click.native="changeDownSort()"
    />
    <n-icon
      type="md-arrow-dropup"
      :style="{
        fontSize: fontSize,
        opacity: upOpacity,
        transform: 'scale(0.8)'
      }"
      @click.native="changeUpSort()"
    />
  </span>
</template>
<script>
// refer to https://github.com/TuSimple/infra-ecos-webui/blob/develop/src/components/SortIcon.vue
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
    }
  },
  data () {
    return {
      upOpacity: 0.3,
      downOpacity: 0.3
    }
  },
  watch: {
    value (val) {
      if (val !== null) { this.setSort(val) }
    }
  },
  mounted () {
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
      this.$emit('input', v)
    },
    changeUpSort () {
      let v = this.value

      if (v === 1) {
        v = 0
      } else {
        v = 1
      }
      this.$emit('input', v)
    },
    setSort (val) {
      let self = this
      this.$emit('onSortTypeChange', this.value)

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
