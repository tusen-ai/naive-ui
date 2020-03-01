<template>
  <div class="n-data-table-filter-menu">
    <n-checkbox-group
      v-if="multiple"
      :value="cachedValue"
      class="n-data-table-filter-menu__group"
      @change="handleChange"
    >
      <n-checkbox
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </n-checkbox>
    </n-checkbox-group>
    <n-radio-group
      v-else
      :name="radioGroupName"
      class="n-data-table-filter-menu__group"
      :value="cachedValue && cachedValue[0]"
      @change="handleChange"
    >
      <n-radio
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </n-radio>
    </n-radio-group>
    <n-divider />
    <div class="n-data-table-filter-menu__action">
      <n-button size="tiny" round @click="handleCancelClick">
        {{ NDataTable.localeNamespace.clear }}
      </n-button>
      <n-button type="primary" size="tiny" round @click="handleConfirmClick">
        {{ NDataTable.localeNamespace.confirm }}
      </n-button>
    </div>
  </div>
</template>

<script>
import NCheckboxGroup from '../../../Checkbox/src/CheckboxGroup'
import NCheckbox from '../../../Checkbox/src/Checkbox'
import NRadioGroup from '../../../Radio/src/RadioGroup'
import NRadio from '../../../Radio/src/Radio'
import NDivider from '../../../Divider'
import NButton from '../../../Button'

function isEqual (value, oldValue) {
  if (Array.isArray(value) && Array.isArray(oldValue)) {
    return value.length === oldValue.length && value.reduce((same, v, index) => {
      return same && v === oldValue[index]
    }, true)
  } else {
    return value === oldValue
  }
}

export default {
  inject: {
    NDataTable: {
      default: null
    }
  },
  components: {
    NCheckboxGroup,
    NCheckbox,
    NDivider,
    NRadioGroup,
    NRadio,
    NButton
  },
  props: {
    radioGroupName: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    },
    value: {
      type: Array,
      default: null
    },
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      initialValue: this.value,
      cachedValue: this.value
    }
  },
  methods: {
    handleChange (value) {
      if (this.multiple) {
        this.cachedValue = value
      } else {
        this.cachedValue = [value]
      }
    },
    handleConfirmClick (value) {
      this.emitChangeEvent(this.cachedValue)
      this.$emit('confirm')
    },
    handleCancelClick () {
      this.emitChangeEvent([])
      this.$emit('cancel')
    },
    emitChangeEvent (value) {
      if (!isEqual(this.initialValue, value)) {
        this.$emit('change', value)
      }
    }
  }
}
</script>
