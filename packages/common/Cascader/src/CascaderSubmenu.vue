<template>
  <div
    class="n-cascader-submenu"
    tabindex="0"
    @mouseleave="handleMouseLeave"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.left="handleKeyUpLeft"
    @keyup.right="handleKeyUpRight"
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
        @click="handleOptionClick"
        @mouseenter="handleOptionMouseEnter"
        @mouseleave="handleOptionMouseLeave"
      />
    </n-scrollbar>
  </div>
</template>

<script>
import NCascaderOption from './CasOption.vue'
import NScrollbar from '../../Scrollbar'
import withlightbar from '../../../mixins/withlightbar'

export default {
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
    handleKeyUpUp () {
      this.$emit('menu-keyup-up', this)
    },
    handleKeyUpDown () {
      this.$emit('menu-keyup-down', this)
    },
    handleKeyUpLeft () {
      this.$emit('menu-keyup-left', this)
    },
    handleKeyUpRight () {
      this.$emit('menu-keyup-right', this)
    }
  }
}
</script>
