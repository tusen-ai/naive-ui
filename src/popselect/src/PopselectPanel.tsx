import {
  h,
  computed,
  defineComponent,
  inject,
  PropType,
  toRef,
  watch,
  nextTick
} from 'vue'
import { createTreeMate } from 'treemate'
import { RenderLabel } from '../../_internal/select-menu/src/interface'
import { tmOptions } from '../../select/src/utils'
import {
  OnUpdateValue,
  OnUpdateValueImpl,
  Value,
  SelectMixedOption,
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption,
  ValueAtom
} from '../../select/src/interface'
import { useConfig } from '../../_mixins'
import { NInternalSelectMenu } from '../../_internal'
import { call, keysOf, warn } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import type { PopselectSize } from './interface'
import { popselectInjectionKey } from './interface'

export const panelProps = {
  multiple: Boolean,
  value: {
    type: [String, Number, Array] as PropType<Value | null>,
    default: null
  },
  cancelable: Boolean,
  width: [Number, String] as PropType<string | number>,
  options: {
    type: Array as PropType<SelectMixedOption[]>,
    default: () => []
  },
  size: {
    type: String as PropType<PopselectSize>,
    default: 'medium'
  },
  scrollable: Boolean,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>,
  renderLabel: Function as PropType<RenderLabel>,
  // deprecated
  onChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>,
    validator: () => {
      warn(
        'popselect',
        '`on-change` is deprecated, please use `on-update:value` instead.'
      )
      return true
    },
    default: undefined
  }
} as const

export const panelPropKeys = keysOf(panelProps)

export default defineComponent({
  name: 'PopselectPanel',
  props: panelProps,
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NPopselect = inject(popselectInjectionKey)!

    const { mergedClsPrefixRef } = useConfig(props)

    function doUpdateValue (value: Value | null): void {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value)
      if (onChange) call(onChange as OnUpdateValueImpl, value)
    }
    function handleMenuToggleOption (option: SelectBaseOption): void {
      toggle(option.value)
    }
    function toggle (value: ValueAtom): void {
      if (props.multiple) {
        if (Array.isArray(props.value)) {
          const validValues = new Set(
            props.options.map((option) => option.value)
          )
          const newValue = props.value.filter((v) => validValues.has(v))
          const index = newValue.findIndex((v) => v === value)
          if (~index) {
            newValue.splice(index, 1)
          } else {
            newValue.push(value)
          }
          doUpdateValue(newValue)
        } else {
          doUpdateValue([value])
        }
      } else {
        if (props.value === value && props.cancelable) {
          doUpdateValue(null)
        } else {
          doUpdateValue(value)
          NPopselect.setShow(false)
        }
      }
      void nextTick(() => {
        NPopselect.syncPosition()
      })
    }
    watch(toRef(props, 'options'), () => {
      void nextTick(() => {
        NPopselect.syncPosition()
      })
    })
    return {
      mergedTheme: NPopselect.mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      treeMate: computed(() => {
        return createTreeMate<
        SelectBaseOption,
        SelectGroupOption,
        SelectIgnoredOption
        >(props.options, tmOptions)
      }),
      handleMenuToggleOption
    }
  },
  render () {
    return (
      <NInternalSelectMenu
        clsPrefix={this.mergedClsPrefix}
        theme={this.mergedTheme.peers.InternalSelectMenu}
        themeOverrides={this.mergedTheme.peerOverrides.InternalSelectMenu}
        multiple={this.multiple}
        treeMate={this.treeMate}
        size={this.size}
        value={this.value}
        width={this.width}
        virtualScroll={false}
        scrollable={this.scrollable}
        renderLabel={this.renderLabel}
        onMenuToggleOption={this.handleMenuToggleOption}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseenter}
      />
    )
  }
})
