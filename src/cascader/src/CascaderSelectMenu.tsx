import {
  h,
  Transition,
  ref,
  inject,
  defineComponent,
  PropType,
  computed,
  withDirectives
} from 'vue'
import { clickoutside } from 'vdirs'
import { createTreeMate, TreeNode } from 'treemate'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../select/src/interface'
import { createTmOptions } from '../../select/src/utils'
import { InternalSelectMenuRef, NInternalSelectMenu } from '../../_internal'
import { createSelectOptions } from './utils'
import {
  TmNode,
  Value,
  Filter,
  CascaderOption,
  SelectMenuInstance,
  cascaderInjectionKey
} from './interface'
import { resolveSlot } from '../../_utils'

export default defineComponent({
  name: 'NCascaderSelectMenu',
  props: {
    value: {
      type: [String, Number, Array] as PropType<Value | null>,
      default: null
    },
    show: Boolean,
    pattern: {
      type: String,
      default: ''
    },
    multiple: Boolean,
    tmNodes: {
      type: Array as PropType<TmNode[]>,
      default: () => []
    },
    filter: Function as PropType<Filter>,
    labelField: {
      type: String,
      required: true
    },
    separator: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const {
      isMountedRef,
      mergedValueRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      mergedCheckStrategyRef,
      slots: cascaderSlots,
      syncSelectMenuPosition,
      closeMenu,
      handleSelectMenuClickOutside,
      doUncheck: cascaderDoUncheck,
      doCheck: cascaderDoCheck,
      clearPattern
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(cascaderInjectionKey)!
    const menuInstRef = ref<InternalSelectMenuRef | null>(null)
    const selectOptionsRef = computed(() => {
      return createSelectOptions(
        props.tmNodes,
        mergedCheckStrategyRef.value === 'child',
        props.labelField,
        props.separator
      )
    })
    const mergedFilterRef = computed(() => {
      const { filter } = props
      if (filter) return filter
      const { labelField } = props
      return (pattern: string, _: CascaderOption, path: CascaderOption[]) =>
        path.some(
          (option) =>
            option[labelField] && ~(option[labelField] as any).indexOf(pattern)
        )
    })
    const filteredSelectOptionsRef = computed(() => {
      const { pattern } = props
      const { value: mergedFilter } = mergedFilterRef
      return (
        pattern
          ? selectOptionsRef.value.filter((option) => {
            return mergedFilter(pattern, option.rawNode, option.path)
          })
          : selectOptionsRef.value
      ).map((option) => ({
        value: option.value,
        label: option.label
      }))
    })
    const selectTreeMateRef = computed(() => {
      return createTreeMate<
      SelectBaseOption,
      SelectGroupOption,
      SelectIgnoredOption
      >(filteredSelectOptionsRef.value, createTmOptions('value', 'children'))
    })
    function handleResize (): void {
      syncSelectMenuPosition()
    }
    function handleToggle (tmNode: TreeNode<SelectBaseOption>): void {
      doCheck(tmNode)
    }
    // We don't care what type the tmNode is, we only care about its key
    function doCheck (tmNode: TreeNode<SelectBaseOption>): void {
      if (props.multiple) {
        const { value: mergedValue } = mergedValueRef
        if (Array.isArray(mergedValue)) {
          if (!mergedValue.includes(tmNode.key)) {
            cascaderDoCheck(tmNode.key)
          } else {
            cascaderDoUncheck(tmNode.key)
          }
        } else if (mergedValue === null) {
          cascaderDoCheck(tmNode.key)
        }
        clearPattern()
      } else {
        cascaderDoCheck(tmNode.key)
        // currently the select menu is set to focusable
        // however just leave it here
        closeMenu(true)
      }
    }
    function prev (): void {
      menuInstRef.value?.prev()
    }
    function next (): void {
      menuInstRef.value?.next()
    }
    function enter (): boolean {
      if (menuInstRef) {
        const pendingOptionTmNode = menuInstRef.value?.getPendingTmNode()
        if (pendingOptionTmNode) {
          doCheck(pendingOptionTmNode)
        }
        return true
      }
      return false
    }
    function handleClickOutside (e: MouseEvent): void {
      handleSelectMenuClickOutside(e)
    }
    const exposedRef: SelectMenuInstance = {
      prev,
      next,
      enter
    }
    return {
      isMounted: isMountedRef,
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      menuInstRef,
      selectTreeMate: selectTreeMateRef,
      handleResize,
      handleToggle,
      handleClickOutside,
      cascaderSlots,
      ...exposedRef
    }
  },
  render () {
    const { mergedClsPrefix, isMounted, mergedTheme, cascaderSlots } = this
    return (
      <Transition name="fade-in-scale-up-transition" appear={isMounted}>
        {{
          default: () =>
            this.show
              ? withDirectives(
                  <NInternalSelectMenu
                    ref="menuInstRef"
                    onResize={this.handleResize}
                    clsPrefix={mergedClsPrefix}
                    class={`${mergedClsPrefix}-cascader-menu`}
                    autoPending
                    themeOverrides={
                      mergedTheme.peerOverrides.InternalSelectMenu
                    }
                    theme={mergedTheme.peers.InternalSelectMenu}
                    treeMate={this.selectTreeMate}
                    multiple={this.multiple}
                    value={this.value}
                    onToggle={this.handleToggle}
                  >
                    {{
                      empty: () =>
                        resolveSlot(cascaderSlots['not-found'], () => [])
                    }}
                  </NInternalSelectMenu>,
                  [
                    [
                      clickoutside,
                      this.handleClickOutside,
                      undefined as unknown as string,
                      { capture: true }
                    ]
                  ]
              )
              : null
        }}
      </Transition>
    )
  }
})
