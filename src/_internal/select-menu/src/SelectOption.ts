import {
  h,
  inject,
  toRef,
  defineComponent,
  Transition,
  PropType,
  VNode
} from 'vue'
import { InternalSelectMenuInjection } from './SelectMenu'
import { TreeNode } from 'treemate'
import { useMemo } from 'vooks'
import type { SelectBaseOption } from '../../../select'
import { CheckmarkIcon } from '../../icons'
import NBaseIcon from '../../icon'

const checkMark = h(NBaseIcon, null, {
  default: () => h(CheckmarkIcon)
})

function renderCheckMark (show: boolean): VNode {
  return h(
    Transition,
    {
      name: 'n-fade-in-scale-up-transition',
      class: 'n-base-select-option__check'
    },
    {
      default: () => (show ? checkMark : null)
    }
  )
}

export default defineComponent({
  name: 'NBaseSelectOption',
  props: {
    tmNode: {
      type: Object as PropType<TreeNode<SelectBaseOption>>,
      required: true
    }
  },
  setup (props) {
    const NInternalSelectMenu = inject<InternalSelectMenuInjection>(
      'NInternalSelectMenu'
    ) as InternalSelectMenuInjection
    const rawNodeRef = toRef(props.tmNode, 'rawNode')
    const isPendingRef = useMemo(() => {
      const { pendingTmNode } = NInternalSelectMenu
      if (!pendingTmNode) return false
      return props.tmNode.key === pendingTmNode.key
    })
    function handleClick (e: MouseEvent): void {
      const { tmNode } = props
      if (tmNode.disabled) return
      NInternalSelectMenu.handleOptionClick(e, tmNode)
    }
    function handleMouseEnter (e: MouseEvent): void {
      const { tmNode } = props
      if (tmNode.disabled) return
      NInternalSelectMenu.handleOptionMouseEnter(e, tmNode)
    }
    function handleMouseMove (e: MouseEvent): void {
      const { tmNode } = props
      const { value: isPending } = isPendingRef
      if (tmNode.disabled || isPending) return
      NInternalSelectMenu.handleOptionMouseEnter(e, tmNode)
    }
    return {
      NInternalSelectMenu,
      rawNode: rawNodeRef,
      isGrouped: useMemo(() => {
        const { tmNode } = props
        const { parent } = tmNode
        return parent && parent.rawNode.type === 'group'
      }),
      isPending: isPendingRef,
      isSelected: useMemo(() => {
        const { multiple, value } = NInternalSelectMenu
        if (value === null) return false
        const optionValue = rawNodeRef.value.value
        if (multiple) {
          const { valueSet } = NInternalSelectMenu
          return valueSet.has(optionValue)
        } else {
          return value === optionValue
        }
      }),
      handleMouseMove,
      handleMouseEnter,
      handleClick
    }
  },
  render () {
    const {
      rawNode,
      isSelected,
      isPending,
      isGrouped,
      handleClick,
      handleMouseEnter,
      handleMouseMove,
      NInternalSelectMenu: { multiple }
    } = this
    const showCheckMark = multiple && isSelected
    const children = rawNode.render
      ? [rawNode.render(rawNode, isSelected), renderCheckMark(showCheckMark)]
      : [rawNode.label, renderCheckMark(showCheckMark)]
    return h(
      'div',
      {
        class: [
          'n-base-select-option',
          [
            rawNode.class,
            {
              'n-base-select-option--disabled': rawNode.disabled,
              'n-base-select-option--selected': isSelected,
              'n-base-select-option--grouped': isGrouped,
              'n-base-select-option--pending': isPending
            }
          ]
        ],
        style: rawNode.style,
        onClick: handleClick,
        onMouseenter: handleMouseEnter,
        onMousemove: handleMouseMove
      },
      children
    )
  }
})
