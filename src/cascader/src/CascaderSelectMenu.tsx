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
import { createTreeMate } from 'treemate'
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
  BaseOption,
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
    show: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    tmNodes: {
      type: Array as PropType<TmNode[]>,
      default: () => []
    },
    filter: {
      type: Function as PropType<Filter>,
      default: (pattern: string, _: BaseOption, path: BaseOption[]) =>
        path.some((option) => option.label && ~option.label.indexOf(pattern))
    }
  },
  setup (props) {
    const {
      isMountedRef,
      leafOnlyRef,
      mergedValueRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      syncSelectMenuPosition,
      closeMenu,
      handleSelectMenuClickOutside,
      doUncheck: cascaderDoUncheck,
      doCheck: cascaderDoCheck
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(cascaderInjectionKey)!
    const menuInstRef = ref<InternalSelectMenuRef | null>(null)
    const selectOptionsRef = computed(() => {
      return createSelectOptions(props.tmNodes, leafOnlyRef.value)
    })
    const filteredSelectOptionsRef = computed(() => {
      const { filter, pattern } = props
      return selectOptionsRef.value
        .filter((option) => {
          return filter(
            pattern,
            { label: option.label, value: option.value },
            option.path
          )
        })
        .map((option) => ({
          value: option.value,
          label: option.label
        }))
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
    function handleToggleOption (option: BaseOption): void {
      doCheck(option)
    }
    function doCheck (option: BaseOption): void {
      if (props.multiple) {
        const { value: mergedValue } = mergedValueRef
        if (Array.isArray(mergedValue)) {
          if (!mergedValue.includes(option.value)) {
            cascaderDoCheck(option.value)
          } else {
            cascaderDoUncheck(option.value)
          }
        } else if (mergedValue === null) {
          cascaderDoCheck(option.value)
        }
      } else {
        cascaderDoCheck(option.value)
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
        const pendingOptionData = menuInstRef.value?.getPendingOption()
        if (pendingOptionData) {
          doCheck(pendingOptionData)
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
      handleToggleOption,
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
                  onMenuToggleOption={this.handleToggleOption}
                />,
                [[clickoutside, this.handleClickOutside]]
              )
              : null
        }}
      </Transition>
    )
  }
})
