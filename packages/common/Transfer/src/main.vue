<template>
  <div class="n-transfer">
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-checkbox
            :value="sourceHeaderCheckboxChecked"
            :indeterminate="sourceHeaderCheckboxIndeterminate"
            @input="handleSourceHeaderCheckboxInput"
          />
        </div>
        <div class="n-transfer-list-header__header">
          Source
        </div>
        <div class="n-transfer-list-header__label">
          {{ sourceCheckedValueSet.size }} / {{ sourceOptions.length }}
        </div>
      </div>
      <div class="n-transfer-list-body">
        <n-scrollbar ref="leftScrollbar">
          <ul class="n-transfer-list-body-content">
            <n-transfer-list-item
              v-for="option in memorizedSourceOptions"
              :key="option.value"
              :show="sourceValueSet.has(option.value)"
              :value="option.value"
              :checked="sourceCheckedValueSet.has(option.value)"
              :disabled="option.disabled"
              source
              @click="handleSourceCheckboxInput(
                !sourceCheckedValueSet.has(option.value),
                option.value
              )"
            >
              {{ option.label }}
            </n-transfer-list-item>
          </ul>
        </n-scrollbar>
      </div>
    </div>
    <div class="n-transfer-actions">
      <button @click="handleToTargetClick">
        To Target
      </button>
      <button @click="handleToSourceClick">
        To Source
      </button>
    </div>
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-checkbox
            :value="targetHeaderCheckboxChecked"
            :indeterminate="targetHeaderCheckboxIndeterminate"
            @input="handleTargetHeaderCheckboxInput"
          />
        </div>
        <div class="n-transfer-list-header__header">
          Target
        </div>
        <div class="n-transfer-list-header__label">
          {{ targetCheckedValueSet.size }} / {{ targetOptions.length }}
        </div>
      </div>
      <div class="n-transfer-list-body">
        <n-scrollbar ref="rightScrollbar">
          <ul class="n-transfer-list-body-content">
            <n-transfer-list-item
              v-for="option in memorizedTargetOptions"
              :key="option.value"
              :show="targetValueSet.has(option.value)"
              :value="option.value"
              :checked="targetCheckedValueSet.has(option.value)"
              :disabled="option.disabled"
              target
              @click="handleTargetCheckboxInput(
                !targetCheckedValueSet.has(option.value),
                option.value
              )"
            >
              {{ option.label }}
            </n-transfer-list-item>
          </ul>
        </n-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import NCheckbox from '../../Checkbox'
