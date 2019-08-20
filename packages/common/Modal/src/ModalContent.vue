<template>
  <div
    class="n-modal-content"
    :class="{
      'n-modal-content--active': styleActive
    }"
    v-on="$listeners"
  >
    <n-scrollbar ref="scrollbar">
      <transition
        name="n-modal-content--transition"
        @enter="handleEnter"
        @after-leave="handleAfterLeave"
        @before-leave="handleBeforeLeave"
      >
        <div
          v-if="active"
          ref="contentInner"
          style="margin: auto;"
        >
          <slot />
        </div>
      </transition>
    </n-scrollbar>
  </div>
</template>

<script>
import NScrollbar from '../../Scrollbar'

export default {
  components: {
    NScrollbar
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    activateEvent: {
      validator (e) {
        return e instanceof MouseEvent
      },
      default: null
    }
  },
  data () {
    return {
      slotDOM: [],
      styleActive: false
    }
  },
  mounted () {
    this.$nextTick().then(this.registerContent)
  },
  updated () {
    this.$nextTick().then(this.registerContent)
  },
  methods: {
    registerContent () {
      const slots = this.$slots.default
      const componentInstances = slots.map(vNode => vNode.componentInstance).filter(ci => ci)
      const els = componentInstances.map(ci => ci.$el).filter(el => el)
      this.slotDOM = els
    },
    handleEnter () {
      this.styleActive = true
      this.$refs.scrollbar.enableScrollbar()
      this.$nextTick().then(() => {
        this.updateTransformOrigin()
      })
    },
    handleAfterEnter () {
      // console.log('afterEnter', this.$refs.scrollbar.enableScrollbar())
    },
    updateTransformOrigin () {
      if (
        (!this.$parent.$refs.activator ||
        !this.$parent.$refs.activator.childElementCount) &&
        !this.activateEvent
      ) {
        return
      }
      const scrollTop = this.$refs.scrollbar.containerScrollTop
      const {
        offsetLeft,
        offsetTop
      } = this.$refs.contentInner
      if (
        this.$parent.$refs.activator &&
        this.$parent.$refs.activator.childElementCount
      ) {
        const {
          left: activatorLeft,
          top: activatorTop,
          width: activatorWidth,
          height: activatorHeight
        } = this.$parent.$refs.activator.getBoundingClientRect()
        const transformOriginX = -(offsetLeft - activatorLeft - activatorWidth / 2)
        const transformOriginY = -(offsetTop - activatorTop - scrollTop - activatorHeight / 2)
        this.$refs.contentInner.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`
      } else {
        const activatorTop = this.activateEvent.clientY
        const activatorLeft = this.activateEvent.clientX
        const activatorWidth = 0
        const activatorHeight = 0
        const transformOriginX = -(offsetLeft - activatorLeft - activatorWidth / 2)
        const transformOriginY = -(offsetTop - activatorTop - scrollTop - activatorHeight / 2)
        this.$refs.contentInner.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`
      }
    },
    handleBeforeLeave () {
      this.updateTransformOrigin()
      this.$refs.scrollbar.disableScrollbar()
    },
    handleAfterLeave () {
      this.styleActive = false
      // console.log('beforeLeave', this.$refs.scrollbar.disableScrollbar())
    }
  }
}
</script>

<style lang="scss">
.n-modal-content-inner--measure {
  transform: scale(1)!important;
}

.n-modal-content {
  & > .n-scrollbar {
    & > .n-scrollbar-container > .n-scrollbar-content {
      min-height: 100%;
      display: flex;
    }
  }
  &:not(.n-modal-content--active) {
    width: 0;
    height: 0;
  }
}

.n-modal-content--transition-enter-active {
  opacity: 1;
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1), transform .3s cubic-bezier(0.0, 0.0, 0.2, 1);
  transform: scale(1);
}

.n-modal-content--transition-leave-active {
  opacity: 1;
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1), transform .3s cubic-bezier(0.4, 0.0, 1, 1);
  transform: scale(1);
}

.n-modal-content--transition-enter, .n-modal-content--transition-leave-to {
  opacity: 0;
  transform: scale(.5);
}
</style>
