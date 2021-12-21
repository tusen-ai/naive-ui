import {
  h,
  defineComponent,
  computed,
  inject,
  ref,
  toRef,
  renderSlot,
  PropType,
  CSSProperties,
  watchEffect
} from 'vue'
import { useMergedState, useMemo } from 'vooks'
import { createId } from 'seemly'
import { useConfig, useFormItem, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NIconSwitchTransition } from '../../_internal'
import {
  call,
  createKey,
  MaybeArray,
  ExtractPublicPropTypes,
  warnOnce
} from '../../_utils'
import { checkboxLight } from '../styles'
import type { CheckboxTheme } from '../styles'
import CheckMark from './CheckMark'
import LineMark from './LineMark'
import { checkboxGroupInjectionKey } from './CheckboxGroup'
import type { OnUpdateChecked, OnUpdateCheckedImpl } from './interface'
import style from './styles/index.cssr'
import { on } from 'evtd'

const checkboxProps = {
  ...(useTheme.props as ThemeProps<CheckboxTheme>),
  size: String as PropType<'small' | 'medium' | 'large'>,
  checked: {
    type: [Boolean, String, Number] as PropType<
    boolean | string | number | undefined
    >,
    default: undefined
  },
  defaultChecked: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
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
  checkedValue: {
    type: [Boolean, String, Number],
    default: true
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: false
  },
  'onUpdate:checked': [Function, Array] as PropType<
  MaybeArray<OnUpdateChecked>
  >,
  onUpdateChecked: [Function, Array] as PropType<MaybeArray<OnUpdateChecked>>,
  // private
  privateInsideTable: Boolean,
  // deprecated
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateChecked>>
}

export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>

export default defineComponent({
  name: 'Checkbox',
  props: checkboxProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange) {
          warnOnce(
            'checkbox',
            '`on-change` is deprecated, please use `on-update:checked` instead.'
          )
        }
      })
    }
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
        return mergedCheckedRef.value === props.checkedValue
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
        const nextChecked = renderedCheckedRef.value
          ? props.uncheckedValue
          : props.checkedValue
        if (_onUpdateCheck) {
          call(_onUpdateCheck as OnUpdateCheckedImpl, nextChecked, e)
        }
        if (onUpdateChecked) {
          call(onUpdateChecked as OnUpdateCheckedImpl, nextChecked, e)
        }
        if (onChange) call(onChange as OnUpdateCheckedImpl, nextChecked, e) // deprecated
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
      labelId: createId(),
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
          '--n-size': size,
          '--n-bezier': cubicBezierEaseInOut,
          '--n-border-radius': borderRadius,
          '--n-border': border,
          '--n-border-checked': borderChecked,
          '--n-border-focus': borderFocus,
          '--n-border-disabled': borderDisabled,
          '--n-border-disabled-checked': borderDisabledChecked,
          '--n-box-shadow-focus': boxShadowFocus,
          '--n-color': color,
          '--n-color-checked': colorChecked,
          '--n-color-table-header': colorTableHeader,
          '--n-color-table-header-modal': colorTableHeaderModal,
          '--n-color-table-header-popover': colorTableHeaderPopover,
          '--n-color-disabled': colorDisabled,
          '--n-color-disabled-checked': colorDisabledChecked,
          '--n-text-color': textColor,
          '--n-text-color-disabled': textColorDisabled,
          '--n-check-mark-color': checkMarkColor,
          '--n-check-mark-color-disabled': checkMarkColorDisabled,
          '--n-check-mark-color-disabled-checked':
            checkMarkColorDisabledChecked,
          '--n-font-size': fontSize,
          '--n-label-padding': labelPadding
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
      privateInsideTable,
      cssVars,
      labelId,
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
          renderedChecked && `${mergedClsPrefix}-checkbox--checked`,
          mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`,
          indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`,
          privateInsideTable && `${mergedClsPrefix}-checkbox--table-header`
        ]}
        tabindex={mergedDisabled || !focusable ? undefined : 0}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : renderedChecked}
        aria-labelledby={labelId}
        style={cssVars as CSSProperties}
        onKeyup={handleKeyUp}
        onKeydown={handleKeyDown}
        onClick={handleClick}
        onMousedown={() => {
          on(
            'selectstart',
            window,
            (e: Event): void => {
              e.preventDefault()
            },
            {
              once: true
            }
          )
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
          <span class={`${mergedClsPrefix}-checkbox__label`} id={labelId}>
            {renderSlot($slots, 'default', undefined, () => [label])}
          </span>
        ) : null}
      </div>
    )
  }
})
