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
        <md-checkmark-circle />
      </n-icon>
      <n-icon
        v-else-if="type==='info'"
      >
        <md-information-circle />
      </n-icon>
      <n-icon
        v-else-if="type==='warning'"
      >
        <md-alert />
      </n-icon>
      <n-icon
        v-else-if="type==='error'"
      >
        <md-close-circle />
      </n-icon>
    </div>
    <div class="n-alert-body">
      <div
        v-if="title !== null"
        class="n-alert-body__title"
      >
        {{ title }}
      </div>
      <div
        v-if="$slots.default"
        class="n-alert-body__content"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import mdCheckmarkCircle from '../../../icons/md-checkmark-circle'
import mdAlert from '../../../icons/md-alert'
import mdInformationCircle from '../../../icons/md-information-circle'
import mdCloseCircle from '../../../icons/md-close-circle'

export default {
  name: 'NAlert',
  components: {
    NIcon,
    mdCheckmarkCircle,
    mdAlert,
    mdInformationCircle,
    mdCloseCircle
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
