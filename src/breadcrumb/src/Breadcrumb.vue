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
  withCssr
} from '../../_mixins'
import styles from './styles'

export default {
  name: 'Breadcrumb',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
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
