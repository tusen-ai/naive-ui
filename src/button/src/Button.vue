<template>
  <button
    ref="selfRef"
    class="n-button"
    :class="{
      'n-button--disabled': disabled,
      'n-button--block': block,
      'n-button--pressed': enterPressed,
      'n-button--dashed': !text && dashed,
      'n-button--color': color,
      [`n-button--${type}-type`]: true
    }"
    :tabindex="mergedFocusable ? 0 : -1"
    :type="attrType"
    :style="cssVars"
    :disabled="disabled"
    @click="handleClick"
    @blur="handleBlur"
    @mousedown="handleMouseDown"
    @keyup.enter="handleKeyUpEnter"
    @keydown.enter="handleKeyDownEnter"
  >
    <div
      v-if="$slots.default && iconPlacement === 'right'"
      class="n-button__content"
    >
      <slot />
    </div>
    <n-fade-in-expand-transition width>
      <span
        v-if="$slots.icon || loading"
        class="n-button__icon"
        :style="{
          margin: !$slots.default ? 0 : ''
        }"
      >
        <n-icon-switch-transition>
          <n-base-loading
            v-if="loading"
            key="loading"
            class="n-icon-slot"
            :stroke-width="24"
          />
          <div v-else key="icon" class="n-icon-slot">
            <slot name="icon" />
          </div>
        </n-icon-switch-transition>
      </span>
    </n-fade-in-expand-transition>
    <span
      v-if="$slots.default && iconPlacement === 'left'"
      class="n-button__content"
    >
      <slot />
    </span>
    <n-base-wave v-if="!text" ref="waveRef" />
    <div
      v-if="showBorder"
      class="n-button__border"
      :style="customColorCssVars"
    />
    <div
      v-if="showBorder"
      class="n-button__state-border"
      :style="customColorCssVars"
    />
  </button>
</template>

<script>
import { ref, computed, inject, nextTick } from 'vue'
import { useMemo } from 'vooks'
import {
  createHoverColor,
  createPressedColor
} from '../../_utils/color/index.js'
import { useTheme } from '../../_mixins'
import {
  NFadeInExpandTransition,
  NIconSwitchTransition,
  NBaseLoading,
  NBaseWave
} from '../../_base'
import { createKey } from '../../_utils'
import { buttonLight } from '../styles'
import style from './styles/button.cssr.js'

