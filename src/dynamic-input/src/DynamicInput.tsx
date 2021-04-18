import {
  h,
  ref,
  toRef,
  isProxy,
  toRaw,
  computed,
  defineComponent,
  renderSlot,
  PropType,
  inject,
  CSSProperties,
  provide
} from 'vue'
import { useMergedState } from 'vooks'
import { createId } from 'seemly'
import { RemoveIcon, AddIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import { NButton, NButtonGroup } from '../../button'
import { useTheme, useLocale, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, call, MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { formItemInjectionKey } from '../../_mixins/use-form-item'
import { dynamicInputLight } from '../styles'
import type { DynamicInputTheme } from '../styles'
import NDynamicInputInputPreset from './InputPreset'
import NDynamicInputPairPreset from './PairPreset'
import { dynamicInputInjectionKey } from './interface'
import type { OnUpdateValue } from './interface'
import style from './styles/index.cssr'

const globalDataKeyMap = new WeakMap()

const dynamicInputProps = {
  ...(useTheme.props as ThemeProps<DynamicInputTheme>),
  max: Number,
  min: {
    type: Number,
    default: 0
  },
  value: Array as PropType<any[]>,
  // TODO: make it robust for different types
  defaultValue: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  preset: {
    type: String as PropType<'input' | 'pair'>,
    default: 'input'
  },
  keyField: String,
  itemStyle: [String, Object] as PropType<string | CSSProperties>,
  // for preset pair
  keyPlaceholder: {
    type: String,
    default: ''
  },
  valuePlaceholder: {
    type: String,
    default: ''
  },
  // for preset input
  placeholder: {
    type: String,
    default: ''
  },
  onCreate: Function as PropType<(index: number) => any>,
  onRemove: Function as PropType<(index: number) => void>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  // deprecated
  onClear: {
    type: Function as PropType<() => void>,
    validator: () => {
      warn(
        'dynamic-input',
        '`on-clear` is deprecated, it is out of usage anymore.'
      )
      return true
    },
    default: undefined
  },
  onInput: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'dynamic-input',
          '`on-input` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type DynamicInputProps = ExtractPublicPropTypes<typeof dynamicInputProps>

export default defineComponent({
  name: 'DynamicInput',
  props: dynamicInputProps,
  setup (props, { slots }) {
    const { NConfigProvider, mergedClsPrefix } = useConfig()
    const NFormItem = inject(formItemInjectionKey, null)
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const themeRef = useTheme(
      'DynamicInput',
      'DynamicInput',
      style,
      dynamicInputLight,
      props,
      mergedClsPrefix
    )
    const insertionDisabledRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) {
        const { max } = props
        return max !== undefined && mergedValue.length >= max
      }
      return false
    })
    const removeDisabledRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) return mergedValue.length <= props.min
      return true
    })
    function doUpdateValue (value: any[]): void {
      const { onInput, 'onUpdate:value': _onUpdateValue, onUpdateValue } = props
      if (onInput) call(onInput, value)
      if (_onUpdateValue) call(_onUpdateValue, value)
      if (onUpdateValue) call(onUpdateValue, value)
      uncontrolledValueRef.value = value
    }
    function ensureKey (value: any, index: number): string | number {
      if (value === undefined || value === null) return index
      if (typeof value !== 'object') return index
      const rawValue = isProxy(value) ? toRaw(value) : value
      let key = globalDataKeyMap.get(rawValue)
      if (key === undefined) {
        globalDataKeyMap.set(rawValue, (key = createId()))
      }
      return key
    }
    function handleValueChange (index: number, value: any): void {
      const { value: mergedValue } = mergedValueRef
      const newValue = Array.from(mergedValue ?? [])
      const originalItem = newValue[index]
      newValue[index] = value
      // update dataKeyMap
      if (
        originalItem &&
        value &&
        typeof originalItem === 'object' &&
        typeof value === 'object'
      ) {
        const rawOriginal = isProxy(originalItem)
          ? toRaw(originalItem)
          : originalItem
        const rawNew = isProxy(value) ? toRaw(value) : value
        // inherit key is value position is not change
        const originalKey = globalDataKeyMap.get(rawOriginal)
        if (originalKey !== undefined) {
          globalDataKeyMap.set(rawNew, originalKey)
        }
      }
      doUpdateValue(newValue)
    }
    function handleCreateClick (): void {
      createItem(0)
    }
    function createItem (index: number): void {
      const { value: mergedValue } = mergedValueRef
      const { onCreate } = props
      const newValue = Array.from(mergedValue ?? [])
      if (onCreate) {
        newValue.splice(index + 1, 0, onCreate(index + 1))
        doUpdateValue(newValue)
      } else if (slots.default) {
        newValue.splice(index + 1, 0, null)
        doUpdateValue(newValue)
      } else {
        switch (props.preset) {
          case 'input':
            newValue.splice(index + 1, 0, '')
            doUpdateValue(newValue)
            break
          case 'pair':
            newValue.splice(index + 1, 0, { key: '', value: '' })
            doUpdateValue(newValue)
            break
        }
      }
    }
    function remove (index: number): void {
      const { value: mergedValue } = mergedValueRef
      if (!Array.isArray(mergedValue)) return
      const { min } = props
      if (mergedValue.length <= min) return
      const newValue = Array.from(mergedValue)
      newValue.splice(index, 1)
      doUpdateValue(newValue)
      const { onRemove } = props
      if (onRemove) onRemove(index)
    }
    provide(dynamicInputInjectionKey, {
      mergedThemeRef: themeRef,
      keyPlaceholderRef: toRef(props, 'keyPlaceholder'),
      valuePlaceholderRef: toRef(props, 'valuePlaceholder'),
      placeholderRef: toRef(props, 'placeholder')
    })
    return {
      ...useLocale('DynamicInput'),
      cPrefix: mergedClsPrefix,
      NConfigProvider,
      NFormItem,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      insertionDisabled: insertionDisabledRef,
      removeDisabled: removeDisabledRef,
      handleCreateClick,
      ensureKey,
      handleValueChange,
      remove,
      createItem,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          self: { actionMargin }
        } = themeRef.value
        return {
          '--action-margin': actionMargin
        }
      })
    }
  },
  render () {
    const {
      cPrefix,
      mergedValue,
      locale,
      mergedTheme,
      keyField,
      $slots,
      preset,
      itemStyle,
      NFormItem,
      ensureKey,
      handleValueChange,
      remove,
      createItem
    } = this
    const buttonSize = this.NConfigProvider?.mergedComponentProps?.DynamicInput
      ?.buttonSize
    return (
      <div
        class={`${cPrefix}-dynamic-input`}
        style={this.cssVars as CSSProperties}
      >
        {!Array.isArray(mergedValue) || mergedValue.length === 0 ? (
          <NButton
            block
            ghost
            dashed
            size={buttonSize}
            theme={mergedTheme.peers.Button}
            themeOverrides={mergedTheme.peerOverrides.Button}
            onClick={this.handleCreateClick}
          >
            {{
              default: () => locale.create,
              icon: () => (
                <NBaseIcon clsPrefix={cPrefix}>
                  {{ default: () => <AddIcon /> }}
                </NBaseIcon>
              )
            }}
          </NButton>
        ) : (
          mergedValue.map((_, index) => (
            <div
              key={keyField ? _[keyField] : ensureKey(_, index)}
              data-key={keyField ? _[keyField] : ensureKey(_, index)}
              class={`${cPrefix}-dynamic-input-item`}
              style={itemStyle}
            >
              {$slots.default ? (
                renderSlot($slots, 'default', {
                  value: mergedValue[index],
                  index
                })
              ) : preset === 'input' ? (
                <NDynamicInputInputPreset
                  clsPrefix={cPrefix}
                  value={mergedValue[index]}
                  parentPath={NFormItem ? NFormItem.path.value : undefined}
                  path={
                    NFormItem?.path.value
                      ? `${NFormItem.path.value}[${index}]`
                      : undefined
                  }
                  onUpdateValue={(v) => handleValueChange(index, v)}
                />
              ) : preset === 'pair' ? (
                <NDynamicInputPairPreset
                  clsPrefix={cPrefix}
                  value={mergedValue[index]}
                  parentPath={NFormItem ? NFormItem.path.value : undefined}
                  path={
                    NFormItem?.path.value
                      ? `${NFormItem.path.value}[${index}]`
                      : undefined
                  }
                  onUpdateValue={(v) => handleValueChange(index, v)}
                />
              ) : null}
              <div class={`${cPrefix}-dynamic-input-item__action`}>
                <NButtonGroup size={buttonSize}>
                  {{
                    default: () => [
                      !this.removeDisabled ? (
                        <NButton
                          theme={mergedTheme.peers.Button}
                          themeOverrides={mergedTheme.peerOverrides.Button}
                          circle
                          onClick={() => remove(index)}
                        >
                          {{
                            icon: () => (
                              <NBaseIcon clsPrefix={cPrefix}>
                                {{ default: () => <RemoveIcon /> }}
                              </NBaseIcon>
                            )
                          }}
                        </NButton>
                      ) : null,
                      <NButton
                        disabled={this.insertionDisabled}
                        circle
                        theme={mergedTheme.peers.Button}
                        themeOverrides={mergedTheme.peerOverrides.Button}
                        onClick={() => createItem(index)}
                      >
                        {{
                          icon: () => (
                            <NBaseIcon clsPrefix={cPrefix}>
                              {{ default: () => <AddIcon /> }}
                            </NBaseIcon>
                          )
                        }}
                      </NButton>
                    ]
                  }}
                </NButtonGroup>
              </div>
            </div>
          ))
        )}
      </div>
    )
  }
})
