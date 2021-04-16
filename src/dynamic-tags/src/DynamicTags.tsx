import {
  h,
  defineComponent,
  ref,
  PropType,
  CSSProperties,
  computed,
  nextTick,
  toRef
} from 'vue'
import commonProps from '../../tag/src/common-props'
import { AddIcon } from '../../_internal/icons'
import { NButton } from '../../button'
import { NSpace } from '../../space'
import { InputInst, NInput } from '../../input'
import { NTag } from '../../tag'
import { NBaseIcon } from '../../_internal'
import { useTheme, useFormItem, useLocale, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, call, smallerSize } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { dynamicTagsLight } from '../styles'
import type { DynamicTagsTheme } from '../styles'
import style from './styles/index.cssr'

import type { OnUpdateValue } from './interface'
import { useMergedState } from 'vooks'

const dynamicTagsProps = {
  ...(useTheme.props as ThemeProps<DynamicTagsTheme>),
  ...commonProps,
  closable: {
    type: Boolean,
    default: true
  },
  defaultValue: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  value: Array as PropType<string[]>,
  inputStyle: [String, Object] as PropType<string | CSSProperties>,
  tagStyle: [String, Object] as PropType<string | CSSProperties>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  // deprecated
  onChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'dynamic-tags',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  }
}

export type DynamicTagsProps = ExtractPublicPropTypes<typeof dynamicTagsProps>

export default defineComponent({
  name: 'DynamicTags',
  props: dynamicTagsProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const { locale } = useLocale('DynamicTags')
    const formItem = useFormItem(props)
    const inputValueRef = ref('')
    const showInputRef = ref(false)
    const inputForceFocusedRef = ref(true)
    const inputInstRef = ref<InputInst | null>(null)
    const themeRef = useTheme(
      'DynamicTags',
      'DynamicTags',
      style,
      dynamicTagsLight,
      props,
      mergedClsPrefix
    )
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    const localizedAddRef = computed(() => {
      return locale.value.add
    })
    const inputSizeRef = computed(() => {
      return smallerSize(props.size)
    })
    function doChange (value: string[]): void {
      const {
        onChange,
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onChange) call(onChange, value)
      if (onUpdateValue) call(onUpdateValue, value)
      if (_onUpdateValue) call(_onUpdateValue, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function handleCloseClick (index: number): void {
      const tags = mergedValueRef.value.slice(0)
      tags.splice(index, 1)
      doChange(tags)
    }
    function handleInputKeyUp (e: KeyboardEvent): void {
      switch (e.code) {
        case 'Enter':
          handleInputConfirm()
      }
    }
    function handleInputConfirm (): void {
      if (inputValueRef.value) {
        const tags = mergedValueRef.value.slice(0)
        tags.push(inputValueRef.value)
        doChange(tags)
      }
      showInputRef.value = false
      inputForceFocusedRef.value = true
      inputValueRef.value = ''
    }
    function handleInputBlur (): void {
      handleInputConfirm()
    }
    function handleAddClick (): void {
      showInputRef.value = true
      void nextTick(() => {
        inputInstRef.value?.focus()
        inputForceFocusedRef.value = false
      })
    }
    return {
      cPrefix: mergedClsPrefix,
      inputInstRef,
      localizedAdd: localizedAddRef,
      inputSize: inputSizeRef,
      inputValue: inputValueRef,
      showInput: showInputRef,
      inputForceFocused: inputForceFocusedRef,
      mergedValue: mergedValueRef,
      handleInputKeyUp,
      handleAddClick,
      handleInputBlur,
      handleCloseClick,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          self: { inputWidth }
        } = themeRef.value
        return {
          '--input-width': inputWidth
        }
      })
    }
  },
  render () {
    const { mergedTheme, cssVars, cPrefix } = this
    return (
      <NSpace
        class={`${cPrefix}-dynamic-tags`}
        size="small"
        style={cssVars as CSSProperties}
        theme={mergedTheme.peers.Space}
        themeOverrides={mergedTheme.peerOverrides.Space}
        itemStyle="display: flex;"
      >
        {{
          default: () => {
            const {
              mergedTheme,
              tagStyle,
              type,
              round,
              size,
              closable,
              disabled,
              showInput,
              inputValue,
              inputStyle,
              inputSize,
              inputForceFocused,
              handleInputKeyUp,
              handleInputBlur,
              handleAddClick,
              handleCloseClick
            } = this
            return this.mergedValue
              .map((tag, index) => (
                <NTag
                  key={index}
                  theme={mergedTheme.peers.Tag}
                  themeOverrides={mergedTheme.peerOverrides.Tag}
                  style={tagStyle}
                  type={type}
                  round={round}
                  size={size}
                  closable={closable}
                  disabled={disabled}
                  onClose={() => handleCloseClick(index)}
                >
                  {{ default: () => tag }}
                </NTag>
              ))
              .concat(
                showInput ? (
                  <NInput
                    ref="inputInstRef"
                    autosize
                    value={inputValue}
                    onUpdateValue={(v) => {
                      this.inputValue = v
                    }}
                    theme={mergedTheme.peers.Input}
                    themeOverrides={mergedTheme.peerOverrides.Input}
                    style={inputStyle}
                    size={inputSize}
                    placeholder=""
                    onKeyup={handleInputKeyUp}
                    onBlur={handleInputBlur}
                    internalForceFocus={inputForceFocused}
                  />
                ) : (
                  <NButton
                    dashed
                    theme={mergedTheme.peers.Button}
                    themeOverrides={mergedTheme.peerOverrides.Button}
                    size={inputSize}
                    onClick={handleAddClick}
                  >
                    {{
                      icon: () => (
                        <NBaseIcon clsPrefix={cPrefix}>
                          {{ default: () => <AddIcon /> }}
                        </NBaseIcon>
                      )
                    }}
                  </NButton>
                )
              )
          }
        }}
      </NSpace>
    )
  }
})
