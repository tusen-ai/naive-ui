<template>
  <div
    :class="[
      'n-base-clear-button',
      {
        [`n-${theme}-theme`]: theme
      }
    ]"
  >
    <n-icon-switch-transition>
      <n-icon
        v-if="show"
        key="dismiss"
        :theme="null"
        :depth="null"
        class="n-base-clear-button__clear"
        @click="onClear"
        @mousedown.prevent
      >
        <dismiss-circle-icon />
      </n-icon>
      <div v-else key="icon" class="n-base-clear-button__placeholder">
        <slot />
      </div>
    </n-icon-switch-transition>
  </div>
</template>

<script>
import { DismissCircleIcon } from '../../icons'
import { NIcon } from '../../../icon'
import { NIconSwitchTransition } from '../../../_base'
import { withCssr } from '../../../_mixins'
import styles from './styles'

export default {
  name: 'BaseClearButton',
  components: {
    NIcon,
    DismissCircleIcon,
    NIconSwitchTransition
  },
  mixins: [withCssr(styles)],
  props: {
    theme: {
      type: String,
      default: undefined
    },
    show: {
      type: Boolean,
      default: false
    },
    onClear: {
      type: Function,
      default: undefined
    }
  }
}
</script>
