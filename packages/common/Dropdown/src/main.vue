<template>
  <div class="n-dropdown">
    <div
      ref="activator"
      class="n-dropdown__activator"
      @click="handleActivatorClick"
      @mouseenter="handleMouseEnterActivator"
      @mouseleave="handleMouseLeaveActivator"
    >
      <slot name="activator" />
    </div>
    <div
      ref="contentContainer"
      class="n-detached-content-container n-dropdown-content-container"
    >
      <div
        ref="content"
        class="n-detached-content n-dropdown-content"
      >
        <transition
          name="n-dropdown--transition"
        >
          <div
            v-if="active"
            ref="contentInner"
            v-clickoutside="handleClickoutsideMenu"
            class="n-dropdown-menu"
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
    </div>
  </div>
</template>

<script>
import detachable from '../../../mixins/detachable'
import zindexable from '../../../mixins/zindexable'
import placeable from '../../../mixins/placeable'
import clickoutside from '../../../directives/clickoutside'

export default {
  name: 'NDropdown',
  directives: {
    clickoutside
  },
  mixins: [detachable, placeable, zindexable],
  props: {
    trigger: {
      validator (trigger) {
        return ['click', 'hover'].includes(trigger)
      },
      default: 'click'
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    widthMode: {
      type: String,
      default: 'activator'
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
    deactivate (options = { immediately: false }) {
      if (this.vanishTimerId) {
        window.clearTimeout(this.vanishTimerId)
        this.vanishTimerId = null
      }
      if (this.triggerByHover && !options.immediately) {
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
    handleClickoutsideMenu (e) {
      if (this.$refs.activator && !this.$refs.activator.contains(e.target)) {
        this.deactivate()
      }
    },
    updateLightBarPosition (el) {
      this.showLightBar = true
      this.lightBarTop = el.offsetTop
    },
    hideLightBar () {
      this.showLightBar = false
    }
  }
}
</script>
