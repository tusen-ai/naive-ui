import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties,
  ref,
  type Ref,
  provide,
  toRef,
  watchEffect
} from 'vue'
import { useRtl } from '../../_mixins/use-rtl'
import { NBaseClose } from '../../_internal/close'
import { useConfig, useThemeClass, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  createKey,
  call,
  createInjectionKey,
  color2Class,
  resolveWrappedSlot,
  warnOnce
} from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { tagLight } from '../styles'
import type { TagTheme } from '../styles'
import commonProps from './common-props'
import style from './styles/index.cssr'
import { getMargin } from 'seemly'

export interface TagPublicMethods {
  setTextContent: (textContent: string) => void
}
export interface TagRef extends TagPublicMethods {
  $el: HTMLElement
}

export const tagProps = {
  ...(useTheme.props as ThemeProps<TagTheme>),
  ...commonProps,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  checked: Boolean,
  checkable: Boolean,
  strong: Boolean,
  triggerClickOnClose: Boolean,
  onClose: [Array, Function] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>,
  'onUpdate:checked': Function as PropType<(checked: boolean) => void>,
  onUpdateChecked: Function as PropType<(checked: boolean) => void>,
  // private
  internalCloseFocusable: {
    type: Boolean,
    default: true
  },
  internalCloseIsButtonTag: {
    type: Boolean,
    default: true
  },
  // deprecated
  onCheckedChange: Function as PropType<(checked: boolean) => void>
}

interface TagInjection {
  roundRef: Ref<boolean>
}

export const tagInjectionKey = createInjectionKey<TagInjection>('n-tag')

export type TagProps = ExtractPublicPropTypes<typeof tagProps>

