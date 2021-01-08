<template>
  <div
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
        :viewBox="`0 0 ${(radius * 2) / scale} ${(radius * 2) / scale}`"
      >
        <circle
          :style="{
            strokeWidth
          }"
          class="n-base-loading-circular-path"
          :cx="radius / scale"
          :cy="radius / scale"
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
import { defineComponent } from 'vue'
import { NIconSwitchTransition } from '../../../_base'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'BaseLoading',
  components: {
    NIconSwitchTransition
  },
  props: {
    scale: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default: 100
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
  },
  setup () {
    useStyle('BaseLoading', style)
  }
})
</script>
