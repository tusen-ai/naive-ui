<template>
  <div
    class="n-popselect-option"
    :class="{
      'n-popselect-option--active': active,
      'n-popselect-option--disabled': disabled
    }"
    @mouseenter="handleMouseEnter"
    @click="handleClick"
  >
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'NPopselectOption',
  inject: ['NPopselect'],
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      validator () {
        return true
      },
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active () {
      let active = false
      if (this.NPopselect) {
        if (this.NPopselect.multiple) {
          active = Array.isArray(this.NPopselect.value) && this.NPopselect.value.includes(this.value)
        } else {
          active = this.NPopselect.value === this.value
        }
      }
      return active
    }
  },
  methods: {
    handleMouseEnter (e) {
      if (!this.disabled && this.NPopselect) {
        this.NPopselect.updateLightBarPosition(this.$el)
      }
    },
    handleClick (e) {
      if (!this.disabled && this.NPopselect) {
        this.NPopselect.toggle(this.value)
      }
      this.$emit('click', e)
    }
  }
}
</script>
