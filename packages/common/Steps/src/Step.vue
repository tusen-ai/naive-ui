<template>
  <div
    class="n-step"
    :class="{
      [`n-step--${synthesizedStatus}`]: synthesizedStatus !== null
    }"
  >
    <div class="n-step-indicator">
      <transition name="n-step-indicator--transition">
        <div
          v-if="synthesizedStatus === 'finish' || synthesizedStatus === 'error'"
          class="n-step-indicator__icon"
        >
          <n-icon
            v-if="synthesizedStatus === 'finish'"
          >
            <md-checkmark />
          </n-icon>
          <n-icon
            v-else-if="synthesizedStatus === 'error'"
          >
            <md-close />
          </n-icon>
        </div>
      </transition>
      <transition name="n-step-indicator--transition">
        <div
          v-if="!(synthesizedStatus === 'finish' || synthesizedStatus === 'error')"
          class="n-step-indicator__index"
          :style="{
            color: synthesizedStatus === 'process' ? ascendantBackgroundColor : null
          }"
        >
          {{ index }}
        </div>
      </transition>
    </div>
    <div class="n-step-content">
      <div class="n-step-content-title">
        <div class="n-step-content-title__inner">
          {{ title }}
        </div>
        <div class="n-step-splitor n-step-splitor--right" />
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
import hollowoutable from '../../../mixins/hollowoutable'
import mdClose from '../../../icons/md-close'
import mdCheckmark from '../../../icons/md-checkmark'

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
    mdClose
  },
  mixins: [hollowoutable],
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
