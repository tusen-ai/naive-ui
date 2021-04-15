/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { h, defineComponent, PropType, inject, computed, renderSlot } from 'vue'
import { createId } from 'seemly'
import { useMemo } from 'vooks'
import { ChevronRightIcon as ArrowIcon } from '../../_internal/icons'
import { useInjectionCollection } from '../../_utils/composable'
import { NBaseIcon } from '../../_internal'
import { ExtractPublicPropTypes, throwError } from '../../_utils'
import { collapseInjectionKey } from './Collapse'
import NCollapseItemContent from './CollapseItemContent'

const collapseItemProps = {
  title: String,
  name: [String, Number] as PropType<string | number>,
  displayDirective: String as PropType<'if' | 'show'>
} as const

export type CollapseItemProps = ExtractPublicPropTypes<typeof collapseItemProps>

export default defineComponent({
  name: 'CollapseItem',
  props: collapseItemProps,
  setup (props) {
    const randomName = createId()
    const mergedNameRef = useMemo(() => {
      return props.name ?? randomName
    })
    const NCollapse = inject(collapseInjectionKey)
    if (!NCollapse) {
      throwError(
        'collapse-item',
        '`n-collapse-item` must be placed inside `n-collapse`.'
      )
    }
    const { expandedNamesRef, props: collapseProps, clsPrefixRef } = NCollapse
    useInjectionCollection(
      collapseInjectionKey,
      'collectedItemNames',
      mergedNameRef
    )
    const collapsedRef = computed<boolean>(() => {
      const { value: expandedNames } = expandedNamesRef
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
      cPrefix: clsPrefixRef,
      collapsed: collapsedRef,
      mergedDisplayDirective: computed<'if' | 'show'>(() => {
        const { displayDirective } = props
        if (displayDirective) {
          return displayDirective
        } else {
          return collapseProps.displayDirective
        }
      }),
      arrowPlacement: computed<'left' | 'right'>(() => {
        return collapseProps.arrowPlacement
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
      mergedDisplayDirective,
      cPrefix
    } = this
    const headerNode = renderSlot($slots, 'header', undefined, () => [title])
    return (
      <div
        class={[
          `${cPrefix}-collapse-item`,
          `${cPrefix}-collapse-item--${arrowPlacement}-arrow-placement`,
          !collapsed && `${cPrefix}-collapse-item--active`
        ]}
      >
        <div
          class={[
            `${cPrefix}-collapse-item__header`,
            !collapsed && `${cPrefix}-collapse-item__header--active`
          ]}
          onClick={this.handleClick}
        >
          {arrowPlacement === 'right' && headerNode}
          <div class={`${cPrefix}-collapse-item-arrow`}>
            {renderSlot($slots, 'arrow', { collapsed: collapsed }, () => [
              <NBaseIcon clsPrefix={cPrefix}>
                {{ default: () => <ArrowIcon /> }}
              </NBaseIcon>
            ])}
          </div>
          {arrowPlacement === 'left' && headerNode}
        </div>
        <NCollapseItemContent
          clsPrefix={cPrefix}
          displayDirective={mergedDisplayDirective}
          show={!collapsed}
        >
          {$slots}
        </NCollapseItemContent>
      </div>
    )
  }
})
