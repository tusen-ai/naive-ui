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
import { isSubmenuNode, isGroupNode, isDividerNode } from './utils'
import { dropdownInjectionKey } from './Dropdown'
import {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption
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
    const { renderIconRef } = inject(dropdownInjectionKey)!
    provide(dropdownMenuInjectionKey, {
      showIconRef: computed(() => {
        const renderIcon = renderIconRef.value
        return props.tmNodes.some((tmNode) => {
          const { rawNode } = tmNode
          if (isGroupNode(rawNode)) {
            return (rawNode as DropdownGroupOption).children.some((rawChild) =>
              renderIcon ? renderIcon(rawChild) : rawChild.icon
            )
          }
          return renderIcon ? renderIcon(rawNode) : rawNode.icon
        })
      }),
      hasSubmenuRef: computed(() => {
        return props.tmNodes.some((tmNode) => {
          const { rawNode } = tmNode
          if (isGroupNode(rawNode)) {
            return (rawNode as DropdownGroupOption).children.some((rawChild) =>
              isSubmenuNode(rawChild)
            )
          }
          return isSubmenuNode(rawNode)
        })
      })
    })
  },
  render () {
    const { parentKey, clsPrefix } = this
    return (
      <div class={`${clsPrefix}-dropdown-menu`}>
        {this.tmNodes.map((tmNode) => {
          if (isDividerNode(tmNode.rawNode)) {
            return <NDropdownDivider clsPrefix={clsPrefix} key={tmNode.key} />
          }
          if (isGroupNode(tmNode.rawNode)) {
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
