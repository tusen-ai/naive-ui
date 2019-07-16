<template>
  <div
    ref="self"
    class="n-popover"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="activator"
      class="n-popover__activator"
      @click="handleActivatorClick"
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
        as detach when active. However it also have some good points such as
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
            @mouseleave="handleMouseLeave"
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
    }
  },
  data: function () {
    return {
      vanishTimerId: null
    }
  },
  beforeDestroy () {
    clickoutsideDelegate.unregisterHandler(this.handleClickOutsidePopover)
  },
  methods: {
    handleMouseEnter () {
      if (this.trigger === 'hover') {
        if (this.vanishTimerId) {
          window.clearTimeout(this.vanishTimerId)
          this.vanishTimerId = null
        }
        this.activate()
      }
    },
    handleMouseLeave () {
      if (this.trigger === 'hover') {
        this.vanishTimerId = window.setTimeout(() => {
          this.deactivate()
        }, this.duration)
      }
    },
    handleClickOutsidePopover (e) {
      console.log('click outside')
      this.deactivate()
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
