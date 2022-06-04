import {
  h,
  inject,
  defineComponent,
  Transition,
  PropType,
  VNode,
  Ref
} from 'vue'
import { TreeNode } from 'treemate'
import { useMemo } from 'vooks'
import type { SelectOption } from '../../../select/src/interface'
import { render } from '../../../_utils'
import { CheckmarkIcon } from '../../icons'
import NBaseIcon from '../../icon'
import {
  RenderLabelImpl,
  internalSelectionMenuInjectionKey,
  RenderOptionImpl
} from './interface'

const checkMarkIcon = h(CheckmarkIcon)

function renderCheckMark (show: boolean, clsPrefix: string): VNode {
  return (
    <Transition name="fade-in-scale-up-transition">
      {{
        default: () =>
          show ? (
            <NBaseIcon
              clsPrefix={clsPrefix}
              class={`${clsPrefix}-base-select-option__check`}
            >
              {{
                default: () => checkMarkIcon
              }}
            </NBaseIcon>
          ) : null
      }}
    </Transition>
  )
}

export default defineComponent({
  name: 'NBaseSelectOption',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object as PropType<TreeNode<SelectOption>>,
      required: true
    }
  },
  setup (props) {
    const {
      valueRef,
      pendingTmNodeRef,
      multipleRef,
      valueSetRef,
      renderLabelRef,
      renderOptionRef,
      labelFieldRef,
      valueFieldRef,
      handleOptionClick,
      handleOptionMouseEnter
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(internalSelectionMenuInjectionKey)!
    const isPendingRef = useMemo(() => {
      const { value: pendingTmNode } = pendingTmNodeRef
      if (!pendingTmNode) return false
      return props.tmNode.key === pendingTmNode.key
    })
    function handleClick (e: MouseEvent): void {
      const { tmNode } = props
      if (tmNode.disabled) return
      handleOptionClick(e, tmNode)
    }
    function handleMouseEnter (e: MouseEvent): void {
      const { tmNode } = props
      if (tmNode.disabled) return
      handleOptionMouseEnter(e, tmNode)
    }
    function handleMouseMove (e: MouseEvent): void {
      const { tmNode } = props
      const { value: isPending } = isPendingRef
      if (tmNode.disabled || isPending) return
      handleOptionMouseEnter(e, tmNode)
    }
    return {
      multiple: multipleRef,
      isGrouped: useMemo(() => {
        const { tmNode } = props
        const { parent } = tmNode
        return parent && parent.rawNode.type === 'group'
      }),
      isPending: isPendingRef,
      isSelected: useMemo(() => {
        const { value } = valueRef
        const { value: multiple } = multipleRef
        if (value === null) return false
        const optionValue = props.tmNode.rawNode[
          valueFieldRef.value
        ] as NonNullable<SelectOption['value']>
        if (multiple) {
          const { value: valueSet } = valueSetRef
          return valueSet.has(optionValue)
        } else {
          return value === optionValue
        }
      }),
      labelField: labelFieldRef,
      renderLabel: renderLabelRef as Ref<RenderLabelImpl | undefined>,
      renderOption: renderOptionRef as Ref<RenderOptionImpl | undefined>,
      handleMouseMove,
      handleMouseEnter,
      handleClick
    }
  },
  render () {
    const {
      clsPrefix,
      tmNode: { rawNode },
      isSelected,
      isPending,
      isGrouped,
      renderOption,
      renderLabel,
      handleClick,
      handleMouseEnter,
      handleMouseMove
    } = this
    const checkmark = renderCheckMark(isSelected, clsPrefix)
    const children = renderLabel
      ? [renderLabel(rawNode, isSelected), checkmark]
      : [
          render(
            rawNode[this.labelField] as SelectOption['label'],
            rawNode,
            isSelected
          ),
          checkmark
        ]
    const node = (
      <div
        class={[
          `${clsPrefix}-base-select-option`,
          rawNode.class,
          {
            [`${clsPrefix}-base-select-option--disabled`]: rawNode.disabled,
            [`${clsPrefix}-base-select-option--selected`]: isSelected,
            [`${clsPrefix}-base-select-option--grouped`]: isGrouped,
            [`${clsPrefix}-base-select-option--pending`]: isPending
          }
        ]}
        style={rawNode.style}
        onClick={handleClick}
        onMouseenter={handleMouseEnter}
        onMousemove={handleMouseMove}
      >
        <div class={`${clsPrefix}-base-select-option__content`}>{children}</div>
      </div>
    )
    return rawNode.render
      ? rawNode.render({ node, option: rawNode, selected: isSelected })
      : renderOption
        ? renderOption({ node, option: rawNode, selected: isSelected })
        : node
  }
})
