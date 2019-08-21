<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': disabled,
      'n-radio--checked': checked
    }"
    @click="handleClick"
  >
    <div
      class="n-radio__control"
      :class="{
        'n-radio__control--checked': checked
      }"
    />
    <div class="n-radio__label">
      <slot />
    </div>
  </div>
</template>

<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'NRadio',
  mixins: [ Emitter ],
  model: {
    prop: 'privateValue',
    event: 'input'
  },
  inject: {
    formItem: {
      default: null
    }
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    privateValue: {
      type: [Boolean, String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checked () {
      return this.privateValue === this.value
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
      if (this.disabled) return
      if (this.privateValue !== this.value) {
        this.$emit('input', this.value)
        if (this.formItem) {
          this.dispatch('NFormItem', 'on-form-change', this.value)
        }
      }
    }
  }
}
</script>
