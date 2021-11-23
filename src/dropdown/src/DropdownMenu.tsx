import {
  computed,
  defineComponent,
  h,
  inject,
  InjectionKey,
  PropType,
  provide,
  Ref,
  CSSProperties
} from 'vue'
import { TreeNode } from 'treemate'
import { renderArrow } from '../../popover/src/PopoverBody'
import NDropdownOption from './DropdownOption'
import NDropdownDivider from './DropdownDivider'
import NDropdownGroup from './DropdownGroup'
import NDropdownRenderOption from './DropdownRenderOption'
import {
  isSubmenuNode,
  isGroupNode,
  isDividerNode,
  isRenderNode
} from './utils'
import { dropdownInjectionKey } from './Dropdown'
import {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption,
  DropdownRenderOption
} from './interface'

export interface NDropdownMenuInjection {
  showIconRef: Ref<boolean>
  hasSubmenuRef: Ref<boolean>
}

export const dropdownMenuInjectionKey: InjectionKey<NDropdownMenuInjection> =
  Symbol('dropdownMenu')

export default defineComponent({
  name: 'DropdownMenu',
  props: {
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
  },
  render () {
    const { parentKey, clsPrefix } = this
    return (
      <div class={`${clsPrefix}-dropdown-menu`}>
        {this.tmNodes.map((tmNode) => {
          const { rawNode } = tmNode
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
            />
          )
        })}
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
