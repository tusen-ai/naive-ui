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
    <fade-in-height-expand-transition>
      <div
        v-if="!collapsed"
        class="n-collapse-item__content-wrapper"
      >
        <div
          ref="content"
          class="n-collapse-item__content-inner"
        >
          <slot />
        </div>
      </div>
    </fade-in-height-expand-transition>
  </div>
</template>

<script>
import NIcon from '../../Icon'
import iosArrowForward from '../../_icons/ios-arrow-forward'
import collectable from '../../_mixins/collectable'
import FadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'

export default {
  name: 'NCollapseItem',
  components: {
    NIcon,
    FadeInHeightExpandTransition,
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
    }
  },
  computed: {
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
