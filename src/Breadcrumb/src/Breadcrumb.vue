<template>
  <div
    class="n-breadcrumb"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <slot />
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NBreadcrumb',
  mixins: [withapp, themeable],
  provide () {
    return {
      NBreadcrumb: this
    }
  },
  props: {
    seperator: {
      type: String,
      default: '/'
    }
  }
}
</script>
