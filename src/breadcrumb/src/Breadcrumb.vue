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
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index.js'

export default {
  name: 'Breadcrumb',
  mixins: [withapp, themeable, usecssr(styles)],
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
