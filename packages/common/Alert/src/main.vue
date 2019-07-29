<template>
  <div
    class="n-alert"
    :class="{
      [`n-alert--${type}`]: true,
      'n-alert--no-icon': noIcon
    }"
  >
    <div
      v-if="!noIcon"
      class="n-alert__icon"
    >
      <slot
        v-if="$slots.icon"
        name="icon"
      />
      <n-icon
        v-else-if="icon"
        :type="icon"
      />
      <n-icon
        v-else-if="type==='success'"
        :type="'ios-checkmark-circle'"
      />
      <n-icon
        v-else-if="type==='info'"
        :type="'ios-information-circle'"
      />
      <n-icon
        v-else-if="type==='warning'"
        :type="'ios-alert'"
      />
      <n-icon
        v-else-if="type==='error'"
        :type="'ios-close-circle'"
      />
    </div>
    <div class="n-alert__body-wrapper">
      <div
        v-if="title !== null"
        class="n-alert__title"
      >
        {{ title }}
      </div>
      <div class="n-alert__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'
export default {
  name: 'NAlert',
  components: {
    NIcon
  },
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    type: {
      validator (type) {
        return ['info', 'warning', 'alert', 'success'].includes(type)
      },
      default: 'info'
    }
  }
}
</script>
