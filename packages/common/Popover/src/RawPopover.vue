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
    >
      <slot name="activator" />
    </div>
    <div
      ref="contentWrapper"
      class="n-popover__content-container"
    >
      <!--
        ref="content" should exist since if not, I can't detach the element
        because it doesn't exist. Maybe there are some other solutions, such
        as detach when active. However it also has some good points such as
        make it easy to positioning. So I just leave it for later solving.
      -->
      <div
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
            @mouseenter="handleMouseEnter"
          >
            <div
              v-if="arrow"
              class="n-popover__arrow"
            />
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
import clickoutsideDelegate from '../../../utils/clickoutsideDelegate'
import moveoutsideDelegate from '../../../utils/moveoutsideDelegate'

export default {
  // name: 'NPopover',
  mixins: [detachable, toggleable, placeable],
  props: {
    duration: {
      type: Number,
      required: true
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
    /**
     * for debug usage
     */
    name: {
      type: String,
      default: '-1'
    }
  },
  data: function () {
    return {
      vanishTimerId: null
    }
  },
  created () {
    this.handleMoveOutsidePopover = this.handleMoveOutsidePopover.bind(this)
  },
  beforeDestroy () {
    clickoutsideDelegate.unregisterHandler(this.handleClickOutsidePopover)
    moveoutsideDelegate.unregisterHandler(this.handleMoveOutsidePopover)
  },
  methods: {
    handleMouseEnter () {
      if (this.trigger === 'hover') {
        // console.log('move inside:', this.name)
        if (this.vanishTimerId) {
          window.clearTimeout(this.vanishTimerId)
          this.vanishTimerId = null
        }
        this.activate()
        /**
         * use $nextTick to
         * make sure this.$refs.popoverBody is mount
         * and make sure add mousemove handler on window after removeEventListener
         * which is possible to happen if there is no registered handler
         */
        this.$nextTick().then(() => {
          if (!this.$refs.popoverBody) {
            throw new Error('popoverBody is not mounted, this is a bug of repo maintainer')
          }
          moveoutsideDelegate.registerHandler([
            () => this.$refs.activator,
            this.$refs.popoverBody
          ], this.handleMoveOutsidePopover)
        })
      }
    },
    // handleMouseOut (e) {
    //   if (this.trigger === 'hover') {
    //     if (this.vanishTimerId) {
    //       window.clearTimeout(this.vanishTimerId)
    //       this.vanishTimerId = null
    //     }
    //     if (!this.$refs.activator || !this.$refs.popoverBody) {
    //       this.deactivate()
    //       return
    //     }
    //     if (!this.$refs.activator.contains(e.relatedTarget) && !this.$refs.popoverBody.contains(e.relatedTarget)) {
    //       this.vanishTimerId = window.setTimeout(() => {
    //         this.deactivate()
    //       }, this.duration)
    //     }
    //   }
    // },
    // There are some bugs here, for mouseleave won't be fired some time, leave
    // it for later to discover.
    // handleMouseLeave () {
    //   if (this.trigger === 'hover') {
    //     if (this.vanishTimerId) {
    //       window.clearTimeout(this.vanishTimerId)
    //       this.vanishTimerId = null
    //     }
    //     this.vanishTimerId = window.setTimeout(() => {
    //       this.deactivate()
    //     }, this.duration)
    //   }
    // },
    handleClickOutsidePopover (e) {
      // console.log('click outside')
      this.deactivate()
      clickoutsideDelegate.unregisterHandler(this.handleClickOutsidePopover)
    },
    handleMoveOutsidePopover (e) {
      // console.log('move out side:', this.name)
      if (this.vanishTimerId) {
        window.clearTimeout(this.vanishTimerId)
        this.vanishTimerId = null
      }
      // moveoutsideDelegate.unregisterHandler(this.handleMoveOutsidePopover)
      this.vanishTimerId = window.setTimeout(() => {
        this.deactivate()
      }, this.duration)
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
