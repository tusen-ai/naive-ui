import { h, defineComponent, computed, PropType, CSSProperties, ref } from 'vue'
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
  checked: {
    type: Boolean,
    default: false
  },
  checkable: {
    type: Boolean,
    default: false
  },
  onClose: [Array, Function] as PropType<MaybeArray<() => void>>,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:checked': {
    type: Function,
    default: undefined
  },
  // private
  internalStopClickPropagation: {
    type: Boolean,
    default: false
  },
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
    function handleClick (e: MouseEvent): void {
      if (!props.disabled) {
        if (props.checkable) {
          const {
            checked,
            onCheckedChange,
            'onUpdate:checked': onUpdateChecked
          } = props
          if (onUpdateChecked) onUpdateChecked(!checked)
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
        if (onClose) call(onClose)
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
        const { type, size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            padding,
            closeMargin,
            closeRtlMargin,
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
            [createKey('border', type)]: border,
            [createKey('closeColor', type)]: closeColor,
            [createKey('closeColorHover', type)]: closeColorHover,
            [createKey('closeColorPressed', type)]: closeColorPressed
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--border': border,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--close-margin': closeMargin,
          '--close-rtl-margin': closeRtlMargin,
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
  render () {
    const { mergedClsPrefix, rtlEnabled } = this
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
        <span class={`${mergedClsPrefix}-tag__content`} ref="contentRef">
          {this.$slots}
        </span>
        {!this.checkable && this.closable ? (
          <NBaseClose
            clsPrefix={mergedClsPrefix}
            class={[
              `${mergedClsPrefix}-tag__close`,
              {
                [`${mergedClsPrefix}-tag__close--rtl`]: rtlEnabled
              }
            ]}
            disabled={this.disabled}
            onClick={this.handleCloseClick}
          />
        ) : null}
        {!this.checkable && this.mergedBordered ? (
          <div class={`${mergedClsPrefix}-tag__border`} />
        ) : null}
      </div>
    )
  }
})
