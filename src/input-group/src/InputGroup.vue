<template>
  <div class="n-input-group">
    <slot />
  </div>
</template>

<script>
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles'

export default {
  name: 'InputGroup',
  mixins: [configurable, themeable, withCssr(styles)]
}
</script>
