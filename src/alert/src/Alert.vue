<template>
  <n-fade-in-expand-transition @after-leave="handleAfterLeave">
    <div
      v-if="visible"
      class="n-alert"
      :class="{
        [`n-alert--${type}-type`]: true,
        'n-alert--no-icon': showIcon === false
      }"
      :style="cssVars"
    >
      <div v-if="closable" class="n-alert__close" @click="handleCloseClick">
        <n-icon>
          <close-icon />
        </n-icon>
      </div>
      <div v-if="showIcon" class="n-alert__icon">
        <n-icon v-if="$slots.icon">
          <slot name="icon" />
        </n-icon>
        <n-icon v-else-if="type === 'success'">
          <success-icon />
        </n-icon>
        <n-icon v-else-if="type === 'info'">
          <info-icon />
        </n-icon>
        <n-icon v-else-if="type === 'warning'">
          <warning-icon />
        </n-icon>
        <n-icon v-else-if="type === 'error'">
          <error-icon />
        </n-icon>
      </div>
      <div class="n-alert-body">
        <div v-if="title !== undefined" class="n-alert-body__title">
          <slot name="header">
            {{ title }}
          </slot>
        </div>
        <div v-if="$slots.default" class="n-alert-body__content">
          <slot />
        </div>
      </div>
    </div>
  </n-fade-in-expand-transition>
</template>

<script>
import { ref, computed } from 'vue'
import { NIcon } from '../../icon'
import { NFadeInExpandTransition } from '../../_base'
import { useTheme } from '../../_mixins'
import { warn, createKey } from '../../_utils'
import { alertLight } from '../styles'
import style from './styles/index.cssr'

// icons
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  CloseIcon
} from '../../_base/icons'

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
  props: {
    unstableTheme: {
      type: Object,
      default: undefined
    },
    unstableThemeOverrides: {
      type: Object,
      default: undefined
    },
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
        if (__DEV__) {
          warn(
            'alert',
            '`on-after-hide` is deprecated, please use `on-after-leave` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Alert', 'Alert', style, alertLight, props)
    const cssVars = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const {
        fontSize,
        borderRadius,
        titleFontWeight,
        lineHeight,
        contentTextColor,
        titleTextColor
      } = self
      const { type } = props
      return {
        '--bezier': cubicBezierEaseInOut,
        '--color': self[createKey('color', type)],
        '--close-color': self[createKey('closeColor', type)],
        '--close-color-hover': self[createKey('closeColorHover', type)],
        '--close-color-pressed': self[createKey('closeColorPressed', type)],
        '--icon-color': self[createKey('iconColor', type)],
        '--border': self[createKey('border', type)],
        '--title-text-color': titleTextColor,
        '--content-text-color': contentTextColor,
        '--line-height': lineHeight,
        '--border-radius': borderRadius,
        '--font-size': fontSize,
        '--title-font-weight': titleFontWeight
      }
    })
    const visibleRef = ref(true)
    const doAfterLeave = () => {
      const {
        onAfterLeave,
        onAfterHide // deprecated
      } = props
      if (onAfterLeave) onAfterLeave()
      if (onAfterHide) onAfterHide()
    }
    const handleCloseClick = () => {
      Promise.resolve(props.onClose()).then((result) => {
        if (result === false) return
        visibleRef.value = false
      })
    }
    const handleAfterLeave = () => {
      doAfterLeave()
    }
    return {
      visible: visibleRef,
      handleCloseClick,
      handleAfterLeave,
      cssVars
    }
  }
}
</script>
