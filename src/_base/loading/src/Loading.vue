<template>
  <div
    :class="{[`n-${theme}-theme`]: theme}"
    class="n-base-loading"
    :style="{
      stroke
    }"
  >
    <svg
      class="n-base-loading-circular"
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
        :r="radius - (strokeWidth) / 2"
      />
    </svg>
  </div>
</template>

<script>
import { withCssr } from '../../../_mixins'
import styles from './styles/'

export default {
  name: 'BaseLoading',
  mixins: [
    withCssr(styles)
  ],
  props: {
    radius: {
      type: Number,
      default: 100
    },
    theme: {
      type: String,
      default: ''
    },
    strokeWidth: {
      type: Number,
      default: 28
    },
    stroke: {
      type: String,
      default: null
    }
  }
}
</script>
