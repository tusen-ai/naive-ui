import {
  h,
  defineComponent,
  computed,
  PropType,
  CSSProperties,
  ref,
  InjectionKey,
  Ref,
  provide,
  toRef
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NBaseClose } from '../../_internal'
import { warn, createKey, call } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { tagLight } from '../styles'
import type { TagTheme } from '../styles'
import commonProps from './common-props'
import style from './styles/index.cssr'
import useRtl from '../../_mixins/use-rtl'

export interface TagPublicMethods {
  setTextContent: (textContent: string) => void
}
export interface TagRef extends TagPublicMethods {
  $el: HTMLElement
}

const tagProps = {
  ...(useTheme.props as ThemeProps<TagTheme>),
  ...commonProps,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  checked: Boolean,
  checkable: Boolean,
  onClose: [Array, Function] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>,
  'onUpdate:checked': Function as PropType<(checked: boolean) => void>,
  onUpdateChecked: Function as PropType<(checked: boolean) => void>,
  // private
  internalStopClickPropagation: Boolean,
  // deprecated
  onCheckedChange: {
    type: Function as PropType<(checked: boolean) => void>,
    validator: () => {
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
}

interface TagInjection {
  roundRef: Ref<boolean>
}

export const tagInjectionKey: InjectionKey<TagInjection> = Symbol('tag')

export type TagProps = ExtractPublicPropTypes<typeof tagProps>

export default defineComponent({
  name: 'Tag',
  props: tagProps,
  setup (props) {
    const contentRef = ref<HTMLElement | null>(null)
    const { mergedBorderedRef, mergedClsPrefixRef, NConfigProvider } =
      useConfig(props)
    const themeRef = useTheme(
      'Tag',
      'Tag',
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
      if (props.internalStopClickPropagation) {
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
    const rtlEnabledRef = useRtl(
      'Tag',
      NConfigProvider?.mergedRtlRef,
      mergedClsPrefixRef
    )
    return {
      ...tagPublicMethods,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      contentRef,
      mergedBordered: mergedBorderedRef,
      handleClick,
      handleCloseClick,
      cssVars: computed(() => {
        const { type, size, color: { color, textColor } = {} } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            padding,
            closeMargin,
            closeMarginRtl,
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
            [createKey('color', type)]: typedColor,
            [createKey('textColor', type)]: typeTextColor,
            [createKey('border', type)]: border,
            [createKey('closeColor', type)]: closeColor,
            [createKey('closeColorHover', type)]: closeColorHover,
            [createKey('closeColorPressed', type)]: closeColorPressed
          }
        } = themeRef.value
        return {
          '--n-avatar-size-override': `calc(${height} - 8px)`,
          '--n-bezier': cubicBezierEaseInOut,
          '--n-border-radius': borderRadius,
          '--n-border': border,
          '--n-close-color': closeColor,
          '--n-close-color-hover': closeColorHover,
          '--n-close-color-pressed': closeColorPressed,
          '--n-close-color-disabled': closeColor,
          '--n-close-margin': closeMargin,
          '--n-close-margin-rtl': closeMarginRtl,
          '--n-close-size': closeSize,
          '--n-color': color || typedColor,
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
    }
  },
  render () {
    const {
      mergedClsPrefix,
      rtlEnabled,
      color: { borderColor } = {},
      $slots
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-tag`,
          {
            [`${mergedClsPrefix}-tag--rtl`]: rtlEnabled,
            [`${mergedClsPrefix}-tag--disabled`]: this.disabled,
            [`${mergedClsPrefix}-tag--checkable`]: this.checkable,
            [`${mergedClsPrefix}-tag--checked`]: this.checkable && this.checked,
            [`${mergedClsPrefix}-tag--round`]: this.round
          }
        ]}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
      >
        {$slots.avatar && (
          <div class={`${mergedClsPrefix}-tag__avatar`}>
            {{
              default: $slots.avatar
            }}
          </div>
        )}
        <span class={`${mergedClsPrefix}-tag__content`} ref="contentRef">
          {this.$slots}
        </span>
        {!this.checkable && this.closable ? (
          <NBaseClose
            clsPrefix={mergedClsPrefix}
            class={`${mergedClsPrefix}-tag__close`}
            disabled={this.disabled}
            onClick={this.handleCloseClick}
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
