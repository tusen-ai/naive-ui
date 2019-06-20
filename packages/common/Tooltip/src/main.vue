<template>
  <div
    class="n-tooltip"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="n-tooltip__content"
    >
      <slot name="activator" />
    </div>
    <div
      class="n-tooltip__popup"
      :class="{
        'is-hidden': isHidden,
        'has-emerged': hasEmerged,
        'is-vanishing': isVanishing
      }"
    >
      <div class="n-tooltip-popup__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NTooltip',
  data () {
    return {
      timeoutId: null,
      delayTimeout: null,
      isHidden: true,
      hasEmerged: false,
      isVanishing: false
    }
  },
  methods: {
    handleMouseEnter () {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.isVanishing = false
      }
      this.isHidden = false
      this.hasEmerged = true
      this
        .$nextTick()
        .then(vm => {
          vm.$el.getBoundingClientRect()
          return this.$nextTick()
        })
        .then(vm => {
          vm.hasEmerged = false
        })
    },
    handleMouseLeave (x) {
      this.isVanishing = true
      this.timeoutId = setTimeout(() => {
        this.isHidden = true
        this.isVanishing = false
      }, 300)
    }
  }
}
</script>
