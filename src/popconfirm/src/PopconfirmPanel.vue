<template>
  <div
    class="n-popconfirm-content"
    :class="{
      'n-popconfirm-content--show-icon': showIcon
    }"
    :style="cssVars"
  >
    <div class="n-popconfirm-content__body">
      <slot v-if="showIcon" name="icon">
        <n-icon>
          <warning-icon />
        </n-icon>
      </slot>
      <slot />
    </div>
    <div class="n-popconfirm-content__action">
      <slot name="action">
        <n-button size="small" @click="handleNegativeClick">
          {{ localizedNegativeText }}
        </n-button>
        <n-button size="small" type="primary" @click="handlePositiveClick">
          {{ localizedPositiveText }}
        </n-button>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { NButton } from '../../button'
import { NIcon } from '../../icon'
import { WarningIcon } from '../../_base/icons'
import { useTheme, useLocale } from '../../_mixins'
import { popconfirmLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'NPopconfirmPanel',
  components: {
    NButton,
    NIcon,
    WarningIcon
  },
  props: {
    positiveText: {
      type: String,
      default: undefined
    },
    negativeText: {
      type: String,
      default: undefined
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    onPositiveClick: {
      type: Function,
      required: true
    },
    onNegativeClick: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Popconfirm',
      'Popconfirm',
      style,
      popconfirmLight,
      props
    )
    const { locale: localeRef } = useLocale('Popconfirm')
    return {
      ...useLocale('Popconfirm'),
      localizedPositiveText: computed(() => {
        return props.positiveText || localeRef.value.positiveText
      }),
      localizedNegativeText: computed(() => {
        return props.negativeText || localeRef.value.negativeText
      }),
      handlePositiveClick () {
        props.onPositiveClick()
      },
      handleNegativeClick () {
        props.onNegativeClick()
      },
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { fontSize, iconSize, iconColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--icon-size': iconSize,
          '--icon-color': iconColor
        }
      })
    }
  }
})
</script>
