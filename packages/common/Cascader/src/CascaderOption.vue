<template>
  <div
    class="n-cascader-option"
    :class="{
      'n-cascader-option--active': active && !isLeaf,
      'n-cascader-option--tracked': tracked,
      'n-cascader-option--disabled': disabled,
      'n-cascader-option--not-leaf': !isLeaf
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
      type: String,
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
    tracked: {
      type: Boolean,
      default: false
    },
    prevAvailableSiblingId: {
      type: Number,
      default: null
    },
    nextAvailableSiblingId: {
      type: Number,
      default: null
    },
    availableParentId: {
      type: Number,
      default: null
    },
    firstAvailableChildId: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      default: null
    },
    depth: {
      type: Number,
      required: true
    },
    isLeaf: {
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
  computed: {
    option () {
      return {
        id: this.id,
        value: this.value,
        children: this.children,
        prevAvailableSiblingId: this.prevAvailableSiblingId,
        nextAvailableSiblingId: this.nextAvailableSiblingId,
        availableParentId: this.availableParentId,
        firstAvailableChildId: this.firstAvailableChildId
      }
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
      this.$emit('mouseenter', e, this.option)
    },
    handleMouseLeave (e) {
      this.$emit('mouseleave', e, this.option)
    },
    handleOptionCheck (e) {
      this.$emit('check', this)
    }
  }
}
</script>
