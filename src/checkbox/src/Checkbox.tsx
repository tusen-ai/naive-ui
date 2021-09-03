import {
  h,
  defineComponent,
  computed,
  inject,
  ref,
  toRef,
  renderSlot,
  PropType,
  CSSProperties
} from 'vue'
import { useMergedState, useMemo } from 'vooks'
import { useConfig, useFormItem, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NIconSwitchTransition } from '../../_internal'
import {
  warn,
  call,
  createKey,
  MaybeArray,
  ExtractPublicPropTypes
} from '../../_utils'
import { checkboxLight } from '../styles'
import type { CheckboxTheme } from '../styles'
import CheckMark from './CheckMark'
import LineMark from './LineMark'
import { checkboxGroupInjectionKey } from './CheckboxGroup'
import style from './styles/index.cssr'

const checkboxProps = {
  ...(useTheme.props as ThemeProps<CheckboxTheme>),
  size: String as PropType<'small' | 'medium' | 'large'>,
  checked: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultChecked: Boolean,
  value: [String, Number] as PropType<string | number>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  indeterminate: Boolean,
  label: String,
  focusable: {
    type: Boolean,
    default: true
  },
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:checked': [Function, Array] as PropType<
  MaybeArray<(value: boolean, e: MouseEvent | KeyboardEvent) => void>
  >,
  onUpdateChecked: [Function, Array] as PropType<
  MaybeArray<(value: boolean, e: MouseEvent | KeyboardEvent) => void>
  >,
  // private
  privateTableHeader: Boolean,
  // deprecated
  onChange: {
    type: [Function, Array] as PropType<
    undefined | MaybeArray<(value: boolean) => void>
    >,
    validator: () => {
      warn(
        'checkbox',
        '`on-change` is deprecated, please use `on-update:checked` instead.'
      )
      return true
    },
    default: undefined
  }
}

export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>

