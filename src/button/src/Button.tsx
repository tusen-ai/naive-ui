import {
  h,
  ref,
  computed,
  inject,
  defineComponent,
  PropType,
  renderSlot,
  CSSProperties,
  ButtonHTMLAttributes,
  watchEffect
} from 'vue'
import { useMemo } from 'vooks'
import { createHoverColor, createPressedColor } from '../../_utils/color/index'
import { useConfig, useFormItem, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  NFadeInExpandTransition,
  NIconSwitchTransition,
  NBaseLoading,
  NBaseWave
} from '../../_internal'
import type { BaseWaveRef } from '../../_internal'
import { call, createKey, warnOnce } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { buttonLight } from '../styles'
import type { ButtonTheme } from '../styles'
import { buttonGroupInjectionKey } from './ButtonGroup'
import type { Type, Size } from './interface'
import style from './styles/button.cssr'
import useRtl from '../../_mixins/use-rtl'
import { changeColor } from 'seemly'

const buttonProps = {
  ...(useTheme.props as ThemeProps<ButtonTheme>),
  color: String,
  textColor: String,
  text: Boolean,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean,
  size: String as PropType<Size>,
  ghost: Boolean,
  round: Boolean,
  secondary: Boolean,
  tertiary: Boolean,
  quaternary: Boolean,
  strong: Boolean,
  focusable: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'button'
  },
  type: {
    type: String as PropType<Type>,
    default: 'default'
  },
  dashed: Boolean,
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  attrType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  bordered: {
    type: Boolean,
    default: true
  }
} as const

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        const { dashed, ghost, text, secondary, tertiary, quaternary } = props
        if (
          (dashed || ghost || text) &&
          (secondary || tertiary || quaternary)
        ) {
          warnOnce(
            'button',
            "`dashed`, `ghost` and `text` props can't be used along with `secondary`, `tertiary` and `quaterary` props."
          )
        }
      })
    }
    const selfRef = ref<HTMLElement | null>(null)
    const waveRef = ref<BaseWaveRef | null>(null)
    const enterPressedRef = ref(false)
    const showBorderRef = useMemo(() => {
      return (
        !props.quaternary &&
        !props.tertiary &&
        !props.secondary &&
        !props.text &&
        (!props.color || props.ghost || props.dashed) &&
        props.bordered
      )
    })
    const NButtonGroup = inject(buttonGroupInjectionKey, {})
    const { mergedSizeRef } = useFormItem(
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
    const handleMousedown = (e: MouseEvent): void => {
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
    const handleKeyup = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'Enter':
        case 'NumpadEnter':
          if (!props.keyboard) {
            return
          }
          enterPressedRef.value = false
      }
    }
    const handleKeydown = (e: KeyboardEvent): void => {
      switch (e.code) {
        case 'Enter':
        case 'NumpadEnter':
          if (!props.keyboard) {
            e.preventDefault()
            return
          }
          enterPressedRef.value = true
      }
    }
    const handleBlur = (): void => {
      enterPressedRef.value = false
    }
    const { mergedClsPrefixRef, NConfigProvider } = useConfig(props)
    const themeRef = useTheme(
      'Button',
      'Button',
      style,
      buttonLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl(
      'Button',
      NConfigProvider?.mergedRtlRef,
      mergedClsPrefixRef
    )
    return {
      selfRef,
      waveRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedFocusable: mergedFocusableRef,
      mergedSize: mergedSizeRef,
      showBorder: showBorderRef,
      enterPressed: enterPressedRef,
      rtlEnabled: rtlEnabledRef,
      handleMousedown,
      handleKeydown,
      handleBlur,
      handleKeyup,
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
          fontWeight,
          fontWeightStrong
        } = self
        const size = mergedSizeRef.value
        const {
          dashed,
          type,
          ghost,
          text,
          color,
          round,
          circle,
          textColor,
          secondary,
          tertiary,
          quaternary,
          strong
        } = props
        // font
        const fontProps = {
          fontWeight: strong ? fontWeightStrong : fontWeight
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
        const typeIsTertiary = type === 'tertiary'
        const typeIsDefault = type === 'default'
        const mergedType = typeIsTertiary ? 'default' : type
        if (text) {
          const propTextColor = textColor || color
          const mergedTextColor =
            propTextColor || self[createKey('textColorText', mergedType)]
          colorProps = {
            '--color': '#0000',
            '--color-hover': '#0000',
            '--color-pressed': '#0000',
            '--color-focus': '#0000',
            '--color-disabled': '#0000',
            '--ripple-color': '#0000',
            '--text-color': mergedTextColor,
            '--text-color-hover': propTextColor
              ? createHoverColor(propTextColor)
              : self[createKey('textColorTextHover', mergedType)],
            '--text-color-pressed': propTextColor
              ? createPressedColor(propTextColor)
              : self[createKey('textColorTextPressed', mergedType)],
            '--text-color-focus': propTextColor
              ? createHoverColor(propTextColor)
              : self[createKey('textColorTextHover', mergedType)],
            '--text-color-disabled':
              propTextColor ||
              self[createKey('textColorTextDisabled', mergedType)]
          }
        } else if (ghost || dashed) {
          const mergedTextColor = textColor || color
          colorProps = {
            '--color': '#0000',
            '--color-hover': '#0000',
            '--color-pressed': '#0000',
            '--color-focus': '#0000',
            '--color-disabled': '#0000',
            '--ripple-color':
              color || self[createKey('rippleColor', mergedType)],
            '--text-color':
              mergedTextColor || self[createKey('textColorGhost', mergedType)],
            '--text-color-hover': mergedTextColor
              ? createHoverColor(mergedTextColor)
              : self[createKey('textColorGhostHover', mergedType)],
            '--text-color-pressed': mergedTextColor
              ? createPressedColor(mergedTextColor)
              : self[createKey('textColorGhostPressed', mergedType)],
            '--text-color-focus': mergedTextColor
              ? createHoverColor(mergedTextColor)
              : self[createKey('textColorGhostHover', mergedType)],
            '--text-color-disabled':
              mergedTextColor ||
              self[createKey('textColorGhostDisabled', mergedType)]
          }
        } else if (secondary) {
          const typeTextColor = typeIsDefault
            ? self.textColor
            : typeIsTertiary
              ? self.textColorTertiary
              : self[createKey('color', mergedType)]
          const mergedTextColor = color || typeTextColor
          const isColoredType = type !== 'default' && type !== 'tertiary'
          colorProps = {
            '--color': isColoredType
              ? changeColor(mergedTextColor, {
                alpha: self.colorOpacitySecondary
              })
              : self.colorSecondary,
            '--color-hover': isColoredType
              ? changeColor(mergedTextColor, {
                alpha: self.colorOpacitySecondaryHover
              })
              : self.colorSecondaryHover,
            '--color-pressed': isColoredType
              ? changeColor(mergedTextColor, {
                alpha: self.colorOpacitySecondaryPressed
              })
              : self.colorSecondaryPressed,
            '--color-focus': isColoredType
              ? changeColor(mergedTextColor, {
                alpha: self.colorOpacitySecondaryHover
              })
              : self.colorSecondaryHover,
            '--color-disabled': self.colorSecondary,
            '--ripple-color': '#0000',
            '--text-color': mergedTextColor,
            '--text-color-hover': mergedTextColor,
            '--text-color-pressed': mergedTextColor,
            '--text-color-focus': mergedTextColor,
            '--text-color-disabled': mergedTextColor
          }
        } else if (tertiary || quaternary) {
          const typeColor = typeIsDefault
            ? self.textColor
            : typeIsTertiary
              ? self.textColorTertiary
              : self[createKey('color', mergedType)]
          const mergedColor = color || typeColor
          if (tertiary) {
            colorProps['--color'] = self.colorTertiary
            colorProps['--color-hover'] = self.colorTertiaryHover
            colorProps['--color-pressed'] = self.colorTertiaryPressed
            colorProps['--color-focus'] = self.colorSecondaryHover
            colorProps['--color-disabled'] = self.colorTertiary
          } else {
            colorProps['--color'] = self.colorQuaternary
            colorProps['--color-hover'] = self.colorQuaternaryHover
            colorProps['--color-pressed'] = self.colorQuaternaryPressed
            colorProps['--color-focus'] = self.colorQuaternaryHover
            colorProps['--color-disabled'] = self.colorQuaternary
          }
          colorProps['--ripple-color'] = '#0000'
          colorProps['--text-color'] = mergedColor
          colorProps['--text-color-hover'] = mergedColor
          colorProps['--text-color-pressed'] = mergedColor
          colorProps['--text-color-focus'] = mergedColor
          colorProps['--text-color-disabled'] = mergedColor
        } else {
          colorProps = {
            '--color': color || self[createKey('color', mergedType)],
            '--color-hover': color
              ? createHoverColor(color)
              : self[createKey('colorHover', mergedType)],
            '--color-pressed': color
              ? createPressedColor(color)
              : self[createKey('colorPressed', mergedType)],
            '--color-focus': color
              ? createHoverColor(color)
              : self[createKey('colorFocus', mergedType)],
            '--color-disabled':
              color || self[createKey('colorDisabled', mergedType)],
            '--ripple-color':
              color || self[createKey('rippleColor', mergedType)],
            '--text-color':
              textColor ||
              (color
                ? self.textColorPrimary
                : typeIsTertiary
                  ? self.textColorTertiary
                  : self[createKey('textColor', mergedType)]),
            '--text-color-hover':
              textColor ||
              (color
                ? self.textColorHoverPrimary
                : self[createKey('textColorHover', mergedType)]),
            '--text-color-pressed':
              textColor ||
              (color
                ? self.textColorPressedPrimary
                : self[createKey('textColorPressed', mergedType)]),
            '--text-color-focus':
              textColor ||
              (color
                ? self.textColorFocusPrimary
                : self[createKey('textColorFocus', mergedType)]),
            '--text-color-disabled':
              textColor ||
              (color
                ? self.textColorDisabledPrimary
                : self[createKey('textColorDisabled', mergedType)])
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
            '--border': self[createKey('border', mergedType)],
            '--border-hover': self[createKey('borderHover', mergedType)],
            '--border-pressed': self[createKey('borderPressed', mergedType)],
            '--border-focus': self[createKey('borderFocus', mergedType)],
            '--border-disabled': self[createKey('borderDisabled', mergedType)]
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
    const { $slots, mergedClsPrefix, tag: Component } = this
    return (
      <Component
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-button`,
          `${mergedClsPrefix}-button--${this.type}-type`,
          `${mergedClsPrefix}-button--${this.mergedSize}-type`,
          this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
          this.disabled && `${mergedClsPrefix}-button--disabled`,
          this.block && `${mergedClsPrefix}-button--block`,
          this.enterPressed && `${mergedClsPrefix}-button--pressed`,
          !this.text && this.dashed && `${mergedClsPrefix}-button--dashed`,
          this.color && `${mergedClsPrefix}-button--color`,
          this.secondary && `${mergedClsPrefix}-button--secondary`,
          this.ghost && `${mergedClsPrefix}-button--ghost` // required for button group border collapse
        ]}
        tabindex={this.mergedFocusable ? 0 : -1}
        type={this.attrType}
        style={this.cssVars as CSSProperties}
        disabled={this.disabled}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onMousedown={this.handleMousedown}
        onKeyup={this.handleKeyup}
        onKeydown={this.handleKeydown}
      >
        {$slots.default && this.iconPlacement === 'right' ? (
          <div class={`${mergedClsPrefix}-button__content`}>{$slots}</div>
        ) : null}
        <NFadeInExpandTransition width>
          {{
            default: () =>
              $slots.icon || this.loading ? (
                <span
                  class={`${mergedClsPrefix}-button__icon`}
                  style={{
                    margin: !$slots.default ? 0 : ''
                  }}
                >
                  <NIconSwitchTransition>
                    {{
                      default: () =>
                        this.loading ? (
                          <NBaseLoading
                            clsPrefix={mergedClsPrefix}
                            key="loading"
                            class={`${mergedClsPrefix}-icon-slot`}
                            strokeWidth={20}
                          />
                        ) : (
                          <div
                            key="icon"
                            class={`${mergedClsPrefix}-icon-slot`}
                            role="none"
                          >
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
          <span class={`${mergedClsPrefix}-button__content`}>{$slots}</span>
        ) : null}
        {!this.text ? (
          <NBaseWave ref="waveRef" clsPrefix={mergedClsPrefix} />
        ) : null}
        {this.showBorder ? (
          <div
            aria-hidden
            class={`${mergedClsPrefix}-button__border`}
            style={this.customColorCssVars as CSSProperties}
          />
        ) : null}
        {this.showBorder ? (
          <div
            aria-hidden
            class={`${mergedClsPrefix}-button__state-border`}
            style={this.customColorCssVars as CSSProperties}
          />
        ) : null}
      </Component>
    )
  }
})

type NativeButtonProps = Omit<ButtonHTMLAttributes, keyof ButtonProps>
type MergedProps = Partial<ButtonProps & NativeButtonProps>

export default Button

// XButton is for tsx type checking
// It's not compitable with render function `h`
// Currently we don't expose it as public
// If there's any issue about this, we may expose it
// Since most people use template, the type checking phase doesn't work as tsx
export const XButton: new () => { $props: MergedProps } = Button as any

// Also, we may make XButton a generic type which support `tag` prop
// but currently vue doesn't export IntrinsicElementAttributes from runtime-dom
// so we can't easily make an attr map by hand
// just leave it for later
