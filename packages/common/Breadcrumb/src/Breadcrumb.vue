<template>
  <div
    class="n-breadcrumb"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <slot />
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

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
