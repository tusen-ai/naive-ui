import type { TreeNode } from 'treemate'
import type { SelectOption } from '../../../select/src/interface'
import { useMemo } from 'vooks'
import {
  defineComponent,
  h,
  inject,
  type PropType,
  type Ref,
  Transition,
  type VNode
} from 'vue'
import { mergeEventHandlers, render } from '../../../_utils'
import { NBaseIcon } from '../../icon'
import { CheckmarkIcon } from '../../icons'
import {
  internalSelectionMenuInjectionKey,
  type RenderLabelImpl,
  type RenderOptionImpl
} from './interface'

function renderCheckMark(show: boolean, clsPrefix: string): VNode {
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
                default: () => h(CheckmarkIcon)
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
  setup(props) {
    const {
      valueRef,
      pendingTmNodeRef,
      multipleRef,
      valueSetRef,
      renderLabelRef,
      renderOptionRef,
      labelFieldRef,
      valueFieldRef,
      showCheckmarkRef,
      nodePropsRef,
      handleOptionClick,
      handleOptionMouseEnter
    } = inject(internalSelectionMenuInjectionKey)!
    const isPendingRef = useMemo(() => {
      const { value: pendingTmNode } = pendingTmNodeRef
      if (!pendingTmNode)
        return false
      return props.tmNode.key === pendingTmNode.key
    })
    function handleClick(e: MouseEvent): void {
      const { tmNode } = props
      if (tmNode.disabled)
        return
      handleOptionClick(e, tmNode)
    }
    function handleMouseEnter(e: MouseEvent): void {
      const { tmNode } = props
      if (tmNode.disabled)
        return
      handleOptionMouseEnter(e, tmNode)
    }
    function handleMouseMove(e: MouseEvent): void {
      const { tmNode } = props
      const { value: isPending } = isPendingRef
      if (tmNode.disabled || isPending)
        return
      handleOptionMouseEnter(e, tmNode)
    }
    return {
      multiple: multipleRef,
      isGrouped: useMemo(() => {
        const { tmNode } = props
        const { parent } = tmNode
        return parent && parent.rawNode.type === 'group'
      }),
      showCheckmark: showCheckmarkRef,
      nodeProps: nodePropsRef,
      isPending: isPendingRef,
      isSelected: useMemo(() => {
        const { value } = valueRef
        const { value: multiple } = multipleRef
        if (value === null)
          return false
        const optionValue = props.tmNode.rawNode[
          valueFieldRef.value
        ] as NonNullable<SelectOption['value']>
        if (multiple) {
          const { value: valueSet } = valueSetRef
          return valueSet.has(optionValue)
        }
        else {
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
  render() {
    const {
      clsPrefix,
      tmNode: { rawNode },
      isSelected,
      isPending,
      isGrouped,
      showCheckmark,
      nodeProps,
      renderOption,
      renderLabel,
      handleClick,
      handleMouseEnter,
      handleMouseMove
    } = this
    const checkmark = renderCheckMark(isSelected, clsPrefix)
    const children = renderLabel
      ? [renderLabel(rawNode, isSelected), showCheckmark && checkmark]
      : [
          render(
            rawNode[this.labelField] as SelectOption['label'],
            rawNode,
            isSelected
          ),
          showCheckmark && checkmark
        ]
    const attrs = nodeProps?.(rawNode)
    const node = (
      <div
        {...attrs}
        class={[
          `${clsPrefix}-base-select-option`,
          rawNode.class,
          attrs?.class,
          {
            [`${clsPrefix}-base-select-option--disabled`]: rawNode.disabled,
            [`${clsPrefix}-base-select-option--selected`]: isSelected,
            [`${clsPrefix}-base-select-option--grouped`]: isGrouped,
            [`${clsPrefix}-base-select-option--pending`]: isPending,
            [`${clsPrefix}-base-select-option--show-checkmark`]: showCheckmark
          }
        ]}
        style={[attrs?.style || '', rawNode.style || '']}
        onClick={mergeEventHandlers([handleClick, attrs?.onClick])}
        onMouseenter={mergeEventHandlers([
          handleMouseEnter,
          attrs?.onMouseenter
        ])}
        onMousemove={mergeEventHandlers([handleMouseMove, attrs?.onMousemove])}
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
