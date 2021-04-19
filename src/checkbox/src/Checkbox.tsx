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
  defaultChecked: {
    type: Boolean,
    default: false
  },
  value: [String, Number],
  disabled: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: undefined
  },
  focusable: {
    type: Boolean,
    default: true
  },
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:checked': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateChecked: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  // private
  tableHeader: {
    type: Boolean,
    default: false
  },
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
    const { mergedClsPrefix } = useConfig(props)
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
    const mergedDisabledRef = computed(() => {
      return props.disabled || NCheckboxGroup?.disabledRef.value
    })
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
      }
    })
    const themeRef = useTheme(
      'Checkbox',
      'Checkbox',
      style,
      checkboxLight,
      props,
      mergedClsPrefix
    )
    function toggle (): void {
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
        if (_onUpdateCheck) call(_onUpdateCheck, nextChecked)
        if (onUpdateChecked) call(onUpdateChecked, nextChecked)
        if (onChange) call(onChange, nextChecked) // deprecated
        nTriggerFormInput()
        nTriggerFormChange()
        uncontrolledCheckedRef.value = nextChecked
      }
    }
    function handleClick (): void {
      if (!mergedDisabledRef.value) {
        toggle()
      }
    }
    function handleKeyUp (e: KeyboardEvent): void {
      if (mergedDisabledRef.value) return
      switch (e.code) {
        case 'Space':
        case 'Enter':
          toggle()
      }
    }
    function handleKeyDown (e: KeyboardEvent): void {
      switch (e.code) {
        case 'Space':
          e.preventDefault()
      }
    }
    return Object.assign(formItem, {
      mergedClsPrefix,
      mergedDisabled: mergedDisabledRef,
      renderedChecked: renderedCheckedRef,
      mergedTheme: themeRef,
      handleClick,
      handleKeyUp,
      handleKeyDown,
      cssVars: computed(() => {
        const {
          mergedSize: { value: mergedSize }
        } = formItem
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
      tableHeader,
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
            [`${mergedClsPrefix}-checkbox--table-header`]: tableHeader
          }
        ]}
        tabindex={mergedDisabled || !focusable ? undefined : 0}
        style={cssVars as CSSProperties}
        onKeyup={handleKeyUp}
        onKeydown={handleKeyDown}
        onClick={handleClick}
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
