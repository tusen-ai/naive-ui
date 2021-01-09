<template>
  <div class="n-input-group">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStyle } from '../../_mixins'
import style from './styles/input-group.cssr.js'

export default defineComponent({
  name: 'InputGroup',
  setup (props) {
    useStyle('InputGroup', style)
  }
})
</script>
