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
      class="n-cascader-option__prefix"
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
      class="n-cascader-option__prefix"
    >
      <n-radio
        :disabled="disabled"
        :value="true"
        :checked-value="checked"
        @click.stop="handleOptionCheck"
      />
    </div>
    <span
      class="n-cascader-option__label"
    >{{ label }}</span>
    <div
      v-if="!isLeaf || (isLeaf && type === 'single')"
      class="n-cascader-option__suffix"
    >
      <div
        class="n-cascader-option-icon-placeholder"
      >
        <n-icon-switch-transition
          v-if="!isLeaf"
        >
          <n-base-loading
            v-if="loading"
            key="loading"
            class="n-cascader-option-icon"
            :theme="NCascader.syntheticTheme"
          />
          <n-icon
            v-else
            key="arrow"
            class="n-cascader-option-icon n-cascader-option-icon--arrow"
          >
            <chevron-right-icon />
          </n-icon>
        </n-icon-switch-transition>
        <n-icon
          v-else-if="checked"
          class="n-cascader-option-icon n-cascader-option-icon--checkmark"
        >
          <checkmark-icon />
        </n-icon>
      </div>
    </div>
  </div>
</template>

<script>
import NCheckbox from '../../checkbox'
import NRadio from '../../radio'
import NBaseLoading from '../../_base/loading'
import NIconSwitchTransition from '../../_transition/IconSwitchTransition'
import { ChevronRightIcon, CheckmarkIcon } from '../../_base/icons'

export default {
  name: 'NCascaderOption',
  inject: {
    NCascader: {
      default: null
    },
    NCascaderMenu: {
      default: null
    }
  },
  components: {
    NCheckbox,
    NRadio,
    NBaseLoading,
    NIconSwitchTransition,
    ChevronRightIcon,
    CheckmarkIcon
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
  methods: {
    handleClick (e) {
      const {
        NCascaderMenu: {
          handleOptionClick
        }
      } = this
      handleOptionClick(e, this.option)
    },
    handleMouseEnter (e) {
      const {
        NCascaderMenu: {
          handleOptionMouseEnter
        }
      } = this
      handleOptionMouseEnter(e, this.option)
    },
    handleMouseLeave (e) {
      const {
        NCascaderMenu: {
          handleOptionMouseLeave
        }
      } = this
      handleOptionMouseLeave(e, this.option)
    },
    handleOptionCheck () {
      const {
        NCascaderMenu: {
          handleOptionCheck
        }
      } = this
      handleOptionCheck(this.option.id)
    }
  }
}
</script>
