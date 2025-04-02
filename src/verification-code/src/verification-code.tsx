import type { PropType, VNode } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { VerificationCodeTheme } from '../styles/light'
import type { FormValidationStatus, Size } from './interface'
import { useMergedState } from 'vooks'
import { computed, defineComponent, h, ref, toRef, watch } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import { NInput } from '../../input'
import verificationCodeLight from '../styles/light'
import style from './styles/index.cssr'

export const VerificationCodeProps = {
  ...(useTheme.props as ThemeProps<VerificationCodeTheme>),
  defaultValue: {
    type: [String, Array] as PropType<null | string | [string, string]>,
    default: null
  },
  value: [String, Array] as PropType<null | string | [string, string]>,
  length: {
    type: Number,
    default: 6,
  },
  size: {
    type: String as PropType<Size>,
  },
  disabled: Boolean,
  mask: Boolean,
  readonly: Boolean,
  status: String as PropType<FormValidationStatus>,
  formatter: {
    type: Function as PropType<
      (inputValue: string, index: number, value: string) => string | boolean
    >,
  },
  placeholder: {
    type: String,
    default: '○',
  }
//   'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  // onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
}
export default defineComponent({
  name: 'VerificationCode',
  props: VerificationCodeProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
    //   mergedBorderedRef,
    //   inlineThemeDisabled,
    //   mergedRtlRef
    } = useConfig(props)

    const themeRef = useTheme(
      'VerificationCode',
      '-verification-code',
      style,
      verificationCodeLight,
      props,
      mergedClsPrefixRef
    )

    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    const inputRefList = ref([] as HTMLElement[])
    const type = computed(() => (props.mask ? 'password' : 'text'))

    function isExist(obj: any): boolean {
      return obj || obj === 0
    }
    const filledValue = computed(() => {
      const newVal = String(mergedValueRef).split('')
      return Array.from({ length: props.length }).fill('').map((_, index) => {
        return isExist(newVal[index]) ? String(newVal[index]) : ''
      }) as string[]
    })

    const innerValue = ref(filledValue.value)

    watch(mergedValueRef, () => {
      innerValue.value = filledValue.value
    })

    return {
      innerValue,
      mergedClsPrefix: mergedClsPrefixRef,
      inputRefList,
      type
    }
  },
  render() {
    const {
      mergedClsPrefix,
      innerValue,
      size,
      placeholder,
      disabled,
      readonly,
      status,
      inputRefList,
      type
    } = this
    return (
      <div class={`${mergedClsPrefix}-verification-code`}>
        {innerValue.map((item, index) => (
          <NInput
            key={index}
            ref={(el: any) => (inputRefList[index] = el)}
            v-model:value={item}
            type={type}
            size={size}
            placeholder={placeholder}
            disabled={disabled}
            readonly={readonly}
            status={status}
          />
        ))}
      </div>
    )
  }
})
