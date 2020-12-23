<template>
  <div
    :class="{ [`n-${theme}-theme`]: theme }"
    class="n-base-loading"
    :style="{
      stroke
    }"
  >
    <n-icon-switch-transition>
      <svg
        v-if="show"
        key="loading"
        class="n-base-loading-circular n-base-loading__icon"
        :viewBox="`0 0 ${radius * 2} ${radius * 2}`"
      >
        <circle
          :style="{
            strokeWidth
          }"
          class="n-base-loading-circular-path"
          :cx="radius"
          :cy="radius"
          fill="none"
          :r="radius - strokeWidth / 2"
        />
      </svg>
      <div v-else key="placeholder" class="n-base-loading__placeholder">
        <slot />
      </div>
    </n-icon-switch-transition>
  </div>
</template>

<script>
import { NIconSwitchTransition } from '../../../_base'
import { withCssr } from '../../../_mixins'
import styles from './styles/'

export default {
  name: 'BaseLoading',
  components: {
    NIconSwitchTransition
  },
  mixins: [withCssr(styles)],
  props: {
    radius: {
      type: Number,
      default: 100
    },
    theme: {
      type: String,
      default: undefined
    },
    strokeWidth: {
      type: Number,
      default: 28
    },
    stroke: {
      type: String,
      default: undefined
    },
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>
