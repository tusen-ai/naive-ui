<template>
  <div
    class="n-switch"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
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
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  cssrName: 'Switch',
  mixins: [
    withapp,
    themeable,
    asformitem(),
    usecssr(styles)
  ],
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
