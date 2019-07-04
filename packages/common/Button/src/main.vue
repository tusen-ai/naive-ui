<template>
  <div
    class="n-button"
    :class="{
      'is-round': round,
      [`is-${type}`]: true,
      [`n-button--${size}-size`]: true
    }"
    v-on="$listeners"
  >
    <div
      v-if="icon && !iconOnRight"
      class="n-button__icon"
    >
      <n-icon :type="icon" />
    </div>
    <div
      class="n-button__content"
      :style="style"
    >
      <slot />
    </div>
    <div
      v-if="icon && iconOnRight"
      class="n-button__icon n-button__icon--right"
    >
      <n-icon :type="icon" />
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'

export default {
  name: 'NButton',
  components: {
    NIcon
  },
  props: {
    size: {
      type: String,
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: null
    },
    iconOnRight: {
      type: Boolean,
      default: false
    },
    autoTextColor: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      style: {}
    }
  },
  mounted () {
    if (this.autoTextColor) {
      let cursor = this.$el
      while (cursor.parentElement) {
        cursor = cursor.parentElement
        const backgroundColor = getComputedStyle(cursor).backgroundColor
        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
          this.style = {
            color: backgroundColor
          }
          break
        }
      }
    }
  }
}
</script>
