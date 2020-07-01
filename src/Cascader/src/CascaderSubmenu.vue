<template>
  <div
    class="n-cascader-submenu"
    @mouseleave="handleMouseLeave"
  >
    <n-scrollbar ref="scrollbar">
      <n-base-tracking-rect
        ref="trackingRect"
        :theme="theme"
        :item-size="itemSize"
      />
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
import NBaseTrackingRect from '../../_base/tracking-rect'
import debounce from 'lodash-es/debounce'
import { itemSize } from '../../_styles-in-js/common'

export default {
  name: 'NCascaderSubmenu',
  inject: {
    NCascader: {
      default: null
    }
  },
  components: {
    NCascaderOption,
    NScrollbar,
    NBaseTrackingRect
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
    menuIsLoading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data () {
    return {
      active: true
    }
  },
  computed: {
    theme () {
      return this.NCascader.syntheticTheme
    },
    itemSize () {
      return itemSize[this.size] || itemSize.medium
    }
  },
  methods: {
    handleOptionMouseEnter (e, option) {
      if (!option.disabled) {
        this.updateTrackingRectPosition(e)
      }
      this.$emit('option-mouseenter', e, option)
    },
    updateTrackingRectPosition: debounce(function (e) {
      const trackingRect = this.$refs.trackingRect
      trackingRect && trackingRect.updateTrackingRectTop(e.target)
    }, 64),
    handleOptionMouseLeave (e, option) {
      this.$emit('option-mouseleave', e, option)
    },
    handleOptionClick (e, option) {
      this.$emit('option-click', e, option)
    },
    handleMouseLeave: debounce(function (e) {
      const trackingRect = this.$refs.trackingRect
      trackingRect && trackingRect.hideTrackingRect()
    }, 64),
    handleOptionCheck (option) {
      this.$emit('option-check', option.id)
    }
  }
}
</script>
