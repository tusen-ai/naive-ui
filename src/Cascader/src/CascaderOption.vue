<template>
  <div
    class="n-cascader-option"
    :class="{
      'n-cascader-option--selected': type === 'single' && value === NCascader.value,
      'n-cascader-option--active': active && !isLeaf,
      'n-cascader-option--tracked': tracked,
      'n-cascader-option--disabled': disabled,
      'n-cascader-option--not-leaf': !isLeaf,
      'n-cascader-option--loading': loading,
      'n-cascader-option--single-type': type === 'single'
    }"
    :n-option-id="optionId"
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
        :checked="checkboxChecked"
        :indeterminate="checkboxIndeterminate"
        @click.stop="handleOptionCheck"
      />
    </div>
    <div
      v-else-if="type==='multiple-all-options' || type === 'single-all-options'"
      class="n-cascader-option__radio"
    >
      <n-radio
        :disabled="disabled"
        :value="true"
        :checked-value="checked"
        @click.stop="handleOptionCheck"
      />
    </div>
    <div
      v-else-if="type==='single' && isLeaf"
      class="n-cascader-option__checkbox"
    >
      <!-- <n-checkbox
        :disabled="disabled"
        :checked="checked"
        @click.stop="handleOptionCheck"
      /> -->
    </div>
    <span
      class="n-cascader-option__label"
    >{{ label }}
    </span>
    <transition name="n-cascader-option-loading-transition">
      <div
        v-if="loading"
        class="n-cascader-option__loading"
      >
        <n-base-loading :theme="NCascader.syntheticTheme" />
      </div>
    </transition>
  </div>
</template>

<script>
import NCheckbox from '../../Checkbox'
import NRadio from '../../Radio'
import NBaseLoading from '../../_base/Loading'

export default {
  name: 'NCascaderOption',
  inject: {
    NCascader: {
      default: null
    }
  },
  components: {
    NCheckbox,
    NRadio,
    NBaseLoading
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
    optionId: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
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
      type: String,
      default: null
    },
    nextAvailableSiblingId: {
      type: String,
      default: null
    },
    availableParentId: {
      type: String,
      default: null
    },
    firstAvailableChildId: {
      type: String,
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
    },
    loaded: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    /** debug usage */
    hasCheckedLeaf: {
      type: Boolean,
      required: true
    },
    checkedLeafCount: {
      type: Number,
      required: true
    },
    leafCount: {
      type: Number,
      required: true
    },
    determined: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    option () {
      return {
        id: this.optionId,
        label: this.label,
        value: this.value,
        children: this.children,
        prevAvailableSiblingId: this.prevAvailableSiblingId,
        nextAvailableSiblingId: this.nextAvailableSiblingId,
        availableParentId: this.availableParentId,
        firstAvailableChildId: this.firstAvailableChildId,
        leafCount: this.leafCount,
        loaded: this.loaded,
        depth: this.depth,
        disabled: this.disabled,
        /** debug usage */
        hasCheckedLeaf: this.hasCheckedLeaf,
        checkedLeafCount: this.checkedLeafCount,
        isLeaf: this.isLeaf,
        determined: this.determined
      }
    }
  },
  created () {
    // console.log(this.type)
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e, this.option)
    },
    handleMouseEnter (e) {
      this.$emit('mouseenter', e, this.option)
    },
    handleMouseLeave (e) {
      this.$emit('mouseleave', e, this.option)
    },
    handleOptionCheck (e) {
      this.$emit('check', this.option)
    },
    setLoading (loading) {
      this.loading = loading
    }
  }
}
</script>
