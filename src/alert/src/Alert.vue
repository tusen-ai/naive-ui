<template>
  <n-fade-in-expand-transition @after-leave="handleAfterLeave">
    <div
      v-if="visible"
      class="n-alert"
      :class="{
        [`n-alert--${type}-type`]: true,
        'n-alert--no-icon': showIcon === false,
        [`n-${mergedTheme}-theme`]: mergedTheme
      }"
      :style="{
        ...mergedStyle
      }"
    >
      <div v-if="closable" class="n-alert__close" @click="handleCloseClick">
        <n-icon>
          <close-icon />
        </n-icon>
      </div>
      <div
        v-if="showIcon"
        class="n-alert__icon"
      >
        <n-icon v-if="$slots.icon">
          <slot
            name="icon"
          />
        </n-icon>
        <n-icon
          v-else-if="type==='success'"
        >
          <success-icon />
        </n-icon>
        <n-icon
          v-else-if="type==='info'"
        >
          <info-icon />
        </n-icon>
        <n-icon
          v-else-if="type==='warning'"
        >
          <warning-icon />
        </n-icon>
        <n-icon
          v-else-if="type==='error'"
        >
          <error-icon />
        </n-icon>
      </div>
      <div class="n-alert-body">
        <div
          v-if="title !== undefined"
          class="n-alert-body__title"
        >
          <slot name="header">
            {{ title }}
          </slot>
        </div>
        <div
          v-if="$slots.default"
          class="n-alert-body__content"
        >
          <slot />
        </div>
      </div>
    </div>
  </n-fade-in-expand-transition>
</template>

<script>
import NIcon from '../../icon'
import NFadeInExpandTransition from '../../_transition/FadeInExpandTransition'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import { warn } from '../../_utils/naive'
import styles from './styles'

// icons
import SuccessIcon from '../../_icons/md-checkmark-circle.vue'
import WarningIcon from '../../_icons/md-alert.vue'
import InfoIcon from '../../_icons/md-information-circle.vue'
import ErrorIcon from '../../_icons/md-close-circle.vue'
import CloseIcon from '../../_icons/md-close.vue'

export default {
  name: 'Alert',
  components: {
    NIcon,
    NFadeInExpandTransition,
    SuccessIcon,
    WarningIcon,
    InfoIcon,
    ErrorIcon,
    CloseIcon
  },
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    title: {
      type: String,
      default: undefined
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    type: {
      validator (type) {
        return ['info', 'warning', 'error', 'success', 'default'].includes(type)
      },
      default: 'default'
    },
    closable: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: () => true
    },
    onAfterLeave: {
      type: Function,
      default: undefined
    },
    onAfterHide: {
      validator () {
        if (__DEV__) warn('alert', '`on-after-hide` is deprecated, please use `on-after-leave` instead.')
        return true
      },
      default: undefined
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    doAfterLeave () {
      const {
        onAfterLeave,
        onAfterHide // deprecated
      } = this
      if (onAfterLeave) onAfterLeave()
      if (onAfterHide) onAfterHide()
    },
    handleCloseClick () {
      Promise
        .resolve(this.onClose())
        .then(result => {
          if (result === false) return
          this.visible = false
        })
    },
    handleAfterLeave () {
      this.doAfterLeave()
    }
  }
}
</script>
