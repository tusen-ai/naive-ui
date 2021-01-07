<template>
  <div class="n-result" :style="cssVars">
    <div class="n-result-icon">
      <image-404
        v-if="status === 404 || status === '404'"
        class="n-result-icon__status-image"
      />
      <image-403
        v-else-if="status === 403 || status === '403'"
        class="n-result-icon__status-image"
      />
      <image-500
        v-else-if="status === 500 || status === '500'"
        class="n-result-icon__status-image"
      />
      <image-418
        v-else-if="status === 481 || status === '418'"
        class="n-result-icon__status-image"
      />
      <n-icon v-else-if="status === 'success'" size="80">
        <success-icon />
      </n-icon>
      <n-icon v-else-if="status === 'info'" size="80">
        <info-icon />
      </n-icon>
      <n-icon v-else-if="status === 'warning'" size="80">
        <warning-icon />
      </n-icon>
      <n-icon v-else-if="status === 'error'" size="80">
        <error-icon />
      </n-icon>
    </div>
    <div class="n-result-header">
      <div class="n-result-header__title">
        {{ title }}
      </div>
      <div class="n-result-header__description">
        {{ description }}
      </div>
    </div>
    <div v-if="$slots.default" class="n-result-content">
      <slot />
    </div>
    <div class="n-result-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { createKey } from '../../_utils'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_base/icons'
import { NIcon } from '../../icon'
import { resultLight } from '../styles'
import image404 from './404.vue'
import image500 from './500.vue'
import image418 from './418.vue'
import image403 from './403.vue'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Result',
  components: {
    InfoIcon,
    SuccessIcon,
    WarningIcon,
    ErrorIcon,
    NIcon,
    image404,
    image403,
    image418,
    image500
  },
  props: {
    ...useTheme.props,
    size: {
      validator (value) {
        return ['small', 'medium', 'large', 'huge'].includes(value)
      },
      default: 'medium'
    },
    status: {
      type: String,
      default: 'info'
    },
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Result', 'Result', style, resultLight, props)
    return {
      cssVars: computed(() => {
        const { size, status } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            textColor,
            lineHeight,
            titleTextColor,
            titleFontWeight,
            [createKey('iconColor', status)]: iconColor,
            [createKey('fontSize', size)]: fontSize,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('iconSize', size)]: iconSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--icon-size': iconSize,
          '--line-height': lineHeight,
          '--text-color': textColor,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--title-text-color': titleTextColor,
          '--icon-color': iconColor
        }
      })
    }
  }
})
</script>
