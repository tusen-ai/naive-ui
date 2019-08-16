<template>
  <div
    class="n-dropdown-submenu"
    @mouseenter="handleMouseEnter"
  >
    <div
      ref="activator"
      class="n-dropdown-submenu__activator"
      @click="handleActivatorClick"
      @mouseenter="handleMouseEnterActivator"
      @mouseleave="handleMouseLeaveActivator"
    >
      <slot name="activator" />
    </div>
    <transition
      name="n-dropdown-submenu--transition"
    >
      <div
        v-if="active"
        class="n-dropdown-submenu__menu"
        @mouseenter="handleMouseEnterMenu"
        @mouseleave="handleMouseLeaveMenu"
      >
        <transition name="n-dropdown-menu-light-bar--transition">
          <div
            v-if="showLightBar"
            class="n-dropdown-menu-light-bar-container"
          >
            <div
              class="n-dropdown-menu-light-bar"
              :style="{ top: `${lightBarTop}px` }"
            />
          </div>
        </transition>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import bubblecallable from '../../../mixins/bubblecallable'

export default {
  name: 'NDropdownSubmenu',
  mixins: [ bubblecallable ],
  props: {
    trigger: {
      validator (trigger) {
        return ['click', 'hover'].includes(trigger)
      },
      default: 'hover'
    },
    duration: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      active: false,
      vanishTimerId: null,
      showLightBar: false,
      lightBarTop: 0
    }
  },
  computed: {
    triggerByHover () {
      return this.trigger === 'hover'
    },
    triggerByClick () {
      return this.trigger === 'click'
    }
  },
  methods: {
    activate () {
      if (this.vanishTimerId) {
        window.clearTimeout(this.vanishTimerId)
        this.vanishTimerId = null
      }
      this.active = true
    },
    deactivate () {
      if (this.vanishTimerId) {
        window.clearTimeout(this.vanishTimerId)
        this.vanishTimerId = null
      }
      if (this.triggerByHover) {
        this.vanishTimerId = window.setTimeout(() => {
          this.active = false
          this.showLightBar = false
        }, this.duration)
      } else {
        this.active = false
        this.showLightBar = false
      }
    },
    handleActivatorClick () {
      if (this.triggerByClick) {
        this.active = !this.active
      }
    },
    handleMouseEnterMenu () {
      if (this.triggerByHover) {
        this.activate()
      }
    },
    handleMouseLeaveMenu (e) {
      if (this.triggerByHover) {
        this.deactivate()
      }
      this.hideLightBar()
    },
    handleMouseEnterActivator () {
      if (this.triggerByHover) {
        this.activate()
      }
    },
    handleMouseLeaveActivator (e) {
      if (this.triggerByHover) {
        this.deactivate()
      }
    },
    handleMouseEnter (e) {
      this.bubbleCall(['NDropdown', 'NDropdownSubmenu'], 'updateLightBarPosition', this.$el)
    },
    updateLightBarPosition (el) {
      if (this.$refs.activator && !this.$refs.activator.contains(el)) {
        this.showLightBar = true
        this.lightBarTop = el.offsetTop
      }
    },
    hideLightBar () {
      this.showLightBar = false
    }
  }
}
</script>
