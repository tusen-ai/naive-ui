<template>
  <div
    class="n-cascader-submenu"
  >
    <n-scrollbar
      ref="scrollbarRef"
    >
      <n-cascader-option
        v-for="(option, index) in options"
        ref="options"
        :key="`${index}_${option.value}`"
        :option-id="option.id"
        :value="option.value"
        :active="option.active"
        :tracked="option.tracked"
        :label="option.label"
        :disabled="option.disabled"
        :children="option.children"
        :first-available-child-id="option.firstAvailableChildId"
        :next-available-sibling-id="option.nextAvailableSiblingId"
        :prev-available-sibling-id="option.prevAvailableSiblingId"
        :available-parent-id="option.availableParentId"
        :depth="option.depth"
        :type="option.type"
        :checked="option.checked"
        :is-leaf="option.isLeaf"
        :checkbox-checked="option.checkboxChecked"
        :checkbox-indeterminate="option.checkboxIndeterminate"
        :checked-leaf-count="option.checkedLeafCount"
        :leaf-count="option.leafCount"
        :has-checked-leaf="option.hasCheckedLeaf"
        :loaded="option.loaded"
        :determined="option.determined"
        :loading="option.loading"
      />
    </n-scrollbar>
  </div>
</template>

<script>
import { ref } from 'vue'
import NCascaderOption from './CascaderOption.vue'
import NScrollbar from '../../scrollbar'

export default {
  name: 'NCascaderSubmenu',
  inject: {
    NCascader: {
      default: null
    }
  },
  components: {
    NCascaderOption,
    NScrollbar
  },
  props: {
    depth: {
      type: Number,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  setup () {
    return {
      scrollbarRef: ref(null)
    }
  },
  computed: {
    theme () {
      return this.NCascader.mergedTheme
    }
  }
}
</script>
