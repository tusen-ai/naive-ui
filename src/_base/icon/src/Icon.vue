<template>
  <i class="n-base-icon"><slot /></i>
</template>

<script>
import { defineComponent } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'BaseIcon',
  setup () {
    useStyle('BaseIcon', style)
  }
})
</script>
