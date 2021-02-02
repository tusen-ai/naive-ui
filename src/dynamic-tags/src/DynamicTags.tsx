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
import { InputRef, NInput } from '../../input'
import { NTag } from '../../tag'
import { NBaseIcon } from '../../_internal'
import { useTheme, useFormItem, useLocale } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, call, MaybeArray, smallerSize } from '../../_utils'
import { dynamicTagsLight } from '../styles'
import type { DynamicTagsTheme } from '../styles'

import type { OnUpdateValue } from './interface'
import style from './styles/index.cssr'
import { useMergedState } from 'vooks'

export default defineComponent({
  name: 'DynamicTags',
  props: {
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
    tagStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => {
        return {
          marginRight: '6px'
        }
      }
    },
    inputStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => {
        return {
          width: '64px'
        }
      }
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
    onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
    // deprecated
    onChange: {
      type: [Function, Array] as PropType<
      MaybeArray<OnUpdateValue> | undefined
      >,
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
  },
  setup (props) {
    const { locale } = useLocale('DynamicTags')
    const formItem = useFormItem(props)
    const inputValueRef = ref('')
    const showInputRef = ref(false)
    const inputForceFocusedRef = ref(true)
    const inputInstRef = ref<InputRef | null>(null)
    const themeRef = useTheme(
      'DynamicTags',
      'DynamicTags',
      style,
      dynamicTagsLight,
      props
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
      mergedTheme: themeRef
    }
  },
  render () {
    const { mergedTheme } = this
    return (
      <div class="n-dynamic-tags">
        {this.mergedValue.map((tag, index) => (
          <NTag
            key={index}
            theme={mergedTheme.peers.Tag}
            themeOverrides={mergedTheme.peerOverrides.Tag}
            style={this.tagStyle}
            type={this.type}
            round={this.round}
            size={this.size}
            closable={this.closable}
            disabled={this.disabled}
            onClose={() => this.handleCloseClick(index)}
          >
            {{ default: () => tag }}
          </NTag>
        ))}
        {this.showInput ? (
          <NInput
            ref="inputInstRef"
            value={this.inputValue}
            onUpdateValue={(v) => {
              this.inputValue = v
            }}
            forceFocus={this.inputForceFocused}
            theme={mergedTheme.peers.Input}
            themeOverrides={mergedTheme.peerOverrides.Input}
            style={this.inputStyle}
            size={this.inputSize}
            placeholder=""
            onKeyup={this.handleInputKeyUp}
            onBlur={this.handleInputBlur}
          />
        ) : (
          <NButton
            dashed
            theme={this.mergedTheme.peers.Button}
            themeOverrides={this.mergedTheme.peerOverrides.Button}
            size={this.inputSize}
            onClick={this.handleAddClick}
          >
            {{
              icon: () => (
                <NBaseIcon>{{ default: () => <AddIcon /> }}</NBaseIcon>
              )
            }}
          </NButton>
        )}
      </div>
    )
  }
})
