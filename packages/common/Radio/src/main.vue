<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': disabled,
      'n-radio--checked': checked,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :tabindex="disabled ? -1 : 0"
    @keyup.enter="handleKeyUpEnter"
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
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NRadio',
  mixins: [ withapp, themeable, Emitter ],
  model: {
    prop: 'privateValue',
    event: 'input'
  },
  inject: {
    NRadioGroup: {
      default: null
    },
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
      if (this.NRadioGroup) {
        return this.NRadioGroup.value === this.value
      } else {
        return this.privateValue === this.value
      }
    }
  },
  methods: {
    handleKeyUpEnter () {
      this.toggle()
    },
    handleClick (e) {
      this.$emit('click', e)
      this.toggle()
    },
    toggle () {
      if (this.disabled) return
      if (this.privateValue !== this.value) {
        this.emitValue('input', this.value)
        if (this.formItem) {
          this.dispatch('NFormItem', 'on-form-change', this.value)
        }
      }
    },
    emitValue () {
      if (this.NRadioGroup) {
        this.NRadioGroup.$emit('input', this.value)
      } else {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
