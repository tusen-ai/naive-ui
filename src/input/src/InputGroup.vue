<template>
  <div class="n-input-group">
    <slot />
  </div>
</template>

<script>
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles/input-group'

export default {
  name: 'InputGroup',
  cssrName: 'Input',
  mixins: [configurable, themeable, withCssr(styles)]
}
</script>
