import {
  h,
  computed,
  inject,
  ref,
  Transition,
  defineComponent,
  provide,
  reactive,
  PropType,
  InjectionKey
} from 'vue'
import { VBinder, VTarget, VFollower, FollowerPlacement } from 'vueuc'
import { useMemo } from 'vooks'
import { ChevronRightIcon } from '../../_internal/icons'
import { useDeferredTrue } from '../../_utils/composable'
import { render } from '../../_utils'
import { NIcon } from '../../icon'
import NDropdownMenu, { dropdownMenuInjectionKey } from './DropdownMenu'
import { dropdownInjectionKey } from './Dropdown'
import { isSubmenuNode } from './utils'
import { TreeNode } from 'treemate'
import {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption
} from './interface'

interface NDropdownOptionInjection {
  enteringSubmenu: boolean
}

const dropdownOptionInjectionKey: InjectionKey<NDropdownOptionInjection> = Symbol(
  'dropdown-option'
)

export default defineComponent({
  name: 'DropdownOption',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object as PropType<
      TreeNode<DropdownOption, DropdownGroupOption, DropdownIgnoredOption>
      >,
      required: true
    },
    parentKey: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    },
    placement: {
      type: String as PropType<FollowerPlacement>,
      default: 'right-start'
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDropdown = inject(dropdownInjectionKey)!
    const NDropdownOption = inject(dropdownOptionInjectionKey, null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDropdownMenu = inject(dropdownMenuInjectionKey)!
    const rawNodeRef = computed(() => props.tmNode.rawNode)
    const hasSubmenuRef = computed(() => {
      return isSubmenuNode(props.tmNode.rawNode)
    })
    const showSubmenuRef = computed(() => {
      if (!hasSubmenuRef.value) return false
      const {
        hoverKey,
        keyboardKey,
        lastToggledSubmenuKey,
        pendingKeyPath
      } = NDropdown
      const { key } = props.tmNode
      if (hoverKey !== null) return pendingKeyPath.includes(key)
      if (keyboardKey !== null) {
        return (
          pendingKeyPath.includes(key) &&
          pendingKeyPath[pendingKeyPath.length - 1] !== key
        )
      }
      if (lastToggledSubmenuKey !== null) return pendingKeyPath.includes(key)
      return false
    })
    const shouldDelayRef = computed(() => {
      return NDropdown.keyboardKey === null && !NDropdown.animated
    })
    const deferredShowSubmenuRef = useDeferredTrue(
      showSubmenuRef,
      300,
      shouldDelayRef
    )
    const parentEnteringSubmenuRef = computed(() => {
      return !!NDropdownOption?.enteringSubmenu
    })
    const enteringSubmenuRef = ref(false)
    provide(
      dropdownOptionInjectionKey,
      reactive({
        enteringSubmenu: enteringSubmenuRef
      })
    )
    // methods
    function handleSubmenuBeforeEnter (): void {
      enteringSubmenuRef.value = true
    }
    function handleSubmenuAfterEnter (): void {
      enteringSubmenuRef.value = false
    }
    function handleMouseEnter (): void {
      const { parentKey, tmNode } = props
      if (!NDropdown.mergedShow) return
      NDropdown.lastToggledSubmenuKey = parentKey
      NDropdown.keyboardKey = null
      NDropdown.hoverKey = tmNode.key
    }
    function handleMouseMove (): void {
      const { tmNode } = props
      if (!NDropdown.mergedShow) return
      if (NDropdown.hoverKey === tmNode.key) return
      handleMouseEnter()
    }
    function handleMouseLeave (e: MouseEvent): void {
      if (!NDropdown.mergedShow) return
      const { relatedTarget } = e
      if (
        relatedTarget &&
        !(relatedTarget as HTMLElement).hasAttribute('__dropdown-option')
      ) {
        NDropdown.hoverKey = null
      }
    }
    function handleClick (): void {
      const { value: hasSubmenu } = hasSubmenuRef
      const { tmNode } = props
      if (!NDropdown.mergedShow) return
      if (!hasSubmenu && !tmNode.disabled) {
        NDropdown.doSelect(
          tmNode.key,
          ((tmNode as unknown) as TreeNode<DropdownOption>).rawNode
        )
        NDropdown.doUpdateShow(false)
      }
    }
    return {
      NDropdown,
      NDropdownMenu,
      mergedShowSubmenu: computed(() => {
        return deferredShowSubmenuRef.value && !parentEnteringSubmenuRef.value
      }),
      rawNode: rawNodeRef,
      hasSubmenu: hasSubmenuRef,
      pending: useMemo(() => {
        const { pendingKeyPath } = NDropdown
        const { key } = props.tmNode
        return pendingKeyPath.includes(key)
      }),
      active: useMemo(() => {
        const { activeKeyPath } = NDropdown
        const { key } = props.tmNode
        return activeKeyPath.includes(key)
      }),
      handleClick,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave,
      handleSubmenuBeforeEnter,
      handleSubmenuAfterEnter
    }
  },
  render () {
    const {
      NDropdown: { animated },
      rawNode,
      mergedShowSubmenu,
      clsPrefix
    } = this
    const submenuVNode = mergedShowSubmenu
      ? h(NDropdownMenu, {
        clsPrefix,
        tmNodes: this.tmNode.children,
        parentKey: this.tmNode.key
      })
      : null
    return (
      <div class={`${clsPrefix}-dropdown-option`}>
        <div
          class={[
            `${clsPrefix}-dropdown-option-body`,
            {
              [`${clsPrefix}-dropdown-option-body--pending`]: this.pending,
              [`${clsPrefix}-dropdown-option-body--active`]: this.active
            }
          ]}
          onMousemove={this.handleMouseMove}
          onMouseenter={this.handleMouseEnter}
          onMouseleave={this.handleMouseLeave}
          onClick={this.handleClick}
        >
          <div
            __dropdown-option
            class={[
              `${clsPrefix}-dropdown-option-body__prefix`,
              {
                [`${clsPrefix}-dropdown-option-body__prefix--show-icon`]: this
                  .NDropdownMenu.showIcon
              }
            ]}
          >
            {h(render, { render: rawNode.icon })}
          </div>
          <div
            __dropdown-option
            class={`${clsPrefix}-dropdown-option-body__label`}
          >
            {/* TODO: Workaround, menu campatible */}
            {h(render, { render: rawNode.label ?? rawNode.title })}
          </div>
          <div
            __dropdown-option
            class={[
              `${clsPrefix}-dropdown-option-body__suffix`,
              {
                [`${clsPrefix}-dropdown-option-body__suffix--has-submenu`]: this
                  .NDropdownMenu.hasSubmenu
              }
            ]}
          >
            {this.hasSubmenu ? (
              <NIcon>
                {{
                  default: () => <ChevronRightIcon />
                }}
              </NIcon>
            ) : null}
          </div>
        </div>
        {this.hasSubmenu ? (
          <VBinder>
            {{
              default: () => [
                <VTarget>
                  {{
                    default: () => (
                      <div class={`${clsPrefix}-dropdown-offset-container`}>
                        <VFollower
                          show={this.mergedShowSubmenu}
                          placement={this.placement}
                          teleportDisabled
                        >
                          {{
                            default: () => {
                              return (
                                <div
                                  class={`${clsPrefix}-dropdown-menu-wrapper`}
                                >
                                  {animated ? (
                                    <Transition
                                      onBeforeEnter={
                                        this.handleSubmenuBeforeEnter
                                      }
                                      onAfterEnter={
                                        this.handleSubmenuAfterEnter
                                      }
                                      name="n-fade-in-scale-up-transition"
                                      appear
                                    >
                                      {{
                                        default: () => submenuVNode
                                      }}
                                    </Transition>
                                  ) : (
                                    submenuVNode
                                  )}
                                </div>
                              )
                            }
                          }}
                        </VFollower>
                      </div>
                    )
                  }}
                </VTarget>
              ]
            }}
          </VBinder>
        ) : null}
      </div>
    )
  }
})
