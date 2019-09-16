<template>
  <div
    class="n-dropdown-item"
    :class="{
      'n-dropdown-item--with-arrow': arrow
    }"
    @mouseenter="handleMouseEnter"
    @click="handleClick"
  >
    <span>
      <slot />
    </span>
    <div
      v-if="arrow"
      class="n-dropdown-item__arrow"
    >
      <n-icon type="ios-arrow-forward" />
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'
import bubblecallable from '../../../mixins/bubblecallable'

export default {
  inject: ['NDropdownController'],
  name: 'NDropdownItem',
  components: {
    NIcon
  },
  mixins: [bubblecallable],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleMouseEnter (e) {
      if (!(
        this.$parent &&
        this.$parent.$options.name === 'NDropdownSubmenu' &&
        this.$parent.$refs.activator &&
        this.$parent.$refs.activator.contains(this.$el)
      )) {
        this.bubbleCall(['NDropdownMenu', 'NDropdownSubmenu'], 'updateLightBarPosition', this.$el)
      }
    },
    handleClick (e) {
      if (!(
        this.$parent &&
        this.$parent.$options.name === 'NDropdownSubmenu' &&
        this.$parent.$refs.activator &&
        this.$parent.$refs.activator.contains(this.$el)
      )) {
        this.NDropdownController.hide()
      }
      this.$emit('click', e)
    }
  }
}
</script>
