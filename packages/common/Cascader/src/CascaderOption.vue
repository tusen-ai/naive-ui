<template>
  <div
    class="n-cascader-option"
    :class="{
      'n-cascader-option--active': active && hasChildren,
      'n-cascader-option--traced': traced,
      'n-cascader-option--disabled': disabled,
      'n-cascader-option--has-children': hasChildren
    }"
    :data-n-cascader-option-id="id"
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
import { validateType } from './utils'

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
    },
    isLeaf: {
      type: Boolean,
      default: false
    },
    hasChildren: {
      type: Boolean,
      default: false
    },
    checkboxChecked: {
      type: Boolean,
      default: false
    },
    checkboxIndeterminate: {
      type: Boolean,
      default: false
    }
  },
  created () {
    // console.log(this.type)
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e, this)
      if (this.type === 'single') {
        this.$emit('check', this)
      }
    },
    handleMouseEnter (e) {
      this.$emit('mouseenter', e, this)
    },
    handleMouseLeave (e) {
      this.$emit('mouseleave', e, this)
    },
    handleOptionCheck (e) {
      this.$emit('check', this)
    }
  }
}
</script>
