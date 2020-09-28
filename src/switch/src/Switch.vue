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
      :class="{
        'n-switch__rail--active': value,
        'n-switch__rail--disabled': disabled
      }"
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
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this['onUpdate:value'](!this.value)
        this.__triggerFormInput()
        this.__triggerFormChange()
      }
    }
  }
}
</script>
