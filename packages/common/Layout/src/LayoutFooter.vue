<template>
  <div
    class="n-layout-footer"
    :class="{
      [`n-layout-footer--${mode}-positioned`]: mode
    }"
  >
    <slot />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'

export default {
  name: 'NLayoutFooter',
  mixins: [ layoutModeMixin ]
}
</script>
