<template>
  <div
    class="n-cascader-option"
    :class="{
      'n-cascader-option--active': active && hasChildren,
      'n-cascader-option--traced': traced,
      'n-cascader-option--disabled': disabled,
      'n-cascader-option--has-children': hasChildren
    }"
    :data-id="id"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-if="type==='multiple'"
      class="n-cascader-option__checkbox"
    >
      <n-checkbox
        :disabled="disabled"
        :value="checkboxChecked"
        :indeterminate="checkboxIndeterminate"
        @click="handleOptionCheck"
      />
    </div>
    <div
      v-else-if="type==='multiple-all-options' || type === 'single-all-options'"
      class="n-cascader-option__radio"
    >
      <n-radio
        :disabled="disabled"
        :value="true"
        :private-value="checked"
        @click="handleOptionCheck"
      />
    </div>
    <div
      v-else-if="type==='single' && isLeaf"
      class="n-cascader-option__checkbox"
    >
      <n-checkbox
        :disabled="disabled"
        :value="checked"
        @click="handleOptionCheck"
      />
    </div>
    <span class="n-cascader-option__label">{{ label }}</span>
  </div>
</template>

<script>
import NCheckbox from '../../Checkbox'
import NRadio from '../../Radio'
import { validateType, isLeaf } from './utils'

export default {
  name: 'NCascaderOption',
  components: {
    NCheckbox,
    NRadio
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    type: {
      validator: validateType,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      validator: () => true,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    traced: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    },
    prevSibling: {
      type: Object,
      default: null
    },
    nextSibling: {
      type: Object,
      default: null
    },
    parent: {
      type: Object,
      default: null
    },
    depth: {
      type: Number,
      required: true
    },
    leafCount: {
      type: Number,
      required: true
    },
    checkedLeafCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    isLeaf () {
      return isLeaf(this.option)
    },
    hasChildren () {
      return this.children && this.children.length
    },
    checkboxChecked () {
      if (this.type === 'multiple') {
        if (Array.isArray(this.children) && this.children.length) {
          return this.leafCount === this.checkedLeafCount
        } else {
          return this.checked
        }
      } else {
        return this.checked
      }
    },
    checkboxIndeterminate () {
      if (this.type === 'multiple') {
        return !this.checked && this.checkedLeafCount !== 0 && this.checkedLeafCount !== this.leafCount
      } return false
    },
    option () {
      return {
        id: this.id,
        label: this.label,
        value: this.value,
        active: this.active,
        checked: this.checkboxChecked,
        indeterminate: this.checkboxIndeterminate,
        traced: this.traced,
        disabled: this.disabled,
        children: this.children,
        prevSibling: this.prevSibling,
        nextSibling: this.nextSibling,
        parent: this.parent
      }
    }
  },
  created () {
    // console.log(this.type)
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e, this.option)
      if (this.type === 'single') {
        this.handleOptionCheck()
      }
    },
    handleMouseEnter (e) {
      this.$emit('mouseenter', e, this.option)
    },
    handleMouseLeave (e) {
      this.$emit('mouseleave', e, this.option)
    },
    handleOptionCheck (e) {
      if (!this.disabled) {
        // e.stopPropagation()
        if (this.type === 'single') {
          if (this.isLeaf) {
            this.$emit('check', this.option, this.checked, this.indeterminate)
          }
        } else {
          this.$emit('check', this.option, this.checked, this.indeterminate)
        }
      }
    }
  }
}
</script>
