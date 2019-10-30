<template>
  <div
    class="n-switch"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :tabindex="!disabled ? 0 : false"
    @click="handleClick"
  >
    <div
      class="n-switch__rail"
      :class="{ 'n-switch__rail--active': value, 'n-switch__rail--disabled': disabled }"
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
  props: {
    value: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (value, oldValue) {
      this.$emit('change', value, oldValue)
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('input', !this.value)
        if (this.formItem) {
          this.dispatch('NFormItem', 'on-form-change', !this.value)
        }
      }
    }
  }
}
</script>
