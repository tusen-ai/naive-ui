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
import { NInternalSelectMenu } from '../../_internal'
import { call, keysOf, warn } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import type { PopselectSize, PopselectInjection } from './interface'
import {
  OnUpdateValue,
  Value,
  SelectMixedOption,
  SelectOption,
  SelectGroupOption,
  SelectIgnoredOption,
  ValueAtom
} from '../../select/src/interface'
import { tmOptions } from '../../select/src/utils'

export const panelProps = {
  multiple: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number, Array] as PropType<Value | null>,
    default: null
  },
  cancelable: {
    type: Boolean,
    default: false
  },
  width: [Number, String] as PropType<string | number>,
  options: {
    type: Array as PropType<SelectMixedOption[]>,
    required: true
  },
  size: {
    type: String as PropType<PopselectSize>,
    default: 'medium'
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
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
    const NPopselect = inject<PopselectInjection>(
      'NPopselect'
    ) as PopselectInjection

    function doUpdateValue (value: Value | null): void {
      const { 'onUpdate:value': onUpdateValue, onChange } = props
      if (onUpdateValue) call(onUpdateValue, value)
      if (onChange) call(onChange, value)
    }
    function handleMenuToggleOption (option: SelectOption): void {
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
      NPopselect,
      treeMate: computed(() => {
        return createTreeMate<
        SelectOption,
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
        theme={this.NPopselect.mergedTheme.peers.InternalSelectMenu}
        themeOverrides={
          this.NPopselect.mergedTheme.peerOverrides.InternalSelectMenu
        }
        multiple={this.multiple}
        treeMate={this.treeMate}
        size={this.size}
        value={this.value}
        width={this.width}
        virtualScroll={false}
        scrollable={this.scrollable}
        onMenuToggleOption={this.handleMenuToggleOption}
      />
    )
  }
})
