<template>
  <div
    class="n-step"
    :class="{
      'n-step--finished': finished,
      'n-step--active': active,
      [`n-step--${status}`]: status !== null
    }"
  >
    <div class="n-step__splitor n-step__splitor--left" />
    <div class="n-step-indicator">
      <transition name="n-step-indicator--transition">
        <div
          v-if="finished && finishStatus !== 'process'"
          class="n-step-indicator__icon"
        >
          <n-icon
            v-if="status === 'success'"
            type="md-checkmark"
          />
          <n-icon
            v-else-if="status === 'error'"
            type="md-close"
          />
        </div>
      </transition>
      <transition name="n-step-indicator--transition">
        <div
          v-if="!finished || (finished && finishStatus === 'process')"
          class="n-step-indicator__index"
          :class="{
            'simulate-transparent-text': active
          }"
        >
          {{ index }}
        </div>
      </transition>
    </div>
    <div class="n-step-content">
      <div class="n-step-content__title">
        <div class="n-step-content__title-inner">
          {{ title }}
        </div><div class="n-step__splitor n-step__splitor--right" />
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

export default {
  name: 'NStep',
  components: {
    NIcon
  },
  mixins: [hollowoutable],
  props: {
    finishStatus: {
      type: String,
      default: 'success',
      validator (finishStatus) {
        return ['process', 'success', 'error'].includes(finishStatus)
      }
    },
    currentStatus: {
      type: String,
      default: 'process',
      validator (currentStatus) {
        return ['process', 'success', 'error'].includes(currentStatus)
      }
    },
    finished: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
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
    status () {
      if (this.finished) {
        return this.finishStatus
      } else if (this.active) {
        return this.currentStatus
      } else {
        return null
      }
    }
  }
}
</script>
