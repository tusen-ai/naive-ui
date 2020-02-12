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
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'

export default {
  name: 'NSwitch',
  mixins: [ withapp, themeable, asformitem() ],
  model: {
    prop: 'value',
    event: 'change'
  },
  inject: {
    NFormItem: {
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
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('change', !this.value)
      }
    }
  }
}
</script>
