/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  computed,
  defineComponent,
  inject,
  PropType,
  toRef,
  watch,
  nextTick,
  watchEffect
} from 'vue'
import { createTreeMate, TreeNode } from 'treemate'
import { happensIn } from 'seemly'
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
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>
} as const

export const panelPropKeys = keysOf(panelProps)

export default defineComponent({
  name: 'PopselectPanel',
  props: panelProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warn(
            'popselect',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NPopselect = inject(popselectInjectionKey)!

    const { mergedClsPrefixRef } = useConfig(props)

    const treeMateRef = computed(() => {
      return createTreeMate<
      SelectBaseOption,
      SelectGroupOption,
      SelectIgnoredOption
      >(props.options, tmOptions)
    })

    function doUpdateValue (
      value: Value | null,
      option: SelectBaseOption | null | SelectBaseOption[]
    ): void {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value, option)
      if (_onUpdateValue) {
        call(_onUpdateValue as OnUpdateValueImpl, value, option)
      }
      if (onChange) call(onChange as OnUpdateValueImpl, value, option)
    }
    function handleToggle (tmNode: TreeNode<SelectBaseOption>): void {
      toggle(tmNode.key)
    }
    function handleMenuMousedown (e: MouseEvent): void {
      if (!happensIn(e, 'action')) e.preventDefault()
    }
    function toggle (value: ValueAtom): void {
      const {
        value: { getNode }
      } = treeMateRef
      if (props.multiple) {
        if (Array.isArray(props.value)) {
          const newValue: ValueAtom[] = []
          const newOptions: SelectBaseOption[] = []
          let shouldAddValue = true
          props.value.forEach((v) => {
            if (v === value) {
              shouldAddValue = false
              return
            }
            const tmNode = getNode(v)
            if (tmNode) {
              newValue.push(tmNode.key)
              newOptions.push(tmNode.rawNode)
            }
          })
          if (shouldAddValue) {
            newValue.push(value)
            newOptions.push(getNode(value)!.rawNode)
          }
          doUpdateValue(newValue, newOptions)
        } else {
          const tmNode = getNode(value)
          if (tmNode) {
            doUpdateValue([value], [tmNode.rawNode])
          }
        }
      } else {
        if (props.value === value && props.cancelable) {
          doUpdateValue(null, null)
        } else {
          const tmNode = getNode(value)
          if (tmNode) {
            doUpdateValue(value, tmNode.rawNode)
          }
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
      treeMate: treeMateRef,
      handleToggle,
      handleMenuMousedown
    }
  },
  render () {
    return (
      <NInternalSelectMenu
        clsPrefix={this.mergedClsPrefix}
        focusable
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
        onToggle={this.handleToggle}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseenter}
        onMousedown={this.handleMenuMousedown}
      >
        {this.$slots}
      </NInternalSelectMenu>
    )
  }
})
