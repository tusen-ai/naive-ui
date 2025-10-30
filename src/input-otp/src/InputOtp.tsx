import type { InputInst } from 'naive-ui'
import type { CSSProperties, PropType, SlotsType } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { FormValidationStatus } from '../../form/src/public-types'
import type { InputOtpTheme } from '../styles/light'
import type {
  InputOtpAllowInput,
  InputOtpInst,
  InputOtpOnBlur,
  InputOtpOnFinish,
  InputOtpOnFocus,
  InputOtpOnUpdateValue,
  InputOtpOnUpdateValueMeta,
  InputOtpSize,
  InputOtpSlots
} from './public-types'
import { pxfy, repeat } from 'seemly'
import { useMergedState } from 'vooks'
import { computed, defineComponent, h, ref, toRef } from 'vue'
import {
  useConfig,
  useFormItem,
  useRtl,
  useTheme,
  useThemeClass
} from '../../_mixins'
import {
  call,
  createKey,
  isArrayShallowEqual,
  resolveSlotWithTypedProps
} from '../../_utils'
import { NInput } from '../../input'
import inputOtpLight from '../styles/light'
import style from './styles/index.cssr'

export const inputOtpProps = {
  ...(useTheme.props as ThemeProps<InputOtpTheme>),
  defaultValue: { type: Array as PropType<string[]>, default: [] },
  value: Array as PropType<null | string[]>,
  length: {
    type: Number,
    default: 6
  },
  block: Boolean,
  size: String as PropType<InputOtpSize>,
  disabled: Boolean,
  mask: Boolean,
  readonly: Boolean,
  status: String as PropType<FormValidationStatus>,
  gap: [String, Number] as PropType<string | number>,
  placeholder: { type: String, default: '' },
  allowInput: Function as PropType<InputOtpAllowInput>,
  onBlur: [Function, Array] as PropType<MaybeArray<InputOtpOnBlur>>,
  onFocus: [Function, Array] as PropType<MaybeArray<InputOtpOnFocus>>,
  'onUpdate:value': [Function, Array] as PropType<
    MaybeArray<InputOtpOnUpdateValue>
  >,
  onUpdateValue: [Function, Array] as PropType<
    MaybeArray<InputOtpOnUpdateValue>
  >,
  onFinish: [Function, Array] as PropType<MaybeArray<InputOtpOnFinish>>
}

export type InputOtpProps = ExtractPublicPropTypes<typeof inputOtpProps>

