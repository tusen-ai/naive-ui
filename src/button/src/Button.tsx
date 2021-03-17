import {
  h,
  ref,
  computed,
  inject,
  nextTick,
  defineComponent,
  PropType,
  renderSlot,
  CSSProperties
} from 'vue'
import { useMemo } from 'vooks'
import { createHoverColor, createPressedColor } from '../../_utils/color/index'
import { useFormItem, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  NFadeInExpandTransition,
  NIconSwitchTransition,
  NBaseLoading,
  NBaseWave
} from '../../_internal'
import type { BaseWaveRef } from '../../_internal'
import { call, createKey } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { buttonLight } from '../styles'
import type { ButtonTheme } from '../styles'
import type { ButtonGroupInjection } from './ButtonGroup'
import type { Type, Size } from './interface'
import style from './styles/button.cssr'

export default defineComponent({
  name: 'Button',
  props: {
    ...(useTheme.props as ThemeProps<ButtonTheme>),
    color: String,
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
    size: String as PropType<Size>,
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
      type: String as PropType<Type>,
      default: 'default'
    },
    dashed: {
      type: Boolean,
      default: false
    },
    iconPlacement: {
      type: String as PropType<'left' | 'right'>,
      default: 'left'
    },
    attrType: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    },
    onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>
  },
  setup (props) {
    const selfRef = ref<HTMLElement | null>(null)
    const waveRef = ref<BaseWaveRef | null>(null)
    const enterPressedRef = ref(false)
    const showBorderRef = useMemo(() => {
      return !props.text && (!props.color || props.ghost || props.dashed)
    })
    const NButtonGroup = inject<ButtonGroupInjection>('NButtonGroup', {})
    const { mergedSize: mergedSizeRef } = useFormItem(
      {},
      {
        defaultSize: 'medium',
        mergedSize: (NFormItem) => {
          const { size } = props
          if (size) return size
          const { size: buttonGroupSize } = NButtonGroup
          if (buttonGroupSize) return buttonGroupSize
          const { mergedSize: formItemSize } = NFormItem || {}
          if (formItemSize) {
            return formItemSize.value
          }
          return 'medium'
        }
      }
    )
    const mergedFocusableRef = computed(() => {
      return props.focusable && !props.disabled
    })
    const handleMouseDown = (e: MouseEvent): void => {
      e.preventDefault()
      if (props.disabled) {
        return
      }
      if (mergedFocusableRef.value) {
        selfRef.value?.focus({ preventScroll: true })
      }
    }
    const handleClick = (e: MouseEvent): void => {
      if (!props.disabled) {
        const { onClick } = props
        if (onClick) call(onClick, e)
        if (!props.text) {
          const { value } = waveRef
          if (value) {
            value.play()
          }
        }
      }
    }
    const handleKeyUp = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'Enter':
          if (!props.keyboard) {
            e.preventDefault()
            return
          }
          enterPressedRef.value = false
          void nextTick(() => {
            if (!props.disabled) {
              selfRef.value?.click()
            }
          })
      }
    }
    const handleKeyDown = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'Enter':
          if (!props.keyboard) return
          e.preventDefault()
          enterPressedRef.value = true
      }
    }
    const handleBlur = (): void => {
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
      handleKeyDown,
      handleBlur,
      handleKeyUp,
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
        const {
          rippleDuration,
          opacityDisabled,
          fontWeightText,
          fontWeighGhost,
          fontWeight
        } = self
        const size = mergedSizeRef.value
        const { dashed, type, ghost, text, color, round, circle } = props
        // font
        const fontProps = {
          fontWeight: text
            ? fontWeightText
            : ghost
              ? fontWeighGhost
              : fontWeight
        }
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
          [createKey('iconMargin', size)]: iconMargin,
          waveOpacity
        } = self
        const sizeProps = {
          '--width': circle && !text ? height : 'initial',
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
          '--wave-opacity': waveOpacity,
          ...fontProps,
          ...colorProps,
          ...borderProps,
          ...sizeProps
        }
      })
    }
  },
  render () {
    const { $slots } = this
    return (
      <button
        ref="selfRef"
        class={[
          'n-button',
          `n-button--${this.type}-type`,
          {
            'n-button--disabled': this.disabled,
            'n-button--block': this.block,
            'n-button--pressed': this.enterPressed,
            'n-button--dashed': !this.text && this.dashed,
            'n-button--color': this.color,
            'n-button--ghost': this.ghost // required for button group border collapse
          }
        ]}
        tabindex={this.mergedFocusable ? 0 : -1}
        type={this.attrType}
        style={this.cssVars as CSSProperties}
        disabled={this.disabled}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onMousedown={this.handleMouseDown}
        onKeyup={this.handleKeyUp}
        onKeydown={this.handleKeyDown}
      >
        {$slots.default && this.iconPlacement === 'right' ? (
          <div class="n-button__content">{$slots}</div>
        ) : null}

        <NFadeInExpandTransition width>
          {{
            default: () =>
              $slots.icon || this.loading ? (
                <span
                  class="n-button__icon"
                  style={{
                    margin: !$slots.default ? 0 : ''
                  }}
                >
                  <NIconSwitchTransition>
                    {{
                      default: () =>
                        this.loading ? (
                          <NBaseLoading
                            key="loading"
                            class="n-icon-slot"
                            strokeWidth={24}
                          />
                        ) : (
                          <div key="icon" class="n-icon-slot">
                            {renderSlot($slots, 'icon')}
                          </div>
                        )
                    }}
                  </NIconSwitchTransition>
                </span>
              ) : null
          }}
        </NFadeInExpandTransition>
        {$slots.default && this.iconPlacement === 'left' ? (
          <span class="n-button__content">{$slots}</span>
        ) : null}
        {!this.text ? <NBaseWave ref="waveRef" /> : null}
        {this.showBorder ? (
          <div
            class="n-button__border"
            style={this.customColorCssVars as CSSProperties}
          />
        ) : null}
        {this.showBorder ? (
          <div
            class="n-button__state-border"
            style={this.customColorCssVars as CSSProperties}
          />
        ) : null}
      </button>
    )
  }
})
