<template>
  <div
    class="n-collapse-item"
    :class="{
      'n-collapse-item--active': !collapsed,
      [`n-collapse-item--${arrowPlacement}-arrow-placement`]: true
    }"
  >
    <div
      class="n-collapse-item__header"
      :class="{
        'n-collapse-item__header--active': !collapsed
      }"
      @click="handleClick"
    >
      <slot v-if="arrowPlacement === 'right'" name="header">
        {{ title }}
      </slot>
      <div class="n-collapse-item-arrow">
        <slot name="arrow" :collapsed="collapsed">
          <n-base-icon>
            <arrow-icon />
          </n-base-icon>
        </slot>
      </div>
      <slot v-if="arrowPlacement === 'left'" name="header">
        {{ title }}
      </slot>
    </div>
    <n-collapse-item-content
      :display-directive="mergedDisplayDirective"
      :show="!collapsed"
    >
      <slot />
    </n-collapse-item-content>
  </div>
</template>

<script lang="ts">
import { toRef, defineComponent, PropType, inject, computed } from 'vue'
import { ChevronRightIcon as ArrowIcon } from '../../_base/icons'
import { NBaseIcon } from '../../_base'
import { useInjectionCollection } from '../../_utils/composable'
import NCollapseItemContent from './CollapseItemContent'
import { NCollapseInjection } from './Collapse'

export default defineComponent({
  name: 'CollapseItem',
  components: {
    NBaseIcon,
    NCollapseItemContent,
    ArrowIcon
  },
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
  }
})
</script>
