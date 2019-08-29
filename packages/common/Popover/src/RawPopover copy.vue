<template>
  <div
    ref="self"
    class="n-popover"
  >
    <div
      ref="activator"
      class="n-popover__activator"
      @click="handleActivatorClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeavePopover"
    >
      <slot
        name="activator"
      />
    </div>
    <div
      ref="contentContainer"
      class="n-popover__content-container"
    >
      <!--
        ref="content" should exist since if not, I can't detach the element
        because it doesn't exist. Maybe there are some other solutions, such
        as detach when active. However it also has some good points such as
        make it easy to positioning. So I just leave it for later solving.
      -->
      <div
        v-if="!raw"
        ref="content"
        class="n-popover__content-wrapper"
      >
        <transition
          name="n-popover-fade"
        >
          <div
            v-if="active"
            ref="popoverBody"
            :n-placement="placement"
            class="n-popover__content"
            :class="{
              'n-popover__content--without-arrow': !arrow
            }"
            :style="style"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeavePopover"
          >
            <div
              v-if="arrow"
              class="n-popover__arrow"
            />
            <slot />
          </div>
        </transition>
      </div>
      <div
        v-else
        ref="content"
        class="n-popover__content-wrapper"
      >
        <transition
          name="n-popover-fade"
        >
          <div
            v-if="active"
            ref="popoverBody"
            :n-placement="placement"
            class="n-popover__raw-content"
            :class="{
              'n-popover__content--without-arrow': !arrow
            }"
            :style="style"
            @mouseenter="handleMouseEnter"
          >
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import detachable from '../../../mixins/detachable'
import toggleable from '../../../mixins/toggleable'
import placeable from '../../../mixins/placeable'
import zindexable from '../../../mixins/zindexable'
import clickoutsideDelegate from '../../../utils/clickoutsideDelegate'
import moveoutsideDelegate from '../../../utils/moveoutsideDelegate'

export default {
  mixins: [detachable, toggleable, placeable, zindexable],
  // name: 'NPopover',
  render (h) {
    return h('div', {

    }, [])
  },
  props: {
    duration: {
      type: Number,
      required: true
    },
    delay: {
      type: Number,
      default: null
    },
    trigger: {
      default: 'hover',
      validator (value) {
        return ['click', 'hover', 'manual'].includes(value)
      }
    },
    arrow: {
      default: true,
      type: Boolean
    },
    raw: {
      default: false,
      type: Boolean
    },
    width: {
      type: Number,
      default: null
    }
    /**
     * for debug usage
     */
    // name: {
    //   type: String,
    //   default: '-1'
    // }
  },
  data: function () {
    return {
      vanishTimerId: null,
      delayTimerId: null
    }
  },
  computed: {
    style () {
      const style = {}
      if (this.width !== null) {
        style.width = this.width + 'px'
      }
      return style
    }
  },
  watch: {
    active (newActive) {
      if (!newActive) {
        clickoutsideDelegate.unregisterHandler(this.handleClickOutsidePopover)
      }
    }
  },
  mounted () {
    console.log('Popover $refs.slot', this.$refs.slot)
    console.log('Popover $refs.activator', this.$refs.activator)
  },
  created () {
    this.handleMoveOutsidePopover = this.handleMoveOutsidePopover.bind(this)
  },
  beforeDestroy () {
    clickoutsideDelegate.unregisterHandler(this.handleClickOutsidePopover)
    moveoutsideDelegate.unregisterHandler(this.handleMoveOutsidePopover)
  },
  methods: {
    registerMouseMoveOutHandler () {
      /**
         * use $nextTick to
         * make sure this.$refs.popoverBody is mount
         * and make sure add mousemove handler on window after removeEventListener
         * which is possible to happen if there is no registered handler
         */
      this.$nextTick().then(() => {
        moveoutsideDelegate.registerHandler([
          this.$refs.activator,
          () => this.$refs.popoverBody
        ], this.handleMoveOutsidePopover)
      })
    },
    handleMouseEnter () {
      if (this.trigger === 'hover') {
        if (this.vanishTimerId) {
          window.clearTimeout(this.vanishTimerId)
          this.vanishTimerId = null
        }
        if (this.delay !== null) {
          if (this.delayTimerId !== null) {
            window.clearTimeout(this.delayTimerId)
          }
          this.delayTimerId = window.setTimeout(this.activate, this.delay)
        } else {
          this.activate()
        }
        this.registerMouseMoveOutHandler()
      }
    },
    handleClickOutsidePopover (e) {
      // console.log('click outside')
      this.deactivate()
      clickoutsideDelegate.unregisterHandler(this.handleClickOutsidePopover)
    },
    hidePopover () {
      if (this.vanishTimerId !== null) {
        window.clearTimeout(this.vanishTimerId)
        this.vanishTimerId = null
      }
      if (this.delayTimerId !== null) {
        window.clearTimeout(this.delayTimerId)
        this.delayTimerId = null
      }
      // moveoutsideDelegate.unregisterHandler(this.handleMoveOutsidePopover)
      this.vanishTimerId = window.setTimeout(() => {
        this.deactivate()
      }, this.duration)
    },
    handleMouseLeavePopover (e) {
      if (this.trigger === 'hover') {
        this.hidePopover()
      }
    },
    handleMoveOutsidePopover (e) {
      if (this.trigger === 'hover') {
        this.hidePopover()
      }
    },
    handleActivatorClick () {
      if (this.trigger === 'click') {
        if (!this.active) {
          this.activate()
          clickoutsideDelegate.registerHandler([() => this.$refs.popoverBody, this.$refs.activator], this.handleClickOutsidePopover)
        } else {
          this.deactivate()
          clickoutsideDelegate.unregisterHandler(this.handleClickOutsidePopover)
        }
      }
    }
  }
}
</script>
