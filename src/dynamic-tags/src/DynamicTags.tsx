import {
  h,
  defineComponent,
  ref,
  PropType,
  CSSProperties,
  computed,
  nextTick
} from 'vue'
import commonProps from '../../tag/src/common-props'
import { AddIcon } from '../../_base/icons'
import { NButton } from '../../button'
import { InputRef, NInput } from '../../input'
import { NTag } from '../../tag'
import { NBaseIcon } from '../../_base'
import { useTheme, useFormItem, useLocale } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, call, MaybeArray, smallerSize } from '../../_utils'
import { dynamicTagsLight } from '../styles'
import type { DynamicTagsTheme } from '../styles'

import type { OnUpdateValue } from './interface'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'DynamicTags',
  props: {
    ...(useTheme.props as ThemeProps<DynamicTagsTheme>),
    ...commonProps,
    closable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array as PropType<string[]>,
      default: () => {
        return []
      }
    },
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
    const localizedAddRef = computed(() => {
      return locale.value.add
    })
    const inputSizeRef = computed(() => {
      return smallerSize(props.size)
    })
    function doChange (value: string[]): void {
      const { onChange, 'onUpdate:value': onUpdateValue } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onChange) call(onChange, value)
      if (onUpdateValue) call(onUpdateValue, value)
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function handleCloseClick (index: number): void {
      const tags = props.value.slice(0)
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
        const tags = props.value.slice(0)
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
        {this.value.map((tag, index) => (
          <NTag
            key={index}
            unstableTheme={mergedTheme.peers.Tag}
            unstableThemeOverrides={mergedTheme.overrides.Tag}
            style={this.tagStyle}
            type={this.type}
            round={this.round}
            size={this.size}
            closable={this.closable}
            disabled={this.disabled}
            onClose={() => this.handleCloseClick(index)}
          >
            {{ defualt: () => tag }}
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
            unstableTheme={mergedTheme.peers.Input}
            unstableThemeOverrides={mergedTheme.overrides.Input}
            style={this.inputStyle}
            size={this.inputSize}
            placeholder=""
            onKeyup={this.handleInputKeyUp}
            onBlur={this.handleInputBlur}
          />
        ) : (
          <NButton
            dashed
            unstableTheme={this.mergedTheme.peers.Button}
            unstableThemeOverrides={this.mergedTheme.overrides.Button}
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
