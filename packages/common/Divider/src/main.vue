<template>
  <div
    class="n-divider"
    :class="{
      'n-divider--vertical': vertical,
      'n-divider--no-content': !$slots.default,
      'n-divider--dashed': dashed,
      [`n-divider--content-position-${contentPosition}`]: $slots.default && contentPosition
    }"
  >
    <div
      v-if="!vertical"
      class="n-divider__line n-divider__line--left"
    />
    <div
      v-if="!vertical && $slots.default"
      class="n-divider__content"
    >
      <slot />
    </div>
    <div
      v-if="!vertical && $slots.default"
      class="n-divider__line n-divider__line--right"
    />
  </div>
</template>

<script>
export default {
  name: 'NDivider',
  props: {
    contentPosition: {
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
