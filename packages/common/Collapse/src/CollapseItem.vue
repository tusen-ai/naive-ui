<template>
  <div
    class="n-collapse-item"
    :class="{
      'n-collapse-item--active': !collapse,
    }"
  >
    <div
      class="n-collapse-item__header"
      :class="{
        'n-collapse-item__header--active': !collapse
      }"
      @click="handleClick"
    >
      <n-icon type="ios-arrow-forward">
        <ios-arrow-forward />
      </n-icon>{{ title }}
    </div>
    <fade-in-height-expand-transition>
      <div
        v-if="!collapse"
        ref="contentContainer"
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
import iosArrowForward from '../../../icons/ios-arrow-forward'
import collectable from '../../../mixins/collectable'
import FadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'

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
      type: String,
      default: null
    }
  },
  computed: {
    collapse () {
      if (this.NCollapse && Array.isArray(this.NCollapse.expandNames)) {
        return !~this.NCollapse.expandNames.findIndex(name => name === this.name)
      }
      return true
    }
  },
  methods: {
    handleClick () {
      if (this.NCollapse) {
        this.NCollapse.toggleItem(this.collapse, this.name)
      }
    }
  }
}
</script>
