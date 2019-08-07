<template>
  <div
    class="n-switch"
    @click="handleClick"
  >
    <div
      class="n-switch__rail"
      :class="{ 'n-switch__rail--active': active, 'n-switch__rail--disabled': disabled }"
    />
  </div>
</template>

<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'NSwitch',
  mixins: [ Emitter ],
  inject: {
    formItem: {
      default: null
    }
  },
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('change', !this.active)
        if (this.formItem) {
          this.dispatch('NFormItem', 'on-form-change', !this.active)
        }
      }
    }
  }
}
</script>
