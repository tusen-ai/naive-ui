<template>
  <div
    class="n-dialog"
    :class="{
      'n-dialog--bordered': bordered,
      [`n-dialog--icon-${mergedIconPlacement}`]: true
    }"
    :style="cssVars"
  >
    <n-base-icon
      v-if="closable"
      class="n-dialog__close"
      @click="handleCloseClick"
    >
      <close-icon />
    </n-base-icon>
    <div
      v-if="mergedShowIcon && mergedIconPlacement === 'top'"
      class="n-dialog-icon-container"
    >
      <n-base-icon class="n-dialog__icon">
        <slot name="icon">
          <render v-if="icon" :render="icon" />
          <component :is="iconType" v-else-if="type !== 'default'" />
        </slot>
      </n-base-icon>
    </div>
    <div class="n-dialog__title">
      <n-base-icon
        v-if="mergedShowIcon && mergedIconPlacement === 'left'"
        class="n-dialog__icon"
      >
        <slot name="icon">
          <render v-if="icon" :render="icon" />
          <component :is="iconType" v-else-if="type !== 'default'" />
        </slot>
      </n-base-icon>
      <slot name="header">
        <render :render="title" />
      </slot>
    </div>
    <div class="n-dialog__content">
      <slot>
        <render :render="content" />
      </slot>
    </div>
    <div class="n-dialog__action">
      <slot name="action">
        <n-button
          v-if="negativeText"
          :unstable-theme="mergedTheme.peers.Button"
          :unstable-theme-overrides="mergedTheme.overrides.Button"
          ghost
          size="small"
          @click="handleNegativeClick"
        >
          <render :render="negativeText" />
        </n-button>
        <n-button
          :unstable-theme="mergedTheme.peers.Button"
          :unstable-theme-overrides="mergedTheme.overrides.Button"
          :disabled="loading"
          :loading="loading"
          size="small"
          :type="type === 'default' ? 'primary' : type"
          @click="handlePositiveClick"
        >
          <render :render="positiveText" />
        </n-button>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { render, createKey } from '../../_utils'
import { NBaseIcon } from '../../_base'
import { NButton } from '../../button'
import {
  InfoIcon,
  SuccessIcon,
  CloseIcon,
  WarningIcon,
  ErrorIcon
} from '../../_base/icons'
import { dialogLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Dialog',
  alias: [
    'NimbusConfirmCard', // deprecated
    'Confirm' // deprecated
  ],
  components: {
    NBaseIcon,
    NButton,
    CloseIcon,
    WarningIcon,
    SuccessIcon,
    ErrorIcon,
    InfoIcon,
    render
  },
  props: {
    ...useTheme.props,
    icon: {
      type: Function,
      default: undefined
    },
    type: {
      type: String,
      default: 'default'
    },
    title: {
      type: [String, Function],
      default: undefined
    },
    closable: {
      type: Boolean,
      default: true
    },
    negativeText: {
      type: String,
      default: undefined
    },
    positiveText: {
      type: String,
      default: undefined
    },
    content: {
      type: [String, Function],
      default: undefined
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    iconPlacement: {
      type: String,
      default: 'left'
    },
    onPositiveClick: {
      type: Function,
      default: undefined
    },
    onNegativeClick: {
      type: Function,
      default: undefined
    },
    onClose: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Dialog', 'Dialog', style, dialogLight, props)
    return {
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const { type, iconPlacement } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            fontSize,
            lineHeight,
            border,
            titleTextColor,
            textColor,
            color,
            closeColor,
            closeColorHover,
            closeColorPressed,
            borderRadius,
            titleFontWeight,
            titleFontSize,
            padding,
            iconSize,
            actionSpace,
            contentMargin,
            closeSize,
            [iconPlacement === 'top'
              ? 'iconMarginIconTop'
              : 'iconMargin']: iconMargin,
            [iconPlacement === 'top'
              ? 'closeMarginIconTop'
              : 'closeMargin']: closeMargin,
            [createKey('iconColor', type)]: iconColor
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--icon-color': iconColor,
          '--bezier': cubicBezierEaseInOut,
          '--close-margin': closeMargin,
          '--icon-margin': iconMargin,
          '--icon-size': iconSize,
          '--close-size': closeSize,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--color': color,
          '--text-color': textColor,
          '--border-radius': borderRadius,
          '--padding': padding,
          '--line-height': lineHeight,
          '--border': border,
          '--content-margin': contentMargin,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--title-text-color': titleTextColor,
          '--action-space': actionSpace
        }
      })
    }
  },
  computed: {
    mergedIconPlacement () {
      return (
        this.$naive?.unstableConfig?.Dialog?.iconPlacement || this.iconPlacement
      )
    },
    mergedShowIcon () {
      const { showIcon, type, icon, $slots } = this
      return (
        (type !== 'default' && showIcon) ||
        (type === 'default' && showIcon && (icon || $slots.icon))
      )
    },
    iconType () {
      return {
        error: 'error-icon',
        warning: 'warning-icon',
        success: 'success-icon',
        info: 'info-icon'
      }[this.type]
    }
  },
  methods: {
    handlePositiveClick (e) {
      const { onPositiveClick } = this
      if (onPositiveClick) onPositiveClick(e)
    },
    handleNegativeClick (e) {
      const { onNegativeClick } = this
      if (onNegativeClick) onNegativeClick(e)
    },
    handleCloseClick () {
      const { onClose } = this
      if (onClose) onClose()
    }
  }
})
</script>
