<template>
  <div
    class="n-tag"
    :class="{
      [`n-tag--${size}-size`]: true,
      [`n-tag--${type}-type`]: true,
      'n-tag--closable': !checkable && closable,
      'n-tag--disabled': disabled,
      'n-tag--checkable': checkable,
      'n-tag--checked': checkable && checked,
      'n-tag--round': round
    }"
    :style="cssVars"
    @click="handleClick"
  >
    <span class="n-tag__content"><slot /></span>
    <n-icon
      v-if="!checkable && closable"
      class="n-tag__close"
      color-transition
      @click="handleCloseClick"
    >
      <close-icon />
    </n-icon>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { CloseIcon } from '../../_base/icons'
import { useTheme } from '../../_mixins'
import { NIcon } from '../../icon'
import { warn, createKey } from '../../_utils'
import { tagLight } from '../styles'
import commonProps from './common-props'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Tag',
  components: {
    CloseIcon,
    NIcon
  },
  props: {
    ...useTheme.props,
    ...commonProps,
    checked: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:checked': {
      type: Function,
      default: undefined
    },
    // private
    stopClickPropagation: {
      type: Boolean,
      default: false
    },
    // deprecated
    onCheckedChange: {
      validator () {
        if (__DEV__) {
          warn(
            'tag',
            '`on-checked-change` is deprecated, please use `on-update:checked` instead'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Tag', 'Tag', style, tagLight, props)
    return {
      cssVars: computed(() => {
        const { type, size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            padding,
            closeMargin,
            borderRadius,
            opacityDisabled,
            textColorCheckable,
            textColorHoverCheckable,
            textColorPressedCheckable,
            textColorChecked,
            colorCheckable,
            colorHoverCheckable,
            colorPressedCheckable,
            colorChecked,
            colorCheckedHover,
            colorCheckedPressed,
            [createKey('closeSize', size)]: closeSize,
            [createKey('fontSize', size)]: fontSize,
            [createKey('height', size)]: height,
            [createKey('color', type)]: color,
            [createKey('textColor', type)]: textColor,
            [createKey('borderColor', type)]: borderColor,
            [createKey('closeColor', type)]: closeColor,
            [createKey('closeColorHover', type)]: closeColorHover,
            [createKey('closeColorPressed', type)]: closeColorPressed
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--border-color': borderColor,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--close-margin': closeMargin,
          '--close-size': closeSize,
          '--color': color,
          '--color-checkable': colorCheckable,
          '--color-checked': colorChecked,
          '--color-checked-hover': colorCheckedHover,
          '--color-checked-pressed': colorCheckedPressed,
          '--color-hover-checkable': colorHoverCheckable,
          '--color-pressed-checkable': colorPressedCheckable,
          '--font-size': fontSize,
          '--height': height,
          '--opacity-disabled': opacityDisabled,
          '--padding': padding,
          '--text-color': textColor,
          '--text-color-checkable': textColorCheckable,
          '--text-color-checked': textColorChecked,
          '--text-color-hover-checkable': textColorHoverCheckable,
          '--text-color-pressed-checkable': textColorPressedCheckable
        }
      })
    }
  },
  methods: {
    handleClick (e) {
      if (!this.disabled) {
        if (this.checkable) {
          const {
            checked,
            onCheckedChange,
            'onUpdate:checked': onUpdateChecked
          } = this
          if (onUpdateChecked) onUpdateChecked(!checked)
          // deprecated
          if (onCheckedChange) onCheckedChange(!checked)
        }
      }
    },
    handleCloseClick (e) {
      if (this.stopClickPropagation) {
        e.stopPropagation()
      }
      if (!this.disabled) {
        const { onClose } = this
        if (onClose) onClose()
      }
    }
  }
})
</script>
