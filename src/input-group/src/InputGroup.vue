<template>
  <div class="n-input-group">
    <slot />
  </div>
</template>

<script>
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'InputGroup',
  mixins: [
    usecssr(styles)
  ]
}
</script>
