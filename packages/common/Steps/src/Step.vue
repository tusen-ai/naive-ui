<template>
  <div
    class="n-step"
    :class="{
      [`n-step--${synthesizedStatus}`]: synthesizedStatus !== null
    }"
  >
    <div class="n-step-indicator">
      <div
        class="n-step-indicator-slot"
      >
        <n-icon-switch-transition>
          <div
            v-if="!(synthesizedStatus === 'finish' || synthesizedStatus === 'error')"
            key="index"
            class="n-step-indicator-slot__index"
            :style="{
              color: synthesizedStatus === 'process' ? ascendantBackgroundColor : null
            }"
          >
            {{ index }}
          </div>
          <n-icon
            v-else-if="synthesizedStatus === 'finish'"
            key="finish"
          >
            <md-checkmark />
          </n-icon>
          <n-icon
            v-else-if="synthesizedStatus === 'error'"
            key="error"
          >
            <md-close />
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
        v-if="description !== null"
        class="n-step-content__description"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'
import mdClose from '../../../icons/md-close'
import mdCheckmark from '../../../icons/md-checkmark'
import themeable from '../../../mixins/themeable'
import hollowoutable from '../../../mixins/hollowoutable'
import NIconSwitchTransition from '../../../transition/IconSwitchTransition'

export default {
  name: 'NStep',
  inject: {
    NSteps: {
      default: null
    }
  },
  components: {
    NIcon,
    mdCheckmark,
    mdClose,
    NIconSwitchTransition
  },
  mixins: [ themeable, hollowoutable ],
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
    subtitle: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    index: {
      type: [Number, String],
      default: null
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
    synthesizedStatus () {
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
