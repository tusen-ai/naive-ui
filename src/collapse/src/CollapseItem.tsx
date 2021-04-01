import { h, defineComponent, PropType, inject, computed, renderSlot } from 'vue'
import { createId } from 'seemly'
import { ChevronRightIcon as ArrowIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import { useInjectionCollection } from '../../_utils/composable'
import NCollapseItemContent from './CollapseItemContent'
import { NCollapseInjection } from './Collapse'
import { useMemo } from 'vooks'

export default defineComponent({
  name: 'CollapseItem',
  props: {
    title: String,
    name: [String, Number],
    displayDirective: String as PropType<'if' | 'show'>
  },
  setup (props) {
    const randomName = createId()
    const mergedNameRef = useMemo(() => {
      return props.name ?? randomName
    })
    const NCollapse = inject<NCollapseInjection>(
      'NCollapse'
    ) as NCollapseInjection
    useInjectionCollection('NCollapse', 'collectedItemNames', mergedNameRef)
    const collapsedRef = computed<boolean>(() => {
      const { expandedNames } = NCollapse
      if (Array.isArray(expandedNames)) {
        const { value: name } = mergedNameRef
        return !~expandedNames.findIndex(
          (expandedName) => expandedName === name
        )
      }
      return true
    })
    return {
      randomName,
      collapsed: collapsedRef,
      mergedDisplayDirective: computed<'if' | 'show'>(() => {
        const { displayDirective } = props
        if (displayDirective) {
          return displayDirective
        } else {
          return NCollapse.displayDirective
        }
      }),
      arrowPlacement: computed<'left' | 'right'>(() => {
        return NCollapse.arrowPlacement
      }),
      handleClick (e: MouseEvent) {
        if (NCollapse) {
          NCollapse.toggleItem(collapsedRef.value, mergedNameRef.value, e)
        }
      }
    }
  },
  render () {
    const {
      $slots,
      arrowPlacement,
      collapsed,
      title,
      mergedDisplayDirective
    } = this
    const headerNode = renderSlot($slots, 'header', undefined, () => [title])
    return (
      <div
        class={[
          'n-collapse-item',
          `n-collapse-item--${arrowPlacement}-arrow-placement`,
          !collapsed && 'n-collapse-item--active'
        ]}
      >
        <div
          class={[
            'n-collapse-item__header',
            !collapsed && 'n-collapse-item__header--active'
          ]}
          onClick={this.handleClick}
        >
          {arrowPlacement === 'right' && headerNode}
          <div class="n-collapse-item-arrow">
            {renderSlot($slots, 'arrow', { collapsed: collapsed }, () => [
              <NBaseIcon>{{ default: () => <ArrowIcon /> }}</NBaseIcon>
            ])}
          </div>
          {arrowPlacement === 'left' && headerNode}
        </div>
        <NCollapseItemContent
          displayDirective={mergedDisplayDirective}
          show={!collapsed}
        >
          {$slots}
        </NCollapseItemContent>
      </div>
    )
  }
})