export default defineComponent({
  name: 'Tag',
  props: tagProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onCheckedChange !== undefined) {
          warnOnce(
            'tag',
            '`on-checked-change` is deprecated, please use `on-update:checked` instead'
          )
        }
      })
    }
    const contentRef = ref<HTMLElement | null>(null)
    const {
      mergedBorderedRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props)
    const themeRef = useTheme(
      'Tag',
      '-tag',
      style,
      tagLight,
      props,
      mergedClsPrefixRef
    )
    provide(tagInjectionKey, {
      roundRef: toRef(props, 'round')
    })
    function handleClick (e: MouseEvent): void {
      if (!props.disabled) {
        if (props.checkable) {
          const {
            checked,
            onCheckedChange,
            onUpdateChecked,
            'onUpdate:checked': _onUpdateChecked
          } = props
          if (onUpdateChecked) onUpdateChecked(!checked)
          if (_onUpdateChecked) _onUpdateChecked(!checked)
          // deprecated
          if (onCheckedChange) onCheckedChange(!checked)
        }
      }
    }
    function handleCloseClick (e: MouseEvent): void {
      if (!props.triggerClickOnClose) {
        e.stopPropagation()
      }
      if (!props.disabled) {
        const { onClose } = props
        if (onClose) call(onClose, e)
      }
    }
    const tagPublicMethods: TagPublicMethods = {
      setTextContent (textContent: string) {
        const { value } = contentRef
        if (value) value.textContent = textContent
      }
    }
    const rtlEnabledRef = useRtl('Tag', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { type, size, color: { color, textColor } = {} } = props
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
          closeBorderRadius,
          fontWeightStrong,
          [createKey('colorBordered', type)]: colorBordered,
          [createKey('closeSize', size)]: closeSize,
          [createKey('closeIconSize', size)]: closeIconSize,
          [createKey('fontSize', size)]: fontSize,
          [createKey('height', size)]: height,
          [createKey('color', type)]: typedColor,
          [createKey('textColor', type)]: typeTextColor,
          [createKey('border', type)]: border,
          [createKey('closeIconColor', type)]: closeIconColor,
          [createKey('closeIconColorHover', type)]: closeIconColorHover,
          [createKey('closeIconColorPressed', type)]: closeIconColorPressed,
          [createKey('closeColorHover', type)]: closeColorHover,
          [createKey('closeColorPressed', type)]: closeColorPressed
        }
      } = themeRef.value
      const closeMarginDiscrete = getMargin(closeMargin)
      return {
        '--n-font-weight-strong': fontWeightStrong,
        '--n-avatar-size-override': `calc(${height} - 8px)`,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-border': border,
        '--n-close-icon-size': closeIconSize,
        '--n-close-color-pressed': closeColorPressed,
        '--n-close-color-hover': closeColorHover,
        '--n-close-border-radius': closeBorderRadius,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-close-icon-color-disabled': closeIconColor,
        '--n-close-margin-top': closeMarginDiscrete.top,
        '--n-close-margin-right': closeMarginDiscrete.right,
        '--n-close-margin-bottom': closeMarginDiscrete.bottom,
        '--n-close-margin-left': closeMarginDiscrete.left,
        '--n-close-size': closeSize,
        '--n-color':
          color || (mergedBorderedRef.value ? colorBordered : typedColor),
        '--n-color-checkable': colorCheckable,
        '--n-color-checked': colorChecked,
        '--n-color-checked-hover': colorCheckedHover,
        '--n-color-checked-pressed': colorCheckedPressed,
        '--n-color-hover-checkable': colorHoverCheckable,
        '--n-color-pressed-checkable': colorPressedCheckable,
        '--n-font-size': fontSize,
        '--n-height': height,
        '--n-opacity-disabled': opacityDisabled,
        '--n-padding': padding,
        '--n-text-color': textColor || typeTextColor,
        '--n-text-color-checkable': textColorCheckable,
        '--n-text-color-checked': textColorChecked,
        '--n-text-color-hover-checkable': textColorHoverCheckable,
        '--n-text-color-pressed-checkable': textColorPressedCheckable
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'tag',
        computed(() => {
          let hash = ''
          const { type, size, color: { color, textColor } = {} } = props
          hash += type[0]
          hash += size[0]
          if (color) {
            hash += `a${color2Class(color)}`
          }
          if (textColor) {
            hash += `b${color2Class(textColor)}`
          }
          if (mergedBorderedRef.value) {
            hash += 'c'
          }
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      ...tagPublicMethods,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      contentRef,
      mergedBordered: mergedBorderedRef,
      handleClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      mergedClsPrefix,
      rtlEnabled,
      closable,
      color: { borderColor } = {},
      round,
      onRender,
      $slots
    } = this
    onRender?.()
    const avatarNode = resolveWrappedSlot(
      $slots.avatar,
      (children) =>
        children && (
          <div class={`${mergedClsPrefix}-tag__avatar`}>{children}</div>
        )
    )
    const iconNode = resolveWrappedSlot(
      $slots.icon,
      (children) =>
        children && <div class={`${mergedClsPrefix}-tag__icon`}>{children}</div>
    )
    return (
      <div
        class={[
          `${mergedClsPrefix}-tag`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-tag--rtl`]: rtlEnabled,
            [`${mergedClsPrefix}-tag--strong`]: this.strong,
            [`${mergedClsPrefix}-tag--disabled`]: this.disabled,
            [`${mergedClsPrefix}-tag--checkable`]: this.checkable,
            [`${mergedClsPrefix}-tag--checked`]: this.checkable && this.checked,
            [`${mergedClsPrefix}-tag--round`]: round,
            [`${mergedClsPrefix}-tag--avatar`]: avatarNode,
            [`${mergedClsPrefix}-tag--icon`]: iconNode,
            [`${mergedClsPrefix}-tag--closable`]: closable
          }
        ]}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
      >
        {iconNode || avatarNode}
        <span class={`${mergedClsPrefix}-tag__content`} ref="contentRef">
          {this.$slots.default?.()}
        </span>
        {!this.checkable && closable ? (
          <NBaseClose
            clsPrefix={mergedClsPrefix}
            class={`${mergedClsPrefix}-tag__close`}
            disabled={this.disabled}
            onClick={this.handleCloseClick}
            focusable={this.internalCloseFocusable}
            round={round}
            isButtonTag={this.internalCloseIsButtonTag}
            absolute
          />
        ) : null}
        {!this.checkable && this.mergedBordered ? (
          <div
            class={`${mergedClsPrefix}-tag__border`}
            style={{ borderColor }}
          />
        ) : null}
      </div>
    )
  }
})
