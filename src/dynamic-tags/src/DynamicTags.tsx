import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { InputInst, InputProps } from '../../input'
import type { DynamicTagsTheme } from '../styles'
import type {
  DynamicTagsInputSlotProps,
  DynamicTagsOption,
  DynamicTagsTriggerSlotProps,
  OnCreate,
  OnUpdateValue,
  OnUpdateValueImpl
} from './interface'
import { useMergedState } from 'vooks'
import {
  computed,
  type CSSProperties,
  defineComponent,
  h,
  nextTick,
  type PropType,
  ref,
  type SlotsType,
  toRef,
  type VNode,
  type VNodeChild,
  watchEffect
} from 'vue'
import { NBaseIcon } from '../../_internal'
import { AddIcon } from '../../_internal/icons'
import {
  useConfig,
  useFormItem,
  useLocale,
  useTheme,
  useThemeClass
} from '../../_mixins'
import { call, smallerSize, warnOnce } from '../../_utils'
import { NButton } from '../../button'
import { NInput } from '../../input'
import { NSpace } from '../../space'
import { NTag } from '../../tag'
import commonProps from '../../tag/src/common-props'
import { dynamicTagsLight } from '../styles'
import style from './styles/index.cssr'

export const dynamicTagsProps = {
  ...(useTheme.props as ThemeProps<DynamicTagsTheme>),
  ...commonProps,
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  closable: {
    type: Boolean,
    default: true
  },
  defaultValue: {
    type: Array as PropType<Array<string | DynamicTagsOption>>,
    default: () => []
  },
  value: Array as PropType<Array<string | DynamicTagsOption>>,
  draggable: {
    type: Boolean,
    default: false
  },
  inputClass: String,
  inputStyle: [String, Object] as PropType<string | CSSProperties>,
  inputProps: Object as PropType<InputProps>,
  max: Number as PropType<number>,
  tagClass: String,
  tagStyle: [String, Object] as PropType<string | CSSProperties>,
  renderTag: Function as PropType<
    | ((tag: string, index: number) => VNodeChild)
    | ((tag: DynamicTagsOption, index: number) => VNodeChild)
  >,
  onCreate: {
    type: Function as PropType<OnCreate>,
    default: (label: string) => label
  },
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  // deprecated
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>
}

export type DynamicTagsProps = ExtractPublicPropTypes<typeof dynamicTagsProps>

export interface DynamicTagsSlots {
  input?: (props: DynamicTagsInputSlotProps) => VNode[]
  trigger?: (props: DynamicTagsTriggerSlotProps) => VNode[]
  default?: () => VNode[]
}

