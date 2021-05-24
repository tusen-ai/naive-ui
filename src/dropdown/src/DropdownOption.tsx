import {
  h,
  computed,
  inject,
  ref,
  Transition,
  defineComponent,
  provide,
  PropType,
  InjectionKey,
  Ref
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
  enteringSubmenuRef: Ref<boolean>
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
    const {
      hoverKeyRef,
      keyboardKeyRef,
      lastToggledSubmenuKeyRef,
      pendingKeyPathRef,
      activeKeyPathRef,
      animatedRef,
      mergedShowRef
    } = NDropdown
    const NDropdownOption = inject(dropdownOptionInjectionKey, null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDropdownMenu = inject(dropdownMenuInjectionKey)!
    const rawNodeRef = computed(() => props.tmNode.rawNode)
    const hasSubmenuRef = computed(() => {
      return isSubmenuNode(props.tmNode.rawNode)
    })
    const showSubmenuRef = computed(() => {
      if (!hasSubmenuRef.value) return false
      const { value: hoverKey } = hoverKeyRef
      const { value: keyboardKey } = keyboardKeyRef
      const { value: lastToggledSubmenuKey } = lastToggledSubmenuKeyRef
      const { value: pendingKeyPath } = pendingKeyPathRef
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
      return keyboardKeyRef.value === null && !animatedRef.value
    })
    const deferredShowSubmenuRef = useDeferredTrue(
      showSubmenuRef,
      300,
      shouldDelayRef
    )
    const parentEnteringSubmenuRef = computed(() => {
      return !!NDropdownOption?.enteringSubmenuRef.value
    })
    const enteringSubmenuRef = ref(false)
    provide(dropdownOptionInjectionKey, {
      enteringSubmenuRef
    })
    // methods
    function handleSubmenuBeforeEnter (): void {
      enteringSubmenuRef.value = true
    }
    function handleSubmenuAfterEnter (): void {
      enteringSubmenuRef.value = false
    }
    function handleMouseEnter (): void {
      const { parentKey, tmNode } = props
      if (!mergedShowRef.value) return
      lastToggledSubmenuKeyRef.value = parentKey
      keyboardKeyRef.value = null
      hoverKeyRef.value = tmNode.key
    }
    function handleMouseMove (): void {
      const { tmNode } = props
      if (!mergedShowRef.value) return
      if (hoverKeyRef.value === tmNode.key) return
      handleMouseEnter()
    }
    function handleMouseLeave (e: MouseEvent): void {
      if (!mergedShowRef.value) return
      const { relatedTarget } = e
      if (
        relatedTarget &&
        !(relatedTarget as HTMLElement).hasAttribute('__dropdown-option')
      ) {
        hoverKeyRef.value = null
      }
    }
    function handleClick (): void {
      const { value: hasSubmenu } = hasSubmenuRef
      const { tmNode } = props
      if (!mergedShowRef.value) return
      if (!hasSubmenu && !tmNode.disabled) {
        NDropdown.doSelect(
          tmNode.key,
          ((tmNode as unknown) as TreeNode<DropdownOption>).rawNode
        )
        NDropdown.doUpdateShow(false)
      }
    }
    return {
      siblingHasIcon: NDropdownMenu.showIconRef,
      siblingHasSubmenu: NDropdownMenu.hasSubmenuRef,
      animated: animatedRef,
      mergedShowSubmenu: computed(() => {
        return deferredShowSubmenuRef.value && !parentEnteringSubmenuRef.value
      }),
      rawNode: rawNodeRef,
      hasSubmenu: hasSubmenuRef,
      pending: useMemo(() => {
        const { value: pendingKeyPath } = pendingKeyPathRef
        const { key } = props.tmNode
        return pendingKeyPath.includes(key)
      }),
      childActive: useMemo(() => {
        const { value: activeKeyPath } = activeKeyPathRef
        const { key } = props.tmNode
        const index = activeKeyPath.findIndex((k) => key === k)
        if (index === -1) return false
        return index < activeKeyPath.length - 1
      }),
      active: useMemo(() => {
        const { value: activeKeyPath } = activeKeyPathRef
        const { key } = props.tmNode
        const index = activeKeyPath.findIndex((k) => key === k)
        if (index === -1) return false
        return index === activeKeyPath.length - 1
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
      animated,
      rawNode,
      mergedShowSubmenu,
      clsPrefix,
      siblingHasIcon,
      siblingHasSubmenu
    } = this
    const submenuVNode = mergedShowSubmenu ? (
      <NDropdownMenu
        clsPrefix={clsPrefix}
        tmNodes={this.tmNode.children}
        parentKey={this.tmNode.key}
      />
    ) : null
    return (
      <div class={`${clsPrefix}-dropdown-option`}>
        <div
          class={[
            `${clsPrefix}-dropdown-option-body`,
            {
              [`${clsPrefix}-dropdown-option-body--pending`]: this.pending,
              [`${clsPrefix}-dropdown-option-body--active`]: this.active,
              [`${clsPrefix}-dropdown-option-body--child-active`]: this
                .childActive
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
              siblingHasIcon &&
                `${clsPrefix}-dropdown-option-body__prefix--show-icon`
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
              siblingHasSubmenu &&
                `${clsPrefix}-dropdown-option-body__suffix--has-submenu`
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
                                      name="fade-in-scale-up-transition"
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
