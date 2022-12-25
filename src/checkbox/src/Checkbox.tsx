import {
  h,
  defineComponent,
  computed,
  inject,
  ref,
  toRef,
  PropType,
  CSSProperties,
  watchEffect
} from 'vue'
import { useMergedState, useMemo } from 'vooks'
import { createId } from 'seemly'
import { on } from 'evtd'
import { useConfig, useFormItem, useTheme, useThemeClass } from '../../_mixins'
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
import type {
  OnUpdateChecked,
  OnUpdateCheckedImpl,
  CheckboxInst
} from './interface'
import style from './styles/index.cssr'
import { useRtl } from '../../_mixins/use-rtl'

export const checkboxProps = {
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
    const selfRef = ref<HTMLDivElement | null>(null)
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
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
      '-checkbox',
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
      switch (e.key) {
        case ' ':
        case 'Enter':
          toggle(e)
      }
    }
    function handleKeyDown (e: KeyboardEvent): void {
      switch (e.key) {
        case ' ':
          e.preventDefault()
      }
    }
    const exposedMethods: CheckboxInst = {
      focus: () => {
        selfRef.value?.focus()
      },
      blur: () => {
        selfRef.value?.blur()
      }
    }
    const rtlEnabledRef = useRtl('Checkbox', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
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
          labelLineHeight,
          labelFontWeight,
          [createKey('fontSize', mergedSize)]: fontSize,
          [createKey('size', mergedSize)]: size
        }
      } = themeRef.value
      return {
        '--n-label-line-height': labelLineHeight,
        '--n-label-font-weight': labelFontWeight,
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
        '--n-color-table': colorTableHeader,
        '--n-color-table-modal': colorTableHeaderModal,
        '--n-color-table-popover': colorTableHeaderPopover,
        '--n-color-disabled': colorDisabled,
        '--n-color-disabled-checked': colorDisabledChecked,
        '--n-text-color': textColor,
        '--n-text-color-disabled': textColorDisabled,
        '--n-check-mark-color': checkMarkColor,
        '--n-check-mark-color-disabled': checkMarkColorDisabled,
        '--n-check-mark-color-disabled-checked': checkMarkColorDisabledChecked,
        '--n-font-size': fontSize,
        '--n-label-padding': labelPadding
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'checkbox',
        computed(() => mergedSizeRef.value[0]),
        cssVarsRef,
        props
      )
      : undefined
    return Object.assign(formItem, exposedMethods, {
      rtlEnabled: rtlEnabledRef,
      selfRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      renderedChecked: renderedCheckedRef,
      mergedTheme: themeRef,
      labelId: createId(),
      handleClick,
      handleKeyUp,
      handleKeyDown,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
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
    this.onRender?.()
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-checkbox`,
          this.themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-checkbox--rtl`,
          renderedChecked && `${mergedClsPrefix}-checkbox--checked`,
          mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`,
          indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`,
          privateInsideTable && `${mergedClsPrefix}-checkbox--inside-table`
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
        <div class={`${mergedClsPrefix}-checkbox-box-wrapper`}>
          &nbsp;
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
        </div>
        {label !== null || $slots.default ? (
          <span class={`${mergedClsPrefix}-checkbox__label`} id={labelId}>
            {$slots.default ? $slots.default() : label}
          </span>
        ) : null}
      </div>
    )
  }
})
