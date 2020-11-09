<template>
  <div class="n-input-group">
    <slot />
  </div>
</template>

<script>
import { withCssr } from '../../_mixins'
import styles from './styles'

export default {
  name: 'InputGroup',
  mixins: [
    withCssr(styles)
  ]
}
</script>
