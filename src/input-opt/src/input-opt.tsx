import type { InputInst } from 'naive-ui'
import type { CSSProperties, PropType } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { MaybeArray } from '../../_utils'
import type { InputOptTheme } from '../styles/light'
import type { FormValidationStatus, OnUpdateValue, Size } from './interface'
import { isFunction } from 'lodash-es'
import { useMergedState } from 'vooks'
import { computed, defineComponent, h, ref, toRef, watch } from 'vue'
import {
  useConfig,
  useFormItem,
  useRtl,
  useTheme,
  useThemeClass
} from '../../_mixins'
import { call, createKey, resolveSlotWithTypedProps } from '../../_utils'
import { NInput } from '../../input'
import inputOptLight from '../styles/light'
import style from './styles/index.cssr'

export const InputOptProps = {
  ...(useTheme.props as ThemeProps<InputOptTheme>),
  defaultValue: {
    type: [String, Array] as PropType<null | string | [string, string]>,
    default: ''
  },
  value: [String, Array] as PropType<null | string | [string, string]>,
  length: {
    type: Number,
    default: 6
  },
  size: {
    type: String as PropType<Size>
  },
  disabled: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: false
  },
  readonly: Boolean,
  status: String as PropType<FormValidationStatus>,
  placeholder: {
    type: String,
    default: ''
  },
  allowInput: Function as PropType<
    (inputValue: string, index: number, value: string) => boolean
  >,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onChange: [Function, Array] as PropType<OnUpdateValue>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onInput: [Function, Array] as PropType<
    MaybeArray<(char: string, index: number) => void>
  >,
  onFinish: Function as PropType<(value: string) => void>
}
export default defineComponent({
  name: 'InputOpt',
  props: InputOptProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled }
      = useConfig(props)

    const themeRef = useTheme(
      'InputOpt',
      '-input-opt',
      style,
      inputOptLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('InputOpt', mergedRtlRef, mergedClsPrefixRef)

    // form-item
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem

    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        self: { [createKey('width', size)]: width }
      } = themeRef.value
      return {
        '--n-width': width
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'internal-selection',
          computed(() => {
            const { value: size } = mergedSizeRef
            return size[0]
          }),
          cssVarsRef,
          props
        )
      : undefined

    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    const inputRefList = ref([] as InputInst[])
    const type = computed(() => (props.mask ? 'password' : 'text'))

    function isExist(obj: any): boolean {
      return obj || obj === 0
    }
    const filledValue = computed(() => {
      const newVal = String(mergedValueRef.value).split('')
      return Array.from({ length: props.length })
        .fill('')
        .map((_, index) => {
          return isExist(newVal[index]) ? String(newVal[index]) : ''
        }) as string[]
    })

    const innerValue = ref(filledValue.value)

    watch(mergedValueRef, () => {
      innerValue.value = filledValue.value
    })

    const handleFocus = (index: number) => {
      inputRefList?.value[index].focus()
      inputRefList?.value[index].select()
      const { nTriggerFormFocus } = formItem
      nTriggerFormFocus()
    }
    const focusFirstEmptyInput = (index?: number) => {
      if (isExist(index) && innerValue.value[index as number]) {
        return
      }
      for (let i = 0; i < innerValue.value.length; i++) {
        if (!innerValue.value[i]) {
          handleFocus(i)
          break
        }
      }
    }

    function doUpdateValue(): void {
      const {
        'onUpdate:value': _onUpdateValue,
        onUpdateValue,
        onChange,
        length,
        onFinish
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      const value = innerValue.value.join('').trim()
      if (_onUpdateValue)
        call(_onUpdateValue, value)
      if (onUpdateValue)
        call(onUpdateValue, value)
      if (onChange)
        call(onChange, value)
      if (value.length === length && onFinish)
        call(onFinish, value)
      uncontrolledValueRef.value = value
      focusFirstEmptyInput()
      nTriggerFormInput()
      nTriggerFormChange()
    }

    const handlePaste = (e: ClipboardEvent, index: number) => {
      e.preventDefault()
      const { clipboardData } = e
      const text = clipboardData?.getData('text')
      if (!text)
        return

      text.split('').forEach((char, i) => {
        if (index + i >= props.length)
          return

        if (isFunction(props.allowInput)) {
          const result = props.allowInput(
            char,
            index + i,
            innerValue.value.join('')
          )
          if (result === false) {
            index -= 1
            return
          }
        }

        innerValue.value[index + i] = char
      })
      doUpdateValue()
    }

    const handleKeydown = (e: KeyboardEvent, index: number) => {
      const keyCode = e.code || e.key

      if (keyCode === 'Backspace' && !innerValue.value[index]) {
        e.preventDefault()
        innerValue.value[Math.max(index - 1, 0)] = ''
        doUpdateValue()
      }
      else if (keyCode === 'ArrowLeft' && index > 0) {
        e.preventDefault()
        handleFocus(index - 1)
      }
      else if (
        keyCode === 'ArrowRight'
        && innerValue.value[index]
        && index < props.length - 1
      ) {
        e.preventDefault()
        handleFocus(index + 1)
      }
    }

    const handleInput = (value: string, index: number) => {
      const char = (value || '').trim().charAt(value.length - 1)
      const { onInput } = props
      if (onInput)
        call(onInput, char, index)

      if (isFunction(props.allowInput)) {
        const result = props.allowInput(char, index, innerValue.value.join(''))
        if (result === false)
          return
      }

      innerValue.value[index] = char
      doUpdateValue()
    }

    const handleBlur = (e: FocusEvent) => {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur)
        call(onBlur, e)
      nTriggerFormBlur()
    }

    const getTemplateEvents = (index: number) => {
      return {
        onInput: (value: string) => handleInput(value, index),
        onpaste: (event: ClipboardEvent) => handlePaste(event, index),
        onkeydown: (event: KeyboardEvent) => handleKeydown(event, index),
        onFocus: () => handleFocus(index),
        onBlur: (event: FocusEvent) => handleBlur(event)
      }
    }

    return {
      innerValue,
      mergedClsPrefix: mergedClsPrefixRef,
      inputRefList,
      type,
      rtlEnabled: rtlEnabledRef,
      mergedStatus: mergedStatusRef,
      mergedDisabled: mergedDisabledRef,
      getTemplateEvents,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const {
      mergedClsPrefix,
      innerValue,
      size,
      placeholder,
      mergedDisabled,
      mergedStatus,
      readonly,
      type,
      $slots,
      getTemplateEvents,
      themeClass,
      onRender
    } = this
    onRender?.()
    return (
      <div
        style={this.cssVars as CSSProperties}
        class={[
          `${mergedClsPrefix}-input-opt`,
          themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-input-opt--rtl`
        ]}
      >
        {Array.from({ length: this.length }).map((_, index) => {
          const slotContent = resolveSlotWithTypedProps(
            $slots.default,
            {
              attrs: {
                value: innerValue[index],
                ...getTemplateEvents(index),
                ref: (el: any) => (this.inputRefList[index] = el)
              },
              index
            },
            () => [
              <NInput
                key={index}
                ref={(el: any) => (this.inputRefList[index] = el)}
                type={type}
                value={innerValue[index]}
                size={size}
                placeholder={placeholder}
                disabled={mergedDisabled}
                readonly={readonly}
                status={mergedStatus}
                {...getTemplateEvents(index)}
              />
            ]
          )
          return slotContent
        })}
      </div>
    )
  }
})
