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
          <n-icon type="ios-arrow-forward">
            <ios-arrow-forward />
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
import NIcon from '../../Icon'
import iosArrowForward from '../../_icons/ios-arrow-forward'
import collectable from '../../_mixins/collectable'
import NCollapseItemContent from './CollapseItemContent'

export default {
  name: 'CollapseItem',
  components: {
    NIcon,
    NCollapseItemContent,
    iosArrowForward
  },
  mixins: [collectable('NCollapse', 'collectedItemNames', 'name')],
  inject: {
    NCollapse: {
      default: null
    }
  },
  props: {
    title: {
      type: String,
      default: null
    },
    name: {
      type: [ String, Number ],
      default: null
    },
    displayDirective: {
      validator (value) {
        return ['if', 'show'].includes(value)
      },
      default: null
    }
  },
  computed: {
    syntheticDisplayDirective () {
      const displayDirective = this.displayDirective
      if (displayDirective !== null) {
        return this.NCollapse.displayDirective
      } else {
        return displayDirective
      }
    },
    arrowPlacement () {
      return this.NCollapse.arrowPlacement
    },
    collapsed () {
      const NCollapse = this.NCollapse
      if (NCollapse && Array.isArray(NCollapse.expandedNames)) {
        const itemName = this.name
        return !~NCollapse.expandedNames.findIndex(name => name === itemName)
      }
      return true
    }
  },
  methods: {
    handleClick (e) {
      const NCollapse = this.NCollapse
      if (NCollapse) {
        NCollapse.toggleItem(this.collapsed, this.name, e)
      }
    }
  }
}
</script>
