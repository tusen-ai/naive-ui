import type { TreeNode } from 'treemate'
import type {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption,
  DropdownRenderOption
} from './interface'
import {
  computed,
  type CSSProperties,
  defineComponent,
  h,
  inject,
  type PropType,
  provide,
  type Ref,
  ref
} from 'vue'
import { NxScrollbar } from '../../_internal/scrollbar'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { popoverBodyInjectionKey } from '../../popover/src/interface'
import { renderArrow } from '../../popover/src/PopoverBody'

import { dropdownInjectionKey, dropdownMenuInjectionKey } from './context'

import NDropdownDivider from './DropdownDivider'
import NDropdownGroup from './DropdownGroup'
import NDropdownOption from './DropdownOption'
import NDropdownRenderOption from './DropdownRenderOption'
import {
  isDividerNode,
  isGroupNode,
  isRenderNode,
  isSubmenuNode
} from './utils'

export interface NDropdownMenuInjection {
  showIconRef: Ref<boolean>
  hasSubmenuRef: Ref<boolean>
}

export default defineComponent({
  name: 'DropdownMenu',
  props: {
    scrollable: Boolean,
    showArrow: Boolean,
    arrowStyle: [String, Object] as PropType<string | CSSProperties>,
    clsPrefix: {
      type: String,
      required: true
    },
    tmNodes: {
      type: Array as PropType<
        Array<
          TreeNode<DropdownOption, DropdownGroupOption, DropdownIgnoredOption>
        >
      >,
      default: () => []
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  setup(props) {
    const { renderIconRef, childrenFieldRef } = inject(dropdownInjectionKey)!
    provide(dropdownMenuInjectionKey, {
      showIconRef: computed(() => {
        const renderIcon = renderIconRef.value
        return props.tmNodes.some((tmNode) => {
          if (tmNode.isGroup) {
            return tmNode.children?.some(({ rawNode: rawChild }) =>
              renderIcon ? renderIcon(rawChild) : rawChild.icon
            )
          }
          const { rawNode } = tmNode
          return renderIcon ? renderIcon(rawNode) : rawNode.icon
        })
      }),
      hasSubmenuRef: computed(() => {
        const { value: childrenField } = childrenFieldRef
        return props.tmNodes.some((tmNode) => {
          if (tmNode.isGroup) {
            return tmNode.children?.some(({ rawNode: rawChild }) =>
              isSubmenuNode(rawChild, childrenField)
            )
          }
          const { rawNode } = tmNode
          return isSubmenuNode(rawNode, childrenField)
        })
      })
    })
    const bodyRef = ref<HTMLElement | null>(null)
    provide(modalBodyInjectionKey, null)
    provide(drawerBodyInjectionKey, null)
    provide(popoverBodyInjectionKey, bodyRef)
    return {
      bodyRef
    }
  },
  render() {
    const { parentKey, clsPrefix, scrollable } = this
    const menuOptionsNode = this.tmNodes.map((tmNode) => {
      const { rawNode } = tmNode
      if (rawNode.show === false)
        return null
      if (isRenderNode(rawNode)) {
        return (
          <NDropdownRenderOption
            tmNode={tmNode as unknown as TreeNode<DropdownRenderOption>}
            key={tmNode.key}
          />
        )
      }
      if (isDividerNode(rawNode)) {
        return <NDropdownDivider clsPrefix={clsPrefix} key={tmNode.key} />
      }
      if (isGroupNode(rawNode)) {
        return (
          <NDropdownGroup
            clsPrefix={clsPrefix}
            tmNode={tmNode}
            parentKey={parentKey}
            key={tmNode.key}
          />
        )
      }
      return (
        <NDropdownOption
          clsPrefix={clsPrefix}
          tmNode={tmNode}
          parentKey={parentKey}
          key={tmNode.key}
          props={rawNode.props}
          scrollable={scrollable}
        />
      )
    })
    return (
      <div
        class={[
          `${clsPrefix}-dropdown-menu`,
          scrollable && `${clsPrefix}-dropdown-menu--scrollable`
        ]}
        ref="bodyRef"
      >
        {scrollable ? (
          <NxScrollbar contentClass={`${clsPrefix}-dropdown-menu__content`}>
            {{
              default: () => menuOptionsNode
            }}
          </NxScrollbar>
        ) : (
          menuOptionsNode
        )}
        {this.showArrow
          ? renderArrow({
            clsPrefix,
            arrowStyle: this.arrowStyle,
            arrowClass: undefined,
            arrowWrapperClass: undefined,
            arrowWrapperStyle: undefined
          })
          : null}
      </div>
    )
  }
})
