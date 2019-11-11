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
  let self = {}
  switch (val) {
    case 0:
      self.upOpacity = 0.4
      self.downOpacity = 0.4
      break
    case 1:
      self.upOpacity = 1
      self.downOpacity = 0.4
      break
    case -1:
      self.upOpacity = 0.4
      self.downOpacity = 1
      break
    case null:
      self.upOpacity = 0.4
      self.downOpacity = 0.4
      break
  }
  return self
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
      let val = this.value
      return computeOpacity(val)
    }
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