export default defineComponent({
  name: 'DynamicTags',
  props: dynamicTagsProps,
  slots: Object as SlotsType<DynamicTagsSlots>,
  setup(props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'dynamic-tags',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const { localeRef } = useLocale('DynamicTags')
    const formItem = useFormItem(props)
    const { mergedDisabledRef } = formItem
    const inputValueRef = ref('')
    const showInputRef = ref(false)
    const inputForceFocusedRef = ref(true)
    const inputInstRef = ref<InputInst | null>(null)
    const themeRef = useTheme(
      'DynamicTags',
      '-dynamic-tags',
      style,
      dynamicTagsLight,
      props,
      mergedClsPrefixRef
    )
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const localizedAddRef = computed(() => {
      return localeRef.value.add
    })
    const inputSizeRef = computed(() => {
      return smallerSize(props.size)
    })
    const triggerDisabledRef = computed(() => {
      return (
        mergedDisabledRef.value
        || (!!props.max && mergedValueRef.value.length >= props.max)
      )
    })
    function doChange(value: Array<string | DynamicTagsOption>): void {
      const {
        onChange,
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onChange)
        call(onChange as OnUpdateValueImpl, value)
      if (onUpdateValue)
        call(onUpdateValue as OnUpdateValueImpl, value)
      if (_onUpdateValue)
        call(_onUpdateValue as OnUpdateValueImpl, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function handleCloseClick(index: number): void {
      const tags = mergedValueRef.value.slice(0)
      tags.splice(index, 1)
      doChange(tags)
    }
    function handleInputKeyDown(e: KeyboardEvent): void {
      switch (e.key) {
        case 'Enter':
          handleInputConfirm()
      }
    }
    function handleInputConfirm(externalValue?: string): void {
      const nextValue = externalValue ?? inputValueRef.value
      if (nextValue) {
        const tags = mergedValueRef.value.slice(0)
        tags.push(props.onCreate(nextValue))
        doChange(tags)
      }
      showInputRef.value = false
      inputForceFocusedRef.value = true
      inputValueRef.value = ''
    }
    function handleInputBlur(): void {
      handleInputConfirm()
    }
    function handleAddClick(): void {
      showInputRef.value = true
      void nextTick(() => {
        inputInstRef.value?.focus()
        inputForceFocusedRef.value = false
      })
    }
    const cssVarsRef = computed(() => {
      const {
        self: { inputWidth }
      } = themeRef.value
      return {
        '--n-input-width': inputWidth
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('dynamic-tags', undefined, cssVarsRef, props)
      : undefined

    const mergedDraggerRef = computed(() => {
      return (
        props.draggable
        && !mergedDisabledRef.value
        && mergedValueRef.value.length > 1
      )
    })
    const dragIndex = ref(-1)

    const handleOnDragStart = (index: number) => {
      dragIndex.value = index
    }

    const handleOnDropEnd = () => {
      dragIndex.value = -1
    }

    function handleOnDragenter(event: DragEvent, targetIndex: number) {
      event.preventDefault()
      if (dragIndex.value < 0 || dragIndex.value === targetIndex)
        return
      if (targetIndex === undefined) {
        return
      }
      const str = JSON.stringify(mergedValueRef.value)
      const ls: Array<any> = JSON.parse(str)
      ;[ls[dragIndex.value], ls[targetIndex]] = [
        ls[targetIndex],
        ls[dragIndex.value]
      ]
      if (str === JSON.stringify(ls))
        return
      doChange(ls)
      dragIndex.value = targetIndex
    }

    function handleOnDragover(event: DragEvent) {
      event.preventDefault()
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      inputInstRef,
      localizedAdd: localizedAddRef,
      inputSize: inputSizeRef,
      inputValue: inputValueRef,
      showInput: showInputRef,
      inputForceFocused: inputForceFocusedRef,
      mergedValue: mergedValueRef,
      mergedDisabled: mergedDisabledRef,
      triggerDisabled: triggerDisabledRef,
      mergedDragger: mergedDraggerRef,
      handleInputKeyDown,
      handleAddClick,
      handleInputBlur,
      handleCloseClick,
      handleInputConfirm,
      handleOnDragStart,
      handleOnDropEnd,
      handleOnDragenter,
      handleOnDragover,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const {
      cssVars,
      mergedClsPrefix,
      onRender,
      renderTag,
      mergedTheme,
      tagClass,
      tagStyle,
      type,
      round,
      size,
      color,
      closable,
      mergedDisabled,
      showInput,
      inputValue,
      inputClass,
      inputStyle,
      inputSize,
      inputForceFocused,
      triggerDisabled,
      mergedDragger,
      handleInputKeyDown,
      handleInputBlur,
      handleAddClick,
      handleCloseClick,
      handleInputConfirm,
      handleOnDragStart,
      handleOnDropEnd,
      handleOnDragover,
      handleOnDragenter,
      $slots
    } = this
    onRender?.()
    return (
      <NSpace
        class={[`${mergedClsPrefix}-dynamic-tags`, this.themeClass]}
        size="small"
        style={cssVars as any}
        theme={mergedTheme.peers.Space}
        wrap-item={false}
        themeOverrides={mergedTheme.peerOverrides.Space}
      >
        {{
          default: () => [
            this.mergedValue.map((tag, index) => {
              const baseProps = {
                key: typeof tag === 'string' ? tag : tag.value || index
              }

              const draggableProps = mergedDragger
                ? {
                    class: `${mergedClsPrefix}-dynamic-tag-move`,
                    draggable: true,
                    onDragstart: () => handleOnDragStart(index),
                    onDragend: handleOnDropEnd,
                    onDragover: handleOnDragover,
                    onDragenter: (e: DragEvent) => handleOnDragenter(e, index)
                  }
                : {}

              const itemProps = { ...baseProps, ...draggableProps }

              const renderTagItem = () => {
                return renderTag ? (
                  renderTag(tag as string & DynamicTagsOption, index)
                ) : (
                  <NTag
                    key={index}
                    theme={mergedTheme.peers.Tag}
                    themeOverrides={mergedTheme.peerOverrides.Tag}
                    class={tagClass}
                    style={tagStyle}
                    type={type}
                    round={round}
                    size={size}
                    color={color}
                    closable={closable}
                    disabled={mergedDisabled}
                    onClose={() => {
                      handleCloseClick(index)
                    }}
                  >
                    {{
                      default: () => (typeof tag === 'string' ? tag : tag.label)
                    }}
                  </NTag>
                )
              }
              return mergedDragger ? (
                <div {...itemProps}>{renderTagItem()}</div>
              ) : (
                renderTagItem()
              )
            }),

            showInput ? (
              $slots.input ? (
                $slots.input({
                  submit: handleInputConfirm,
                  deactivate: handleInputBlur
                })
              ) : (
                <NInput
                  placeholder=""
                  size={inputSize}
                  style={inputStyle}
                  class={inputClass}
                  autosize
                  {...this.inputProps}
                  ref="inputInstRef"
                  value={inputValue}
                  onUpdateValue={(v) => {
                    this.inputValue = v
                  }}
                  theme={mergedTheme.peers.Input}
                  themeOverrides={mergedTheme.peerOverrides.Input}
                  onKeydown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  internalForceFocus={inputForceFocused}
                />
              )
            ) : $slots.trigger ? (
              $slots.trigger({
                activate: handleAddClick,
                disabled: triggerDisabled
              })
            ) : (
              <NButton
                dashed
                disabled={triggerDisabled}
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
                size={inputSize}
                onClick={handleAddClick}
              >
                {{
                  icon: () => (
                    <NBaseIcon clsPrefix={mergedClsPrefix}>
                      {{ default: () => <AddIcon /> }}
                    </NBaseIcon>
                  )
                }}
              </NButton>
            )
          ]
        }}
      </NSpace>
    )
  }
})
