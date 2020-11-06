<template>
  <div
    class="n-breadcrumb"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
  >
    <slot />
  </div>
</template>

<script>
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles/index.js'

export default {
  name: 'Breadcrumb',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  provide () {
    return {
      NBreadcrumb: this
    }
  },
  props: {
    separator: {
      type: String,
      default: '/'
    }
  }
}
</script>
