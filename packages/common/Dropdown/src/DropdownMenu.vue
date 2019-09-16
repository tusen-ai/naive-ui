<template>
  <div
    class="n-dropdown-menu"
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
</template>

<script>
import withlightbar from '../../../mixins/withlightbar'

export default {
  name: 'NDropdownMenu',
  mixins: [withlightbar],
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  provide () {
    return {
      NDropdownController: this.controller
    }
  },
  data () {
    return {
      active: true
    }
  },
  methods: {
    handleMouseLeaveMenu (e) {
      this.hideLightBar()
    }
  }
}
</script>
