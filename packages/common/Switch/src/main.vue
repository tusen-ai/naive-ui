<template>
  <div
    class="n-switch"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
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
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NSwitch',
  mixins: [ withapp, themeable, Emitter ],
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
