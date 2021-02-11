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
  provide,
  reactive,
  VNode
} from 'vue'
import { useMergedState } from 'vooks'
import { createId } from 'seemly'
import { RemoveIcon, AddIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import { NButton, NButtonGroup } from '../../button'
import { useTheme, useLocale, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, call, MaybeArray } from '../../_utils'
import { dynamicInputLight } from '../styles'
import type { DynamicInputTheme } from '../styles'
import NDynamicInputInputPreset from './InputPreset'
import NDynamicInputPairPreset from './PairPreset'
import style from './styles/index.cssr'
import { DynamicInputInjection, OnUpdateValue } from './interface'

const globalDataKeyMap = new WeakMap()

interface FormItemInjection {
  path?: string
}

export default defineComponent({
  name: 'DynamicInput',
  props: {
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
      type: Function as PropType<MaybeArray<OnUpdateValue>>,
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
  },
  setup (props, { slots }) {
    const { NConfigProvider } = useConfig()
    const NFormItem = inject<FormItemInjection | null>('NFormItem', null)
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
      props
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
    provide<DynamicInputInjection>(
      'NDynamicInput',
      reactive({
        mergedTheme: themeRef,
        keyPlaceholder: toRef(props, 'keyPlaceholder'),
        valuePlaceholder: toRef(props, 'valuePlaceholder'),
        placeholder: toRef(props, 'placeholder')
      })
    )
    return {
      ...useLocale('DynamicInput'),
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
      <div class="n-dynamic-input" style={this.cssVars as CSSProperties}>
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
                <NBaseIcon>{{ default: () => <AddIcon /> }}</NBaseIcon>
              )
            }}
          </NButton>
        ) : (
          mergedValue.map((_, index) => (
            <div
              key={keyField ? _[keyField] : ensureKey(_, index)}
              data-key={keyField ? _[keyField] : ensureKey(_, index)}
              class="n-dynamic-input-item"
              style={itemStyle}
            >
              {$slots.default ? (
                renderSlot($slots, 'default', {
                  value: mergedValue[index],
                  index
                })
              ) : preset === 'input' ? (
                <NDynamicInputInputPreset
                  value={mergedValue[index]}
                  parentPath={NFormItem ? NFormItem.path : undefined}
                  path={
                    NFormItem?.path ? `${NFormItem.path}[${index}]` : undefined
                  }
                  onUpdateValue={(v) => handleValueChange(index, v)}
                />
              ) : preset === 'pair' ? (
                <NDynamicInputPairPreset
                  value={mergedValue[index]}
                  parentPath={NFormItem ? NFormItem.path : undefined}
                  path={
                    NFormItem?.path ? `${NFormItem.path}[${index}]` : undefined
                  }
                  onUpdateValue={(v) => handleValueChange(index, v)}
                />
              ) : null}
              <div class="n-dynamic-input-item__action">
                <NButtonGroup size={buttonSize}>
                  {{
                    default: () =>
                      [
                        !this.removeDisabled ? (
                          <NButton
                            theme={mergedTheme.peers.Button}
                            themeOverrides={mergedTheme.peerOverrides.Button}
                            circle
                            onClick={() => remove(index)}
                          >
                            {{
                              icon: () => (
                                <NBaseIcon>
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
                              <NBaseIcon>
                                {{ default: () => <AddIcon /> }}
                              </NBaseIcon>
                            )
                          }}
                        </NButton>
                      ] as VNode[]
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
