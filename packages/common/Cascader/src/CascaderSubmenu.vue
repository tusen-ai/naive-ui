<template>
  <div
    class="n-cascader-submenu"
    @mouseleave="handleMouseLeave"
  >
    <n-scrollbar ref="scrollbar">
      <transition name="n-cascader-light-bar--transition">
        <div
          v-if="showLightBar"
          class="n-cascader-light-bar-container"
        >
          <div
            class="n-cascader-light-bar"
            :style="{ top: `${lightBarTop}px` }"
          />
        </div>
      </transition>
      <n-cascader-option
        v-for="(option, index) in options"
        :id="option.id"
        ref="options"
        :key="`${index}_${option.value}`"
        :value="option.value"
        :active="option.active"
        :traced="option.traced"
        :label="option.label"
        :disabled="option.disabled"
        :children="option.children"
        :prev-sibling="option.prevSibling"
        :next-sibling="option.nextSibling"
        :parent="option.parent"
        :depth="option.depth"
        :type="option.type"
        :checked="option.checked"
        :checked-leaf-count="option.checkedLeafCount"
        :leaf-count="option.leafCount"
        :is-leaf="option.isLeaf"
        :checkbox-checked="option.checkboxChecked"
        :checkbox-indeterminate="option.checkboxIndeterminate"
        :has-children="option.hasChildren"
        @check="handleOptionCheck"
        @click="handleOptionClick"
        @mouseenter="handleOptionMouseEnter"
        @mouseleave="handleOptionMouseLeave"
      />
    </n-scrollbar>
  </div>
</template>

<script>
import NCascaderOption from './CascaderOption.vue'
import NScrollbar from '../../Scrollbar'
import withlightbar from '../../../mixins/withlightbar'

export default {
  name: 'NCascaderSubmenu',
  components: {
    NCascaderOption,
    NScrollbar
  },
  mixins: [withlightbar],
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      active: true
    }
  },
  methods: {
    handleOptionMouseEnter (e, option) {
      if (!option.disabled) {
        this.updateLightBarPosition(e.target)
      }
      this.$emit('option-mouseenter', e, option, this)
    },
    handleOptionMouseLeave (e, option) {
      this.$emit('option-mouseleave', e, option, this)
    },
    handleOptionClick (e, option) {
      this.$emit('option-click', e, option, this)
    },
    handleMouseLeave (e) {
      this.hideLightBar()
    },
    handleOptionCheck (option) {
      this.$emit('option-check', option)
    }
  }
}
</script>
