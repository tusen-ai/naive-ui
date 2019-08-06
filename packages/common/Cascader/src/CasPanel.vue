<template>
  <span
    ref="contentInner"
    style="display:inline-block;white-space:nowrap;"
  >
    <div
      v-if="data && data.length"
      class="n-cascader-menu n-cascader-menu--multiple n-cascader-menu--default-size"
    >
      <CasItem
        v-for="(item, index) in data"
        :key="index"
        :data="item"
        :name="isSelected(item,parent)"
        :selected="!!selected[isSelected(item)]"
        :class="{
          'n-cascader-menu__item--active':
            activeLabel ===
            item.label
        }"
        @click.native.stop="selectItem(item, $event)"
      />
    </div>
    <CasPanel
      v-if="subList && subList.length"
      :data="subList"
      :parent="parentLabel"
      :selected="selected"
      @changeSelect="changeSelect"
    />
  </span>
</template>
<script>
import CasItem from './CasItem.vue'

export default {
  name: 'CasPanel',
  components: {
    CasItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    parent: {
      type: String,
      default: ''
    },
    selected: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      subList: [],
      activeLabel: '',
      click: false,
      parentLabel: this.parent
    }
  },
  computed: {
    isSelected () {
      return function (item, parentl) {
        let val = ''
        if (this.click) {
          if (this.parent) {
            val = this.parent + '/' + item.label
          }
        } else {
          if (this.parent) {
            let index = this.parent.indexOf(item.label)
            val = this.parent.substring(index) === item.label ? this.parent : this.parent + '/' + item.label
          } else {
            val = item.label
          }
        }
        return val
      }
    }

  },
  watch: {
    parent () {
      this.parentLabel = this.parent
    },
    data () {
      this.subList = []
    }
  },
  methods: {
    selectItem (item, event) {
      if (item.children && item.children.length) {
        this.activeLabel = item.label
        this.subList = item.children
        this.parentLabel = this.parent ? this.parent + '/' + item.label : item.label
      } else {
        this.activeLabel = ''
        this.subList = []
        let result = this.parent ? this.parent + '/' + item.label : item.label
        this.parentLabel = this.parent ? this.parent : item.label
        this.$set(this.selected, result, !this.selected[result])
        this.changeSelect(result)
        this.click = true
      }
    },
    changeSelect (val) {
      this.$emit('changeSelect', val)
    }
  }
}
</script>
