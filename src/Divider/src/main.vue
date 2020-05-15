<template>
  <div
    class="n-divider"
    :class="{
      'n-divider--vertical': vertical,
      'n-divider--no-title': !$scopedSlots.default,
      'n-divider--dashed': dashed,
      [`n-divider--title-position-${titlePlacement}`]: $scopedSlots.default && titlePlacement,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <hr
      v-if="!vertical"
      class="n-divider__line n-divider__line--left"
    >
    <div
      v-if="!vertical && $scopedSlots.default"
      class="n-divider__title"
    >
      <slot />
    </div>
    <div
      v-if="!vertical && $scopedSlots.default"
      class="n-divider__line n-divider__line--right"
    />
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NDivider',
  mixins: [
    withapp,
    themeable
  ],
  props: {
    titlePlacement: {
      type: String,
      default: 'center'
    },
    dashed: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
