<template>
  <div
    class="n-layout-content"
    :class="{
      [`n-layout-content--${mode}-positioned`]: mode
    }"
  >
    <slot />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'

export default {
  name: 'NLayoutContent',
  mixins: [ layoutModeMixin ]
}
</script>
