<template>
  <n-base-icon
    class="n-base-close"
    :class="{
      'n-base-close--disabled': disabled
    }"
  >
    <close-icon />
  </n-base-icon>
</template>

<script>
import { defineComponent } from 'vue'
import { useStyle } from '../../../_mixins'
import NBaseIcon from '../../icon'
import { CloseIcon } from '../../icons'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'BaseClose',
  components: {
    NBaseIcon,
    CloseIcon
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    useStyle('BaseClose', style)
  }
})
</script>
