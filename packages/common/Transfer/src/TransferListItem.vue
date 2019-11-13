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
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="n-transfer-list-item__checkbox">
        <n-checkbox
          :disabled="disabled"
          :checked="checked"
          @input="handleInput"
        />
      </div>
      <div
        class="n-transfer-list-item__label"
        :title="title"
      >
        <slot />
      </div>
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
    },
    title: {
      type: String,
      required: true
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
    },
    handleMouseEnter (e) {
      if (!this.disabled) {
        this.$emit('mouseenter', e)
      }
    },
    handleMouseLeave (e) {
      if (!this.disabled) {
        this.$emit('mouseleave', e)
      }
    }
  }
}
</script>
