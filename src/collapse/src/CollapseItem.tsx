import {
  h,
  toRef,
  defineComponent,
  PropType,
  inject,
  computed,
  renderSlot,
  VNode
} from 'vue'
import { ChevronRightIcon as ArrowIcon } from '../../_base/icons'
import { NBaseIcon } from '../../_base'
import { useInjectionCollection } from '../../_utils/composable'
import NCollapseItemContent from './CollapseItemContent'
import { NCollapseInjection } from './Collapse'

export default defineComponent({
  name: 'CollapseItem',
  props: {
    title: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    },
    displayDirective: {
      type: String as PropType<'if' | 'show' | undefined>,
      default: undefined
    }
  },
  setup (props) {
    const NCollapse = inject<NCollapseInjection>(
      'NCollapse'
    ) as NCollapseInjection
    useInjectionCollection(
      'NCollapse',
      'collectedItemNames',
      toRef(props, 'name')
    )
    const collapsedRef = computed<boolean>(() => {
      const { expandedNames } = NCollapse
      if (Array.isArray(expandedNames)) {
        const { name } = props
        return !~expandedNames.findIndex(
          (expandedName) => expandedName === name
        )
      }
      return true
    })
    return {
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
          NCollapse.toggleItem(collapsedRef.value, props.name, e)
        }
      }
    }
  },
  render () {
    const { $slots, arrowPlacement, collapsed } = this
    const headerNode = renderSlot($slots, 'header', undefined, () => [
      this.title
    ])
    return (
      <div
        class={[
          'n-collapse-item',
          `n-collapse-item--${arrowPlacement}-arrow-placement`,
          {
            'n-collapse-item--active': !collapsed
          }
        ]}
      >
        <div
          class={[
            'n-collapse-item__header',
            {
              'n-collapse-item__header--active': !collapsed
            }
          ]}
          onClick={this.handleClick}
        >
          {arrowPlacement === 'right' && headerNode}
          <div class="n-collapse-item-arrow">
            {renderSlot($slots, 'arrow', { collapsed: collapsed }, () => [
              (
                <NBaseIcon>{{ default: () => <ArrowIcon /> }}</NBaseIcon>
              ) as VNode
            ])}
          </div>
          {arrowPlacement === 'left' && headerNode}
        </div>
        <NCollapseItemContent
          displayDirective={this.mergedDisplayDirective}
          show={!collapsed}
        >
          {$slots}
        </NCollapseItemContent>
      </div>
    )
  }
})
