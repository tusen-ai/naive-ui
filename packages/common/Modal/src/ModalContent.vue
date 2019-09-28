<template>
  <div
    class="n-modal-content"
    :class="{
      'n-modal-content--active': styleActive
    }"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
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

let mousePosition = null

document.documentElement.addEventListener('click', (e) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  }
  window.setTimeout(() => {
    mousePosition = null
  }, 32)
}, true)

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
      styleActive: false
    }
  },
  computed: {
    slotDOM: {
      get () {
        const els = this.$refs.contentInner.childNodes
        return els
      }
    }
  },
  created () {
    if (this.active) {
      this.styleActive = true
    }
  },
  // mounted () {
  //   this.$nextTick().then(this.registerContent)
  // },
  // updated () {
  //   console.log('updated')
  //   this.$nextTick().then(this.registerContent)
  // },
  beforeDestroy () {
    // window.clearTimeout(this.updateScrollbarTimerId)
  },
  methods: {
    handleMouseDown (e) {
      this.$emit('mousedown', e)
    },
    handleMouseUp (e) {
      this.$emit('mouseup', e)
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
        !this.activateEvent &&
        !mousePosition
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
      } else if (
        this.activateEvent
      ) {
        const activatorTop = this.activateEvent.clientY
        const activatorLeft = this.activateEvent.clientX
        const activatorWidth = 0
        const activatorHeight = 0
        const transformOriginX = -(offsetLeft - activatorLeft - activatorWidth / 2)
        const transformOriginY = -(offsetTop - activatorTop - scrollTop - activatorHeight / 2)
        this.$refs.contentInner.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`
      } else if (mousePosition) {
        const activatorTop = mousePosition.y
        const activatorLeft = mousePosition.x
        const activatorWidth = 0
        const activatorHeight = 0
        const transformOriginX = -(offsetLeft - activatorLeft - activatorWidth / 2)
        const transformOriginY = -(offsetTop - activatorTop - scrollTop - activatorHeight / 2)
        this.$refs.contentInner.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`
      }
    },
    handleBeforeLeave () {
      if (this.$parent.$refs.activator &&
        this.$parent.$refs.activator.childElementCount) {
        this.updateTransformOrigin()
      }
      this.$refs.scrollbar.disableScrollbar()
      this.$emit('before-leave')
    },
    handleAfterLeave () {
      this.styleActive = false
      this.$emit('after-leave')
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
    visibility: hidden;
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
