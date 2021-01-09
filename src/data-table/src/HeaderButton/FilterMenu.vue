<template>
  <div class="n-data-table-filter-menu">
    <n-scrollbar
      :content-style="{
        transform: 'translateZ(0)'
      }"
    >
      <n-checkbox-group
        v-if="multiple"
        :value="cachedValue"
        class="n-data-table-filter-menu__group"
        @update:value="handleChange"
      >
        <n-checkbox
          v-for="option in options"
          :key="option.value"
          :unstable-theme="NDataTable.mergedTheme.peers.Checkbox"
          :unstable-theme-overrides="NDataTable.mergedTheme.overrides.Checkbox"
          :value="option.value"
        >
          {{ option.label }}
        </n-checkbox>
      </n-checkbox-group>
      <n-radio-group
        v-else
        :name="radioGroupName"
        class="n-data-table-filter-menu__group"
        :value="radioGroupValue"
        @update:value="handleChange"
      >
        <n-radio
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :unstable-theme-overrides="NDataTable.mergedTheme.overrides.Radio"
          :unstable-theme="NDataTable.mergedTheme.peers.Radio"
        >
          {{ option.label }}
        </n-radio>
      </n-radio-group>
    </n-scrollbar>
    <n-divider
      :unstable-theme-overrides="NDataTable.mergedTheme.overrides.Divider"
      :unstable-theme="NDataTable.mergedTheme.peers.Divider"
    />
    <div class="n-data-table-filter-menu__action">
      <n-button
        size="tiny"
        :unstable-theme-overrides="NDataTable.mergedTheme.overrides.Button"
        :unstable-theme="NDataTable.mergedTheme.peers.Button"
        @click="handleCancelClick"
      >
        {{ NDataTable.locale.clear }}
      </n-button>
      <n-button
        :unstable-theme-overrides="NDataTable.mergedTheme.overrides.Button"
        :unstable-theme="NDataTable.mergedTheme.peers.Button"
        type="primary"
        size="tiny"
        @click="handleConfirmClick"
      >
        {{ NDataTable.locale.confirm }}
      </n-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { NCheckbox, NCheckboxGroup } from '../../../checkbox'
import { NRadio, NRadioGroup } from '../../../radio'
import { NDivider } from '../../../divider'
import { NButton } from '../../../button'
import { NScrollbar } from '../../../scrollbar'
import { shouldUseArrayInSingleMode } from '../utils'

function isEqual (value, oldValue) {
  if (Array.isArray(value) && Array.isArray(oldValue)) {
    return (
      value.length === oldValue.length &&
      value.reduce((same, v, index) => {
        return same && v === oldValue[index]
      }, true)
    )
  } else {
    return value === oldValue
  }
}

export default defineComponent({
  components: {
    NCheckboxGroup,
    NCheckbox,
    NDivider,
    NRadioGroup,
    NRadio,
    NButton,
    NScrollbar
  },
  inject: ['NDataTable'],
  props: {
    column: {
      type: Object,
      required: true
    },
    radioGroupName: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    },
    value: {
      type: [Array, String, Number],
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    onConfirm: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      initialValue: this.value,
      cachedValue: this.value
    }
  },
  computed: {
    radioGroupValue () {
      const cachedValue = this.cachedValue
      if (this.multiple || shouldUseArrayInSingleMode(this.column)) {
        return (
          (Array.isArray(cachedValue) &&
            cachedValue.length &&
            cachedValue[0]) ||
          null
        )
      }
      return cachedValue
    }
  },
  methods: {
    doChange (value) {
      if (!isEqual(this.initialValue, value)) {
        this.onChange(value)
      }
    },
    handleChange (value) {
      if (this.multiple) {
        this.cachedValue = value
      } else if (shouldUseArrayInSingleMode(this.column)) {
        /** this branch is for compatibility */
        this.cachedValue = [value]
      } else {
        this.cachedValue = value
      }
    },
    handleConfirmClick (value) {
      this.doChange(this.cachedValue)
      this.onConfirm()
    },
    handleCancelClick () {
      if (this.multiple || shouldUseArrayInSingleMode(this.column)) {
        this.doChange([])
      } else {
        this.doChange(null)
      }
      this.onCancel()
    }
  }
})
</script>
