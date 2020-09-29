<template>
  <div
    class="n-step"
    :class="{
      [`n-step--${syntheticStatus}`]: syntheticStatus !== null
    }"
  >
    <div class="n-step-indicator">
      <div
        class="n-step-indicator-slot"
      >
        <n-icon-switch-transition>
          <div
            v-if="!(syntheticStatus === 'finish' || syntheticStatus === 'error')"
            key="index"
            class="n-step-indicator-slot__index"
            :style="{
              color: syntheticStatus === 'process' ? ascendantBackgroundColor : null
            }"
          >
            {{ index }}
          </div>
          <n-icon
            v-else-if="syntheticStatus === 'finish'"
            key="finish"
          >
            <finished-icon />
          </n-icon>
          <n-icon
            v-else-if="syntheticStatus === 'error'"
            key="error"
          >
            <error-icon />
          </n-icon>
        </n-icon-switch-transition>
      </div>
      <div v-if="vertical" class="n-step-splitor" />
    </div>
    <div class="n-step-content">
      <div class="n-step-content-header">
        <div class="n-step-content-header__title">
          {{ title }}
        </div>
        <div v-if="!vertical" class="n-step-splitor" />
      </div>
      <div
        v-if="description !== null || $slots.default"
        class="n-step-content__description"
      >
        <slot>{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../icon'
import ErrorIcon from '../../_icons/md-close.vue'
import FinishedIcon from '../../_icons/md-checkmark.vue'
import themeable from '../../_mixins/themeable'

import NIconSwitchTransition from '../../_transition/IconSwitchTransition'
export default {
  name: 'Step',
  inject: {
    NSteps: {
      default: null
    }
  },
  components: {
    NIcon,
    FinishedIcon,
    ErrorIcon,
    NIconSwitchTransition
  },
  mixins: [
    themeable
  ],
  props: {
    status: {
      type: String,
      default: null,
      validator (value) {
        return ['process', 'finish', 'error', 'wait'].includes(value)
      }
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    index: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    ascendantBackgroundColor () {
      return this.NSteps.ascendantBackgroundColor
    },
    vertical () {
      return !!(this.NSteps && this.NSteps.vertical)
    },
    current () {
      return this.NSteps && this.NSteps.current
    },
    stepsStatus () {
      return this.NSteps && this.NSteps.status
    },
    syntheticStatus () {
      if (this.status) {
        return this.status
      } else if (this.index < this.current) {
        return 'finish'
      } else if (this.index === this.current) {
        return this.stepsStatus || 'process'
      } else if (this.index > this.current) {
        return 'wait'
      }
      return null
    }
  }
}
</script>