export default defineComponent({
  name: 'InputOtp',
  props: inputOtpProps,
  slots: Object as SlotsType<InputOtpSlots>,
  setup(props) {
    const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled }
      = useConfig(props)
    const themeRef = useTheme(
      'InputOtp',
      '-input-otp',
      style,
      inputOtpLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('InputOtp', mergedRtlRef, mergedClsPrefixRef)

    // form-item
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem

    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const { gap: propGap } = props
      const {
        self: {
          [createKey('inputWidth', size)]: inputWidth,
          [createKey('gap', size)]: gap
        }
      } = themeRef.value
      return {
        '--n-gap':
          propGap === undefined
            ? gap
            : typeof propGap === 'number'
              ? pxfy(propGap)
              : propGap,
        '--n-input-width': inputWidth
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'input-otp',
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

    const inputRefList = ref<InputInst[]>([])
    const inputTypeRef = computed(() =>
      props.mask ? ('password' as const) : ('text' as const)
    )

    const handleFocus = (e: FocusEvent, index: number) => {
      // If it's focused from other input element inside the component, returns
      if (
        inputRefList?.value.some(
          inputInst => inputInst.inputElRef === e.relatedTarget
        )
      ) {
        return
      }
      const { onFocus } = props
      if (onFocus) {
        call(onFocus, e, index)
      }
      const { nTriggerFormFocus } = formItem
      nTriggerFormFocus()
    }

    const handleBlur = (e: FocusEvent, index: number) => {
      // If it's blured to other input element inside the component, returns
      if (
        inputRefList?.value.some(
          inputInst => inputInst.inputElRef === e.relatedTarget
        )
      ) {
        return
      }
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur)
        call(onBlur, e, index)
      nTriggerFormBlur()
    }

    const focusOnChar = (charIndex: number) => {
      if (charIndex >= props.length)
        return
      if (charIndex < 0)
        return
      inputRefList?.value[charIndex].focus()
      inputRefList?.value[charIndex].select()
    }

    const focusOnNextChar = (currentIndex: number) => {
      if (currentIndex >= props.length - 1) {
        return
      }
      focusOnChar(currentIndex + 1)
    }

    const focusOnPrevChar = (currentIndex: number) => {
      if (currentIndex <= 0) {
        return
      }
      focusOnChar(currentIndex - 1)
    }

    const justifyValue = (value: string[] | null): string[] => {
      const justifiedValue = value ? Array.from(value) : []
      const length = props.length
      while (justifiedValue.length > length) {
        justifiedValue.pop()
      }
      while (justifiedValue.length < length) {
        justifiedValue.push('')
      }
      return justifiedValue
    }

    function doUpdateValue(
      value: string[],
      meta: InputOtpOnUpdateValueMeta
    ): void {
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (isArrayShallowEqual(value, mergedValueRef.value)) {
        nTriggerFormInput()
        return
      }
      const {
        'onUpdate:value': _onUpdateValue,
        onUpdateValue,
        length,
        onFinish
      } = props
      if (_onUpdateValue)
        call(_onUpdateValue, value, meta)
      if (onUpdateValue)
        call(onUpdateValue, value, meta)
      if (value.filter(v => v).length === length && onFinish) {
        call(onFinish, value)
      }
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }

    const handlePaste = (e: ClipboardEvent, index: number) => {
      if (props.readonly || mergedDisabledRef.value) {
        return
      }

      e.preventDefault()
      const { clipboardData } = e
      const text = clipboardData?.getData('text')
      if (!text)
        return

      const currentValue = justifyValue(mergedValueRef.value)
      let startIndex = index
      const allowInput = props.allowInput
      let pasteApplied = false
      let appendedText = ''
      for (let i = 0; i < text.length; ++i) {
        if (allowInput && !allowInput(text[i], startIndex, currentValue)) {
          continue
        }
        pasteApplied = true
        currentValue[startIndex] = text[i]
        appendedText += text[i]
        startIndex++
        if (startIndex >= currentValue.length) {
          break
        }
      }

      if (pasteApplied) {
        focusOnChar(startIndex)
        doUpdateValue(currentValue, {
          diff: appendedText,
          index: startIndex,
          source: 'paste'
        })
      }
    }

    const handleKeydown = (e: KeyboardEvent, index: number) => {
      if (mergedDisabledRef.value)
        return
      const keyCode = e.code || e.key
      const currentValue = justifyValue(mergedValueRef.value)
      if (keyCode === 'Backspace' && !props.readonly) {
        e.preventDefault()
        currentValue[Math.max(index, 0)] = ''
        doUpdateValue(currentValue, { diff: '', index, source: 'delete' })
        focusOnPrevChar(index)
      }
      else if (keyCode === 'ArrowLeft') {
        e.preventDefault()
        focusOnPrevChar(index)
      }
      else if (keyCode === 'ArrowRight') {
        e.preventDefault()
        focusOnNextChar(index)
      }
    }

    const handleInput = (value: string, index: number) => {
      const currentValue = justifyValue(mergedValueRef.value)
      const currentValueAtIndex = currentValue[index]
      const diff = value.replace(currentValueAtIndex, '')
      const char = diff[diff.length - 1] || value[value.length - 1] || ''
      const allowInput = props.allowInput
      if (allowInput && !allowInput(char, index, currentValue)) {
        return
      }
      currentValue[index] = char
      doUpdateValue(currentValue, { diff: char, index, source: 'input' })
      focusOnNextChar(index)
    }

    const getTemplateEvents = (index: number) => {
      return {
        onInput: (value: string) => handleInput(value, index),
        onPaste: (event: ClipboardEvent) => handlePaste(event, index),
        onKeydown: (event: KeyboardEvent) => handleKeydown(event, index),
        onFocus: (event: FocusEvent) => handleFocus(event, index),
        onBlur: (event: FocusEvent) => handleBlur(event, index)
      }
    }

    const exposedMethods: InputOtpInst = {
      focusOnChar
    }

    return {
      mergedTheme: themeRef,
      perItemValueArray: computed(() => justifyValue(mergedValueRef.value)),
      mergedClsPrefix: mergedClsPrefixRef,
      inputRefList,
      inputType: inputTypeRef,
      rtlEnabled: rtlEnabledRef,
      mergedStatus: mergedStatusRef,
      mergedDisabled: mergedDisabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      getTemplateEvents,
      onRender: themeClassHandle?.onRender,
      ...exposedMethods
    }
  },
  render() {
    const {
      mergedTheme,
      mergedClsPrefix,
      perItemValueArray,
      size,
      placeholder,
      mergedDisabled,
      mergedStatus,
      readonly,
      inputType,
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
          `${mergedClsPrefix}-input-otp`,
          themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-input-otp--rtl`,
          this.block && `${mergedClsPrefix}-input-otp--block`
        ]}
      >
        {repeat(this.length, undefined).map((_, index) =>
          resolveSlotWithTypedProps(
            $slots.default,
            {
              index,
              value: perItemValueArray[index],
              type: inputType,
              size,
              placeholder,
              disabled: mergedDisabled,
              readonly,
              status: mergedStatus,
              builtinThemeOverrides: {
                paddingTiny: '0',
                paddingSmall: '0',
                paddingMedium: '0',
                paddingLarge: '0'
              },
              theme: mergedTheme.peers.Input,
              themeOverrides: mergedTheme.peerOverrides.Input,
              ref: (el: any) => (this.inputRefList[index] = el),
              ...getTemplateEvents(index)
            },
            ({ index, ...restProps }) => [<NInput {...restProps} key={index} />]
          )
        )}
      </div>
    )
  }
})