import NScrollbar from '../../Scrollbar'
import NTransferListItem from './TransferListItem'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'NTransfer',
  components: {
    NCheckbox,
    NScrollbar,
    NTransferListItem
  },
  props: {
    value: {
      type: Array,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sourceCheckedValues: [],
      targetCheckedValues: [],
      memorizedSourceOptions: null,
      memorizedTargetOptions: null,
      init: true
    }
  },
  computed: {
    sourceHeaderCheckboxChecked () {
      return this.sourceCheckedValueSet.size === this.sourceOptions.length && !!this.sourceOptions.length
    },
    targetHeaderCheckboxChecked () {
      return this.targetCheckedValueSet.size === this.targetOptions.length && !!this.targetOptions.length
    },
    valueToOptionMap () {
      const map = new Map()
      this.options.forEach(option => {
        map.set(option.value, option)
      })
      return map
    },
    sourceHeaderCheckboxIndeterminate () {
      return this.sourceCheckedValueSet.size !== 0 && this.sourceCheckedValueSet.size < this.sourceOptions.length
    },
    targetHeaderCheckboxIndeterminate () {
      return this.targetCheckedValueSet.size !== 0 && this.targetCheckedValueSet.size < this.targetOptions.length
    },
    sourceValueSet () {
      return new Set(this.sourceOptions.map(option => option.value))
    },
    targetValueSet () {
      return new Set(this.targetOptions.map(option => option.value))
    },
    sourceCheckedValueSet () {
      return new Set(this.sourceCheckedValues.filter(value => this.valueToOptionMap.has(value)))
    },
    targetCheckedValueSet () {
      return new Set(this.targetCheckedValues.filter(value => this.valueToOptionMap.has(value)))
    },
    sourceOptions () {
      const valueSet = Array.isArray(this.value) ? new Set(this.value) : new Set()
      return this.memorizedSourceOptions.filter(option => !valueSet.has(option.value))
    },
    targetOptions () {
      const valueSet = Array.isArray(this.value) ? new Set(this.value) : new Set()
      return this.memorizedTargetOptions.filter(option => valueSet.has(option.value))
      // value.filter(v => this.valueToOptionMap.has(v)).map(v => this.valueToOptionMap.get(v))
    },
    orderedOptions () {
      return this.sourceOptions.concat(this.targetOptions)
    }
  },
  watch: {
    options (newOptions) {
      this.init = true
      this.$nextTick().then(() => {
        this.memorizedSourceOptions = cloneDeep(newOptions)
        this.memorizedTargetOptions = cloneDeep(newOptions)
        this.sourceCheckedValues = []
        this.targetCheckedValues = []
        return this.$nextTick()
      }).then(() => {
        this.init = false
      })
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.init = false
    })
  },
  created () {
    this.memorizedSourceOptions = cloneDeep(this.options)
    this.memorizedTargetOptions = cloneDeep(this.options)
  },
  methods: {
    emitInputEvent (value) {
      this.$emit('input', this.cleanValue(value))
    },
    cleanValue (value) {
      if (Array.isArray(value)) {
        return value.filter((v) => this.valueToOptionMap.has(v))
      } else return null
    },
    handleSourceHeaderCheckboxInput (value) {
      if (this.sourceHeaderCheckboxIndeterminate) {
        this.sourceCheckedValues = []
        return
      }
      if (value) {
        const newValues = this.sourceOptions.filter(option => !option.disabled).map(option => option.value).concat(this.sourceCheckedValues)
        this.sourceCheckedValues = Array.from(new Set(newValues))
      } else {
        this.sourceCheckedValues = []
      }
    },
    handleTargetHeaderCheckboxInput (value) {
      if (this.targetHeaderCheckboxIndeterminate) {
        this.targetCheckedValues = []
        return
      }
      if (value) {
        const newValues = this.targetOptions.filter(option => !option.disabled).map(option => option.value).concat(this.targetCheckedValues)
        this.targetCheckedValues = Array.from(new Set(newValues))
      } else {
        this.targetCheckedValues = []
      }
    },
    handleTargetCheckboxInput (checked, value) {
      if (checked) {
        this.targetCheckedValues.push(value)
      } else {
        const index = this.targetCheckedValues.findIndex(v => v === value)
        if (~index) this.targetCheckedValues.splice(index, 1)
      }
    },
    handleSourceCheckboxInput (checked, value) {
      if (checked) {
        this.sourceCheckedValues.push(value)
      } else {
        const index = this.sourceCheckedValues.findIndex(v => v === value)
        if (~index) this.sourceCheckedValues.splice(index, 1)
      }
    },
    handleToTargetClick () {
      let newValue = Array.isArray(this.value) ? this.value : []
      newValue = this.sourceCheckedValues.concat(newValue)
      const headTargetOptions = this.sourceCheckedValues.map(value => this.valueToOptionMap.get(value)).map(option => ({
        ...option
      }))
      const tailTargetOptions = this.memorizedTargetOptions.filter(option => !this.sourceCheckedValueSet.has(option.value)).map(option => ({
        ...option
      }))
      const reorderedTargetOptions = headTargetOptions.concat(tailTargetOptions)
      this.memorizedTargetOptions = reorderedTargetOptions
      this.$nextTick().then(() => {
        this.emitInputEvent(newValue)
      })
      this.sourceCheckedValues = []
    },
    handleToSourceClick () {
      let newValue = Array.isArray(this.value) ? this.value : []
      newValue = newValue.filter(value => !this.targetCheckedValueSet.has(value))
      const headSourceOptions = this.targetCheckedValues.map(value => this.valueToOptionMap.get(value)).map(option => ({
        ...option
      }))
      const tailSourceOptions = this.memorizedSourceOptions.filter(option => !this.targetCheckedValueSet.has(option.value)).map(option => ({
        ...option
      }))
      const reorderedSourceOptions = headSourceOptions.concat(tailSourceOptions)
      this.memorizedSourceOptions = reorderedSourceOptions
      this.$nextTick().then(() => {
        this.emitInputEvent(newValue)
      })
      this.targetCheckedValues = []
    }
  }
}
</script>
