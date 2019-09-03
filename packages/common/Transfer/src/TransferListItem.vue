<template>
  <transition
    :name="transitionName"
  >
    <li
      v-show="show"
      class="n-transfer-list-item"
      :class="{
        'n-transfer-list-item--disabled': disabled
      }"
      @click="handleClick"
    >
      <div class="n-transfer-list-item__checkbox">
        <n-checkbox
          :disabled="disabled"
          :value="checked"
          @input="handleInput"
        />
      </div>
      <slot />
    </li>
  </transition>
</template>

<script>
import NCheckbox from '../../Checkbox'

export default {
  name: 'NTransferListItem',
  components: {
    NCheckbox
  },
  props: {
    checked: {
      type: Boolean,
      required: true
    },
    value: {
      validator () {
        return true
      },
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    source: {
      type: Boolean,
      default: false
    },
    target: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    transitionName () {
      return this.source ? 'n-transfer-list-item-source--transition' : 'n-transfer-list-item-target--transition'
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('click')
      }
    },
    handleInput (checked) {
      if (!this.disabled) {
        this.$emit('input', checked, this.value)
      }
    }
  }
}
</script>
