<template>
  <div class="n-input-group">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useTheme } from '../../_mixins'
import { inputLight } from '../styles'
import style from './styles/input-group.cssr.js'

export default defineComponent({
  name: 'InputGroup',
  props: useTheme.props,
  setup (props) {
    useTheme('Input', 'InputGroup', style, inputLight, props)
  }
})
</script>
