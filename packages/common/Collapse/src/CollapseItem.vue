<template>
  <div
    class="n-collapse-item"
    :class="{
      'n-collapse-item--active': !collapse,
    }"
  >
    <div
      class="n-collapse-item__title"
      :class="{
        'n-collapse-item__title--active': !collapse
      }"
      @click="handleClick"
    >
      <n-icon type="ios-arrow-forward" />{{ title }}
    </div>
    <transition
      name="n-fade-in-height-expand"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @leave="handleLeave"
    >
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
    </transition>
  </div>
</template>

<script>
import NIcon from '../../Icon'
import registerable from '../../../mixins/registerable'

export default {
  name: 'NCollapseItem',
  components: {
    NIcon
  },
  mixins: [registerable('NCollapse', 'collectedItemNames', 'name')],
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
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    collapse () {
      if (this.NCollapse && Array.isArray(this.NCollapse.value)) {
        return !~this.NCollapse.value.findIndex(name => name === this.name)
      }
      return true
    }
  },
  methods: {
    handleEnter () {
      this.$refs.contentContainer.style.maxHeight = 0
      this.$el.getBoundingClientRect()
      this.$refs.contentContainer.style.maxHeight = this.$refs.content.offsetHeight + 'px'
    },
    handleAfterEnter () {
      this.$refs.contentContainer.style.maxHeight = null
    },
    handleLeave () {
      this.$refs.contentContainer.style.maxHeight = this.$refs.content.offsetHeight + 'px'
      this.$el.getBoundingClientRect()
      this.$refs.contentContainer.style.maxHeight = 0
    },
    handleClick () {
      if (this.NCollapse) {
        this.NCollapse.toggleItem(this.collapse, this.name)
      }
    }
  }
}
</script>
