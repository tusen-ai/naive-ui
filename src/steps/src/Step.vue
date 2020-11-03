<template>
  <div
    class="n-step"
    :class="{
      [`n-step--${mergedStatus}`]: mergedStatus
    }"
  >
    <div class="n-step-indicator">
      <div
        class="n-step-indicator-slot"
      >
        <n-icon-switch-transition>
          <div
            v-if="!(mergedStatus === 'finish' || mergedStatus === 'error')"
            key="index"
            class="n-step-indicator-slot__index"
          >
            {{ index }}
          </div>
          <n-icon
            v-else-if="mergedStatus === 'finish'"
            key="finish"
          >
            <finished-icon />
          </n-icon>
          <n-icon
            v-else-if="mergedStatus === 'error'"
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
        v-if="description !== undefined || $slots.default"
        class="n-step-content__description"
      >
        <slot>{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../icon'
import {
  CheckmarkIcon as FinishedIcon,
  CloseIcon as ErrorIcon
} from '../../_base/icons'
import { themeable } from '../../_mixins'

import NIconSwitchTransition from '../../_transition/IconSwitchTransition'
export default {
  name: 'Step',
  components: {
    NIcon,
    FinishedIcon,
    ErrorIcon,
    NIconSwitchTransition
  },
  mixins: [
    themeable
  ],
  inject: {
    NSteps: {
      default: null
    }
  },
  props: {
    status: {
      type: String,
      default: undefined,
      validator (value) {
        return ['process', 'finish', 'error', 'wait'].includes(value)
      }
    },
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    index: {
      type: [Number, String],
      default: undefined
    }
  },
  computed: {
    vertical () {
      return !!(this.NSteps && this.NSteps.vertical)
    },
    current () {
      return this.NSteps && this.NSteps.current
    },
    stepsStatus () {
      return this.NSteps && this.NSteps.status
    },
    mergedStatus () {
      if (this.status) {
        return this.status
      } else if (this.index < this.current) {
        return 'finish'
      } else if (this.index === this.current) {
        return this.stepsStatus || 'process'
      } else if (this.index > this.current) {
        return 'wait'
      }
      return undefined
    }
  }
}
</script>
