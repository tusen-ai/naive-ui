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
          <n-icon color-transition>
            <arrow-icon />
          </n-icon>
        </slot>
      </div>
      <slot v-if="arrowPlacement === 'left'" name="header">
        {{ title }}
      </slot>
    </div>
    <n-collapse-item-content
      :display-directive="syntheticDisplayDirective"
      :show="!collapsed"
    >
      <slot />
    </n-collapse-item-content>
  </div>
</template>

<script>
import { toRef } from 'vue'
import { NIcon } from '../../icon'
import { ChevronRightIcon as ArrowIcon } from '../../_base/icons'
import NCollapseItemContent from './CollapseItemContent.js'
import { useInjectionCollection } from '../../_utils/composable'

export default {
  name: 'CollapseItem',
  components: {
    NIcon,
    NCollapseItemContent,
    ArrowIcon
  },
  inject: {
    NCollapse: {
      default: null
    }
  },
  props: {
    title: {
      type: String,
      default: undefined
    },
    name: {
      type: [String, Number],
      default: undefined
    },
    displayDirective: {
      validator (value) {
        return ['if', 'show'].includes(value)
      },
      default: undefined
    }
  },
  setup (props) {
    useInjectionCollection('NCollapse', 'collectedItemNames', toRef(props, 'name'))
  },
  computed: {
    syntheticDisplayDirective () {
      const { displayDirective, NCollapse } = this
      if (displayDirective) {
        return displayDirective
      } else {
        return NCollapse.displayDirective
      }
    },
    arrowPlacement () {
      return this.NCollapse.arrowPlacement
    },
    collapsed () {
      const { NCollapse } = this
      if (NCollapse && Array.isArray(NCollapse.expandedNames)) {
        const itemName = this.name
        return !~NCollapse.expandedNames.findIndex(name => name === itemName)
      }
      return true
    }
  },
  methods: {
    handleClick (e) {
      const { NCollapse } = this
      if (NCollapse) {
        NCollapse.toggleItem(
          this.collapsed,
          this.name,
          e
        )
      }
    }
  }
}
</script>
