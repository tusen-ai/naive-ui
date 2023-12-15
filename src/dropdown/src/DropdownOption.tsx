import {
  h,
  computed,
  inject,
  ref,
  Transition,
  defineComponent,
  provide,
  type PropType,
  type Ref,
  mergeProps,
  type HTMLAttributes,
  type VNodeChild
} from 'vue'
import { VBinder, VTarget, VFollower, type FollowerPlacement } from 'vueuc'
import { useMemo } from 'vooks'
import { ChevronRightIcon } from '../../_internal/icons'
import { render, useDeferredTrue } from '../../_utils'
import { NIcon } from '../../icon'
// eslint-disable-next-line import/no-cycle
import NDropdownMenu from './DropdownMenu'
import {
  dropdownMenuInjectionKey,
  dropdownInjectionKey,
  dropdownOptionInjectionKey
} from './context'
import { popoverBodyInjectionKey } from '../../popover/src/interface'
import { isSubmenuNode } from './utils'
import type { TreeNode } from 'treemate'
import type {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption
} from './interface'
import { happensIn } from 'seemly'

export interface NDropdownOptionInjection {
  enteringSubmenuRef: Ref<boolean>
}

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
    },
    props: Object as PropType<HTMLAttributes>,
    scrollable: Boolean
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
      mergedShowRef,
      renderLabelRef,
      renderIconRef,
      labelFieldRef,
      childrenFieldRef,
      renderOptionRef,
      nodePropsRef,
      menuPropsRef
    } = NDropdown
    const NDropdownOption = inject(dropdownOptionInjectionKey, null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDropdownMenu = inject(dropdownMenuInjectionKey)!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NPopoverBody = inject(popoverBodyInjectionKey)!
    const rawNodeRef = computed(() => props.tmNode.rawNode)
    const hasSubmenuRef = computed(() => {
      const { value: childrenField } = childrenFieldRef
      return isSubmenuNode(props.tmNode.rawNode, childrenField)
    })
    const mergedDisabledRef = computed(() => {
      const { disabled } = props.tmNode
      return disabled
    })
    const showSubmenuRef = computed(() => {
      if (!hasSubmenuRef.value) return false
      const { key, disabled } = props.tmNode
      if (disabled) return false
      const { value: hoverKey } = hoverKeyRef
      const { value: keyboardKey } = keyboardKeyRef
      const { value: lastToggledSubmenuKey } = lastToggledSubmenuKeyRef
      const { value: pendingKeyPath } = pendingKeyPathRef
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
      if (tmNode.disabled) return
      if (!mergedShowRef.value) return
      lastToggledSubmenuKeyRef.value = parentKey
      keyboardKeyRef.value = null
      hoverKeyRef.value = tmNode.key
    }
    function handleMouseMove (): void {
      const { tmNode } = props
      if (tmNode.disabled) return
      if (!mergedShowRef.value) return
      if (hoverKeyRef.value === tmNode.key) return
      handleMouseEnter()
    }
    function handleMouseLeave (e: MouseEvent): void {
      if (props.tmNode.disabled) return
      if (!mergedShowRef.value) return
      const { relatedTarget } = e
      if (
        relatedTarget &&
        !happensIn({ target: relatedTarget }, 'dropdownOption') &&
        !happensIn({ target: relatedTarget }, 'scrollbarRail')
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
          (tmNode as unknown as TreeNode<DropdownOption>).rawNode
        )
        NDropdown.doUpdateShow(false)
      }
    }

    return {
      labelField: labelFieldRef,
      renderLabel: renderLabelRef,
      renderIcon: renderIconRef,
      siblingHasIcon: NDropdownMenu.showIconRef,
      siblingHasSubmenu: NDropdownMenu.hasSubmenuRef,
      menuProps: menuPropsRef,
      popoverBody: NPopoverBody,
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
      mergedDisabled: mergedDisabledRef,
      renderOption: renderOptionRef,
      nodeProps: nodePropsRef,
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
      siblingHasSubmenu,
      renderLabel,
      renderIcon,
      renderOption,
      nodeProps,
      props,
      scrollable
    } = this
    let submenuVNode: VNodeChild = null
    if (mergedShowSubmenu) {
      const submenuNodeProps = this.menuProps?.(
        rawNode,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        rawNode.children as any
      )
      submenuVNode = (
        <NDropdownMenu
          {...submenuNodeProps}
          clsPrefix={clsPrefix}
          scrollable={this.scrollable}
          tmNodes={this.tmNode.children}
          parentKey={this.tmNode.key}
        />
      )
    }

    const builtinProps: HTMLAttributes = {
      class: [
        `${clsPrefix}-dropdown-option-body`,
        this.pending && `${clsPrefix}-dropdown-option-body--pending`,
        this.active && `${clsPrefix}-dropdown-option-body--active`,
        this.childActive && `${clsPrefix}-dropdown-option-body--child-active`,
        this.mergedDisabled && `${clsPrefix}-dropdown-option-body--disabled`
      ],
      onMousemove: this.handleMouseMove,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onClick: this.handleClick
    }
    const optionNodeProps = nodeProps?.(rawNode)
    const node = (
      <div
        class={[`${clsPrefix}-dropdown-option`, optionNodeProps?.class]}
        data-dropdown-option
        {...optionNodeProps}
      >
        {h('div', mergeProps(builtinProps as any, props as any), [
          <div
            class={[
              `${clsPrefix}-dropdown-option-body__prefix`,
              siblingHasIcon &&
                `${clsPrefix}-dropdown-option-body__prefix--show-icon`
            ]}
          >
            {[renderIcon ? renderIcon(rawNode) : render(rawNode.icon)]}
          </div>,
          <div
            data-dropdown-option
            class={`${clsPrefix}-dropdown-option-body__label`}
          >
            {/* TODO: Workaround, menu compatible */}
            {renderLabel
              ? renderLabel(rawNode)
              : render(rawNode[this.labelField] ?? rawNode.title)}
          </div>,
          <div
            data-dropdown-option
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
        ])}
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
                          to={
                            scrollable
                              ? this.popoverBody || undefined
                              : undefined
                          }
                          teleportDisabled={!scrollable}
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
    if (renderOption) {
      return renderOption({ node, option: rawNode })
    }
    return node
  }
})
