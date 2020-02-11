<template>
  <div
    class="n-cascader-submenu"
    @mouseleave="handleMouseLeave"
  >
    <n-scrollbar ref="scrollbar">
      <transition name="n-cascader-light-bar-transition">
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
    depth: {
      type: Number,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    menuIsLoading: {
      type: Boolean,
      default: false
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
      this.$emit('option-mouseenter', e, option)
    },
    handleOptionMouseLeave (e, option) {
      this.$emit('option-mouseleave', e, option)
    },
    handleOptionClick (e, option) {
      this.$emit('option-click', e, option)
    },
    handleMouseLeave (e) {
      this.hideLightBar()
    },
    handleOptionCheck (option) {
      this.$emit('option-check', option.id)
    }
  }
}
</script>
