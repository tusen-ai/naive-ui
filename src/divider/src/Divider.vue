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
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'Divider',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
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
