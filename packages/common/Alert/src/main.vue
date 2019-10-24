<template>
  <div
    class="n-alert"
    :class="{
      [`n-alert--${type}-type`]: true,
      'n-alert--no-icon': showIcon === false,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div
      v-if="showIcon"
      class="n-alert__icon"
    >
      <slot
        v-if="$slots.icon"
        name="icon"
      />
      <n-icon
        v-else-if="type==='success'"
      >
        <ios-checkmark-circle />
      </n-icon>
      <n-icon
        v-else-if="type==='info'"
      >
        <ios-information-circle />
      </n-icon>
      <n-icon
        v-else-if="type==='warning'"
      >
        <ios-alert />
      </n-icon>
      <n-icon
        v-else-if="type==='error'"
      >
        <ios-close-circle />
      </n-icon>
    </div>
    <div class="n-alert-body">
      <div
        v-if="title !== null"
        class="n-alert-body__title"
      >
        {{ title }}
      </div>
      <div class="n-alert-body__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import iosCheckmarkCircle from '../../../icons/ios-checkmark-circle'
import iosAlert from '../../../icons/ios-alert'
import iosInformationCircle from '../../../icons/ios-information-circle'
import iosCloseCircle from '../../../icons/ios-close-circle'

export default {
  name: 'NAlert',
  components: {
    NIcon,
    iosCheckmarkCircle,
    iosAlert,
    iosInformationCircle,
    iosCloseCircle
  },
  mixins: [withapp, themeable],
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    type: {
      validator (type) {
        return ['info', 'warning', 'error', 'success'].includes(type)
      },
      default: 'info'
    }
  }
}
</script>
