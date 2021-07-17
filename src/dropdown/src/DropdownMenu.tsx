import {
  computed,
  defineComponent,
  h,
  inject,
  InjectionKey,
  PropType,
  provide,
  Ref
} from 'vue'
import { TreeNode } from 'treemate'
import NDropdownOption from './DropdownOption'
import NDropdownDivider from './DropdownDivider'
import NDropdownGroup from './DropdownGroup'
import { isSubmenuNode, isGroupNode, isDividerNode } from './utils'
import { dropdownInjectionKey } from './Dropdown'
import {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption,
  RenderLabelImpl
} from './interface'

export interface NDropdownMenuInjection {
  showIconRef: Ref<boolean>
  hasSubmenuRef: Ref<boolean>
  renderLabelRef: Ref<RenderLabelImpl | undefined>
}

export const dropdownMenuInjectionKey: InjectionKey<NDropdownMenuInjection> =
  Symbol('dropdownMenu')

export default defineComponent({
  name: 'DropdownMenu',
  props: {
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
    const { renderLabelRef, renderIconRef } = inject(dropdownInjectionKey)!
    const renderIcon = renderIconRef.value
    provide(dropdownMenuInjectionKey, {
      showIconRef: computed(() => {
        return props.tmNodes.some((tmNode) => {
          const { rawNode } = tmNode
          const hasRenderIcon = !!renderIcon?.(rawNode)
          if (isGroupNode(rawNode)) {
            return (
              (rawNode as DropdownGroupOption).children.some(
                (rawChild) => rawChild.icon
              ) || hasRenderIcon
            )
          }
          return hasRenderIcon && renderIconRef.value
            ? renderIconRef.value(rawNode)
            : rawNode.icon
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
      }),
      renderLabelRef: renderLabelRef
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
      </div>
    )
  }
})
