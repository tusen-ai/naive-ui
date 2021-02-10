import { h, defineComponent, computed, PropType, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NBaseClose } from '../../_internal'
import { warn, createKey } from '../../_utils'
import { tagLight } from '../styles'
import type { TagTheme } from '../styles'
import commonProps from './common-props'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Tag',
  props: {
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
    onClose: Function,
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
  },
  setup (props) {
    const { mergedBordered } = useConfig(props)
    const themeRef = useTheme('Tag', 'Tag', style, tagLight, props)
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
      if (props.stopClickPropagation) {
        e.stopPropagation()
      }
      if (!props.disabled) {
        const { onClose } = props
        if (onClose) onClose()
      }
    }
    return {
      mergedBordered,
      handleClick,
      handleCloseClick,
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
    return (
      <div
        class={[
          'n-tag',
          {
            'n-tag--disabled': this.disabled,
            'n-tag--checkable': this.checkable,
            'n-tag--checked': this.checkable && this.checked,
            'n-tag--round': this.round
          }
        ]}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
      >
        <span class="n-tag__content">{this.$slots}</span>
        {!this.checkable && this.closable ? (
          <NBaseClose
            class="n-tag__close"
            disabled={this.disabled}
            onClick={this.handleCloseClick}
          />
        ) : null}
        {!this.checkable && this.mergedBordered ? (
          <div class="n-tag__border" />
        ) : null}
      </div>
    )
  }
})