export default defineComponent({
  name: 'Checkbox',
  props: checkboxProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const formItem = useFormItem(props, {
      mergedSize (NFormItem) {
        const { size } = props
        if (size !== undefined) return size
        if (NCheckboxGroup) {
          const { value: mergedSize } = NCheckboxGroup.mergedSizeRef
          if (mergedSize !== undefined) {
            return mergedSize
          }
        }
        if (NFormItem) {
          const { mergedSize } = NFormItem
          if (mergedSize !== undefined) return mergedSize.value
        }
        return 'medium'
      },
      mergedDisabled (NFormItem) {
        const { disabled } = props
        if (disabled !== undefined) return disabled
        if (NCheckboxGroup) {
          if (NCheckboxGroup.disabledRef.value) return true
          const {
            maxRef: { value: max },
            checkedCountRef
          } = NCheckboxGroup
          if (
            max !== undefined &&
            checkedCountRef.value >= max &&
            !renderedCheckedRef.value
          ) {
            return true
          }
          const {
            minRef: { value: min }
          } = NCheckboxGroup
          if (
            min !== undefined &&
            checkedCountRef.value <= min &&
            renderedCheckedRef.value
          ) {
            return true
          }
        }
        if (NFormItem) {
          return NFormItem.disabled.value
        }
        return false
      }
    })
    const { mergedDisabledRef, mergedSizeRef } = formItem
    const NCheckboxGroup = inject(checkboxGroupInjectionKey, null)
    const uncontrolledCheckedRef = ref(props.defaultChecked)
    const controlledCheckedRef = toRef(props, 'checked')
    const mergedCheckedRef = useMergedState(
      controlledCheckedRef,
      uncontrolledCheckedRef
    )
    const renderedCheckedRef = useMemo(() => {
      if (NCheckboxGroup) {
        const groupValueSet = NCheckboxGroup.valueSetRef.value
        if (groupValueSet && props.value !== undefined) {
          return groupValueSet.has(props.value)
        }
        return false
      } else {
        return mergedCheckedRef.value
      }
    })
    const themeRef = useTheme(
      'Checkbox',
      'Checkbox',
      style,
      checkboxLight,
      props,
      mergedClsPrefixRef
    )
    function toggle (e: MouseEvent | KeyboardEvent): void {
      if (NCheckboxGroup && props.value !== undefined) {
        NCheckboxGroup.toggleCheckbox(!renderedCheckedRef.value, props.value)
      } else {
        const {
          onChange,
          'onUpdate:checked': _onUpdateCheck,
          onUpdateChecked
        } = props
        const { nTriggerFormInput, nTriggerFormChange } = formItem
        const nextChecked = !renderedCheckedRef.value
        if (_onUpdateCheck) call(_onUpdateCheck, nextChecked, e)
        if (onUpdateChecked) call(onUpdateChecked, nextChecked, e)
        if (onChange) call(onChange, nextChecked) // deprecated
        nTriggerFormInput()
        nTriggerFormChange()
        uncontrolledCheckedRef.value = nextChecked
      }
    }
    function handleClick (e: MouseEvent): void {
      if (!mergedDisabledRef.value) {
        toggle(e)
      }
    }
    function handleKeyUp (e: KeyboardEvent): void {
      if (mergedDisabledRef.value) return
      switch (e.code) {
        case 'Space':
        case 'Enter':
        case 'NumpadEnter':
          toggle(e)
      }
    }
    function handleKeyDown (e: KeyboardEvent): void {
      switch (e.code) {
        case 'Space':
          e.preventDefault()
      }
    }
    return Object.assign(formItem, {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      renderedChecked: renderedCheckedRef,
      mergedTheme: themeRef,
      handleClick,
      handleKeyUp,
      handleKeyDown,
      cssVars: computed(() => {
        const { value: mergedSize } = mergedSizeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderRadius,
            color,
            colorChecked,
            colorDisabled,
            colorTableHeader,
            colorTableHeaderModal,
            colorTableHeaderPopover,
            checkMarkColor,
            checkMarkColorDisabled,
            border,
            borderFocus,
            borderDisabled,
            borderChecked,
            boxShadowFocus,
            textColor,
            textColorDisabled,
            checkMarkColorDisabledChecked,
            colorDisabledChecked,
            borderDisabledChecked,
            labelPadding,
            [createKey('fontSize', mergedSize)]: fontSize,
            [createKey('size', mergedSize)]: size
          }
        } = themeRef.value
        return {
          '--size': size,
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--border': border,
          '--border-checked': borderChecked,
          '--border-focus': borderFocus,
          '--border-disabled': borderDisabled,
          '--border-disabled-checked': borderDisabledChecked,
          '--box-shadow-focus': boxShadowFocus,
          '--color': color,
          '--color-checked': colorChecked,
          '--color-table-header': colorTableHeader,
          '--color-table-header-modal': colorTableHeaderModal,
          '--color-table-header-popover': colorTableHeaderPopover,
          '--color-disabled': colorDisabled,
          '--color-disabled-checked': colorDisabledChecked,
          '--text-color': textColor,
          '--text-color-disabled': textColorDisabled,
          '--check-mark-color': checkMarkColor,
          '--check-mark-color-disabled': checkMarkColorDisabled,
          '--check-mark-color-disabled-checked': checkMarkColorDisabledChecked,
          '--font-size': fontSize,
          '--label-padding': labelPadding
        }
      })
    })
  },
  render () {
    const {
      $slots,
      renderedChecked,
      mergedDisabled,
      indeterminate,
      privateTableHeader,
      cssVars,
      label,
      mergedClsPrefix,
      focusable,
      handleKeyUp,
      handleKeyDown,
      handleClick
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-checkbox`,
          {
            [`${mergedClsPrefix}-checkbox--checked`]: renderedChecked,
            [`${mergedClsPrefix}-checkbox--disabled`]: mergedDisabled,
            [`${mergedClsPrefix}-checkbox--indeterminate`]: indeterminate,
            [`${mergedClsPrefix}-checkbox--table-header`]: privateTableHeader
          }
        ]}
        tabindex={mergedDisabled || !focusable ? undefined : 0}
        style={cssVars as CSSProperties}
        onKeyup={handleKeyUp}
        onKeydown={handleKeyDown}
        onClick={handleClick}
        onMousedown={() => {
          const preventDefault = (e: Event): void => {
            e.preventDefault()
          }
          window.addEventListener('selectstart', preventDefault)
          setTimeout(() => {
            window.removeEventListener('selectstart', preventDefault)
          }, 0)
        }}
      >
        <div class={`${mergedClsPrefix}-checkbox-box`}>
          <NIconSwitchTransition>
            {{
              default: () =>
                this.indeterminate ? (
                  <div
                    key="indeterminate"
                    class={`${mergedClsPrefix}-checkbox-icon`}
                  >
                    {LineMark}
                  </div>
                ) : (
                  <div key="check" class={`${mergedClsPrefix}-checkbox-icon`}>
                    {CheckMark}
                  </div>
                )
            }}
          </NIconSwitchTransition>
          <div class={`${mergedClsPrefix}-checkbox-box__border`} />
        </div>
        {label !== null || $slots.default ? (
          <span class={`${mergedClsPrefix}-checkbox__label`}>
            {renderSlot($slots, 'default', undefined, () => [label])}
          </span>
        ) : null}
      </div>
    )
  }
})
