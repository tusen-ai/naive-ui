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
import { useFormItem, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NIconSwitchTransition } from '../../_base'
import { warn, call, createKey, MaybeArray } from '../../_utils'
import { checkboxLight } from '../styles'
import type { CheckboxTheme } from '../styles'
import CheckMark from './CheckMark'
import LineMark from './LineMark'
import type { CheckboxGroupInjection } from './CheckboxGroup'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Checkbox',
  props: {
    ...(useTheme.props as ThemeProps<CheckboxTheme>),
    size: {
      type: String as PropType<'small' | 'medium' | 'large' | undefined>,
      default: undefined
    },
    checked: {
      type: Boolean,
      default: undefined
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: undefined
    },
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
  },
  setup (props) {
    const NCheckboxGroup = inject<CheckboxGroupInjection | null>(
      'NCheckboxGroup',
      null
    )
    const uncontrolledCheckedRef = ref(props.defaultChecked)
    const controlledCheckedRef = toRef(props, 'checked')
    const mergedCheckedRef = useMergedState(
      controlledCheckedRef,
      uncontrolledCheckedRef
    )
    const renderedCheckedRef = useMemo(() => {
      if (NCheckboxGroup) {
        const groupValueSet = NCheckboxGroup.valueSet
        if (groupValueSet) {
          return groupValueSet.has(props.value)
        }
        return false
      } else {
        return mergedCheckedRef.value
      }
    })
    const mergedDisabledRef = computed(() => {
      return props.disabled || NCheckboxGroup?.disabled
    })
    const formItem = useFormItem(props, {
      mergedSize (NFormItem) {
        const { size } = props
        if (size !== undefined) return size
        if (NCheckboxGroup) {
          const { mergedSize } = NCheckboxGroup
          if (mergedSize !== undefined) {
            return mergedSize
          }
        }
        if (NFormItem) {
          const { mergedSize } = NFormItem
          if (mergedSize !== undefined) return mergedSize
        }
        return 'medium'
      }
    })
    const themeRef = useTheme(
      'Checkbox',
      'Checkbox',
      style,
      checkboxLight,
      props
    )
    function toggle (): void {
      if (NCheckboxGroup) {
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
      NCheckboxGroup,
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
            colorActive,
            colorDisabled,
            colorTableHeader,
            colorTableHeaderModal,
            checkMarkColor,
            checkMarkColorDisabled,
            border,
            borderFocus,
            borderDisabled,
            borderActive,
            boxShadowFocus,
            textColor,
            textColorDisabled,
            [createKey('fontSize', mergedSize)]: fontSize,
            [createKey('size', mergedSize)]: size
          }
        } = themeRef.value
        return {
          '--size': size,
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--border': border,
          '--border-active': borderActive,
          '--border-focus': borderFocus,
          '--border-disabled': borderDisabled,
          '--box-shadow-focus': boxShadowFocus,
          '--color': color,
          '--color-active': colorActive,
          '--color-table-header': colorTableHeader,
          '--color-table-header-modal': colorTableHeaderModal,
          '--color-disabled': colorDisabled,
          '--text-color': textColor,
          '--text-color-disabled': textColorDisabled,
          '--check-mark-color': checkMarkColor,
          '--check-mark-color-disabled': checkMarkColorDisabled,
          '--font-size': fontSize
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
      handleKeyUp,
      handleKeyDown,
      handleClick
    } = this
    return (
      <div
        class={[
          'n-checkbox',
          {
            'n-checkbox--checked': renderedChecked,
            'n-checkbox--disabled': mergedDisabled,
            'n-checkbox--indeterminate': indeterminate,
            'n-checkbox--table-header': tableHeader
          }
        ]}
        tabindex={mergedDisabled ? undefined : 0}
        style={cssVars as CSSProperties}
        onKeyup={handleKeyUp}
        onKeydown={handleKeyDown}
        onClick={handleClick}
      >
        <div class="n-checkbox-box">
          <NIconSwitchTransition>
            {{
              default: () =>
                this.indeterminate ? (
                  <div key="indeterminate" class="n-checkbox-icon">
                    {LineMark}
                  </div>
                ) : (
                  <div key="check" class="n-checkbox-icon">
                    {CheckMark}
                  </div>
                )
            }}
          </NIconSwitchTransition>

          <div class="n-checkbox-box__border" />
        </div>
        {label !== null || $slots.default ? (
          <span class="n-checkbox__label">
            {renderSlot($slots, 'default', undefined, () => [label])}
          </span>
        ) : null}
      </div>
    )
  }
})