export default {
  name: 'Button',
  components: {
    NBaseLoading,
    NBaseWave,
    NIconSwitchTransition,
    NFadeInExpandTransition
  },
  props: {
    ...useTheme.props,
    color: {
      type: String,
      default: undefined
    },
    text: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['tiny', 'small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    ghost: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    focusable: {
      type: Boolean,
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    type: {
      // TODO: warning message
      validator (value) {
        return [
          'default',
          'primary',
          'info',
          'success',
          'warning',
          'error'
        ].includes(value)
      },
      default: 'default'
    },
    dashed: {
      type: Boolean,
      default: false
    },
    iconPlacement: {
      default: 'left',
      validator (value) {
        return ['left', 'right'].includes(value)
      }
    },
    attrType: {
      default: 'button',
      validator (value) {
        return ['button', 'submit', 'reset'].includes(value)
      }
    }
  },
  setup (props) {
    const selfRef = ref(null)
    const waveRef = ref(null)
    const enterPressedRef = ref(false)
    const showBorderRef = useMemo(() => {
      return !props.text && (!props.color || props.ghost || props.dashed)
    })
    const mergedSizeRef = computed(() => {
      const { size } = props
      if (size) return size
      const NButtonGroup = inject('NButtonGroup', {})
      const { size: buttonGroupSize } = NButtonGroup
      if (buttonGroupSize) return buttonGroupSize
      const NFormItem = inject('NFormItem', null)
      const { mergedSize: formItemSize } = NFormItem || {}
      if (formItemSize) {
        return formItemSize
      }
      return 'medium'
    })
    const mergedFocusableRef = computed(() => {
      return props.focusable && !props.disabled
    })
    const handleMouseDown = (e) => {
      e.preventDefault()
      if (props.disabled) {
        return
      }
      if (mergedFocusableRef.value) {
        selfRef.value.focus({ preventScroll: true })
      }
    }
    const handleClick = (e) => {
      if (!props.disabled) {
        if (!props.text) {
          const { value } = waveRef
          if (value) {
            value.play()
          }
        }
      }
    }
    const handleKeyUpEnter = (e) => {
      if (!props.keyboard) {
        e.preventDefault()
        return
      }
      enterPressedRef.value = false
      nextTick(() => {
        if (!props.disabled) {
          selfRef.value.click()
        }
      })
    }
    const handleKeyDownEnter = (e) => {
      e.preventDefault()
      if (!props.keyboard) return
      enterPressedRef.value = true
    }
    const handleBlur = (e) => {
      enterPressedRef.value = false
    }
    const themeRef = useTheme('Button', 'Button', style, buttonLight, props)
    return {
      selfRef,
      waveRef,
      mergedFocusable: mergedFocusableRef,
      mergedSize: mergedSizeRef,
      showBorder: showBorderRef,
      enterPressed: enterPressedRef,
      handleMouseDown,
      handleKeyDownEnter,
      handleBlur,
      handleKeyUpEnter,
      handleClick,
      customColorCssVars: computed(() => {
        const { color } = props
        if (!color) return null
        const hoverColor = createHoverColor(color)
        return {
          '--border-color': color,
          '--border-color-hover': hoverColor,
          '--border-color-pressed': createPressedColor(color),
          '--border-color-focus': hoverColor,
          '--border-color-disabled': color
        }
      }),
      cssVars: computed(() => {
        const theme = themeRef.value
        const {
          common: { cubicBezierEaseInOut, cubicBezierEaseOut },
          self
        } = theme
        const { rippleDuration, opacityDisabled } = self
        const size = mergedSizeRef.value
        const { dashed, type, ghost, text, color, round, circle } = props
        // color
        let colorProps = {
          '--color': 'initial',
          '--color-hover': 'initial',
          '--color-pressed': 'initial',
          '--color-focus': 'initial',
          '--color-disabled': 'initial',
          '--ripple-color': 'initial',
          '--text-color': 'initial',
          '--text-color-hover': 'initial',
          '--text-color-pressed': 'initial',
          '--text-color-focus': 'initial',
          '--text-color-disabled': 'initial'
        }
        if (text) {
          colorProps = {
            '--color': 'transparent',
            '--color-hover': 'transparent',
            '--color-pressed': 'transparent',
            '--color-focus': 'transparent',
            '--color-disabled': 'transparent',
            '--ripple-color': 'transparent',
            '--text-color': color || self[createKey('textColorText', type)],
            '--text-color-hover': color
              ? createHoverColor(color)
              : self[createKey('textColorTextHover', type)],
            '--text-color-pressed': color
              ? createPressedColor(color)
              : self[createKey('textColorTextPressed', type)],
            '--text-color-focus': color
              ? createHoverColor(color)
              : self[createKey('textColorTextHover', type)],
            '--text-color-disabled':
              color || self[createKey('textColorTextDisabled', type)]
          }
        } else if (ghost || dashed) {
          colorProps = {
            '--color': 'transparent',
            '--color-hover': 'transparent',
            '--color-pressed': 'transparent',
            '--color-focus': 'transparent',
            '--color-disabled': 'transparent',
            '--ripple-color': color || self[createKey('rippleColor', type)],
            '--text-color': color || self[createKey('textColorGhost', type)],
            '--text-color-hover': color
              ? createHoverColor(color)
              : self[createKey('textColorGhostHover', type)],
            '--text-color-pressed': color
              ? createPressedColor(color)
              : self[createKey('textColorGhostPressed', type)],
            '--text-color-focus': color
              ? createHoverColor(color)
              : self[createKey('textColorGhostHover', type)],
            '--text-color-disabled':
              color || self[createKey('textColorGhostDisabled', type)]
          }
        } else {
          colorProps = {
            '--color': color || self[createKey('color', type)],
            '--color-hover': color
              ? createHoverColor(color)
              : self[createKey('colorHover', type)],
            '--color-pressed': color
              ? createPressedColor(color)
              : self[createKey('colorPressed', type)],
            '--color-focus': color
              ? createHoverColor(color)
              : self[createKey('colorFocus', type)],
            '--color-disabled': color || self[createKey('colorDisabled', type)],
            '--ripple-color': color || self[createKey('rippleColor', type)],
            '--text-color': color
              ? self.textColorPrimary
              : self[createKey('textColor', type)],
            '--text-color-hover': color
              ? self.textColorHoverPrimary
              : self[createKey('textColorHover', type)],
            '--text-color-pressed': color
              ? self.textColorPressedPrimary
              : self[createKey('textColorPressed', type)],
            '--text-color-focus': color
              ? self.textColorFocusPrimary
              : self[createKey('textColorFocus', type)],
            '--text-color-disabled': color
              ? self.textColorDisabledPrimary
              : self[createKey('textColorDisabled', type)]
          }
        }
        // border
        let borderProps = {
          '--border': 'initial',
          '--border-hover': 'initial',
          '--border-pressed': 'initial',
          '--border-focus': 'initial',
          '--border-disabled': 'initial'
        }
        if (text) {
          borderProps = {
            '--border': 'none',
            '--border-hover': 'none',
            '--border-pressed': 'none',
            '--border-focus': 'none',
            '--border-disabled': 'none'
          }
        } else {
          borderProps = {
            '--border': self[createKey('border', type)],
            '--border-hover': self[createKey('borderHover', type)],
            '--border-pressed': self[createKey('borderPressed', type)],
            '--border-focus': self[createKey('borderFocus', type)],
            '--border-disabled': self[createKey('borderDisabled', type)]
          }
        }
        // size
        const {
          [createKey('height', size)]: height,
          [createKey('fontSize', size)]: fontSize,
          [createKey('padding', size)]: padding,
          [createKey('paddingRound', size)]: paddingRound,
          [createKey('iconSize', size)]: iconSize,
          [createKey('borderRadius', size)]: borderRadius,
          [createKey('iconMargin', size)]: iconMargin
        } = self
        const sizeProps = {
          '--width': circle ? height : 'initial',
          '--height': text ? 'initial' : height,
          '--font-size': fontSize,
          '--padding': circle
            ? 'initial'
            : text
              ? 'initial'
              : round
                ? paddingRound
                : padding,
          '--icon-size': iconSize,
          '--icon-margin': iconMargin,
          '--border-radius': text
            ? 'initial'
            : circle || round
              ? height
              : borderRadius
        }
        return {
          '--bezier': cubicBezierEaseInOut,
          '--bezier-ease-out': cubicBezierEaseOut,
          '--ripple-duration': rippleDuration,
          '--opacity-disabled': opacityDisabled,
          ...colorProps,
          ...borderProps,
          ...sizeProps
        }
      })
    }
  }
}
</script>
