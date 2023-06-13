import {
  computed,
  defineComponent,
  h,
  inject,
  type PropType,
  provide,
  type Ref,
  type CSSProperties,
  ref
} from 'vue'
import type { TreeNode } from 'treemate'
import { renderArrow } from '../../popover/src/PopoverBody'
import { NxScrollbar } from '../../_internal/scrollbar'
import NDropdownDivider from './DropdownDivider'
// eslint-disable-next-line import/no-cycle
import NDropdownGroup from './DropdownGroup'
// eslint-disable-next-line import/no-cycle
import NDropdownOption from './DropdownOption'
import NDropdownRenderOption from './DropdownRenderOption'
import {
  isSubmenuNode,
  isGroupNode,
  isDividerNode,
  isRenderNode
} from './utils'
import { dropdownInjectionKey, dropdownMenuInjectionKey } from './context'
import type {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption,
  DropdownRenderOption
} from './interface'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { popoverBodyInjectionKey } from '../../popover/src/interface'

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
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
  render () {
    const { parentKey, clsPrefix, scrollable } = this
    const menuOptionsNode = this.tmNodes.map((tmNode) => {
      const { rawNode } = tmNode
      if (rawNode.show === false) return null
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
            arrowStyle: this.arrowStyle
          })
          : null}
      </div>
    )
  }
})
