import {
  h,
  Transition,
  ref,
  inject,
  toRef,
  defineComponent,
  PropType,
  computed,
  watch,
  nextTick,
  withDirectives
} from 'vue'
import { clickoutside } from 'vdirs'
import { createTreeMate, TreeNode } from 'treemate'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../select/src/interface'
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
import { tmOptions } from '../../select/src/utils'

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
    filter: {
      type: Function as PropType<Filter>,
      default: (pattern: string, _: CascaderOption, path: CascaderOption[]) =>
        path.some((option) => option.label && ~option.label.indexOf(pattern))
    },
    labelField: {
      type: String,
      default: 'label'
    }
  },
  setup (props) {
    const {
      isMountedRef,
      mergedValueRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      mergedCheckStrategyRef,
      syncSelectMenuPosition,
      closeMenu,
      handleSelectMenuClickOutside,
      doUncheck: cascaderDoUncheck,
      doCheck: cascaderDoCheck
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(cascaderInjectionKey)!
    const menuInstRef = ref<InternalSelectMenuRef | null>(null)
    const selectOptionsRef = computed(() => {
      return createSelectOptions(
        props.tmNodes,
        mergedCheckStrategyRef.value === 'child',
        props.labelField
      )
    })
    const filteredSelectOptionsRef = computed(() => {
      const { filter, pattern } = props
      if (pattern) {
        return selectOptionsRef.value
          .filter((option) => {
            return filter(
              pattern,
              { label: option.label as string, value: option.value },
              option.path
            )
          })
          .map((option) => ({
            value: option.value,
            label: option.label
          }))
      }
      return []
    })
    const selectTreeMateRef = computed(() => {
      return createTreeMate<
      SelectBaseOption,
      SelectGroupOption,
      SelectIgnoredOption
      >(filteredSelectOptionsRef.value, tmOptions)
    })
    watch(toRef(props, 'value'), () => {
      void nextTick(() => {
        syncSelectMenuPosition()
      })
    })
    watch(filteredSelectOptionsRef, () => {
      void nextTick(() => {
        syncSelectMenuPosition()
      })
    })
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
      handleToggle,
      handleClickOutside,
      ...exposedRef
    }
  },
  render () {
    const { mergedClsPrefix, isMounted, mergedTheme } = this
    return (
      <Transition name="fade-in-scale-up-transition" appear={isMounted}>
        {{
          default: () =>
            this.show
              ? withDirectives(
                  <NInternalSelectMenu
                    ref="menuInstRef"
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
                  />,
                  [[clickoutside, this.handleClickOutside]]
              )
              : null
        }}
      </Transition>
    )
  }
})
