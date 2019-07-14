<template>
  <n-popover
    trigger="hover"
    :arrow="arrow"
    :placement="placement"
  >
    <template v-slot:activator>
      <slot name="activator" />
    </template>
    <div class="n-tooltip__content">
      <slot />
    </div>
  </n-popover>
</template>

<script>
/**
 * Tooltip: popover wearing waistcoat
 */
import NPopover from '../../Popover'

export default {
  name: 'NTooltip',
  components: {
    NPopover
  },
  props: {
    arrow: {
      type: Boolean,
      default: false
    },
    placement: {
      validator (value) {
        return [
          'top',
          'bottom',
          'left',
          'right',
          'top-start',
          'top-end',
          'left-start',
          'left-end',
          'right-start',
          'right-end',
          'bottom-start',
          'bottom-end'
        ].includes(value)
      },
      default: 'bottom'
    }
  }
}
</script>
