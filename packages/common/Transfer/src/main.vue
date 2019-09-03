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
            <transition
              v-for="option in memorizedOptions"
              :key="option.value"
              name="n-transfer-list-item-source--transition"
            >
              <n-transfer-list-item
                v-if="sourceValueSet.has(option.value)"
                :value="option.value"
                :checked="sourceCheckedValueSet.has(option.value)"
                @click="handleSourceCheckboxInput(
                  !sourceCheckedValueSet.has(option.value),
                  option.value
                )"
              >
                {{ option.label }}
              </n-transfer-list-item>
            </transition>
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
            <transition
              v-for="option in memorizedOptions"
              :key="option.value"
              name="n-transfer-list-item-target--transition"
            >
              <n-transfer-list-item
                v-if="targetValueSet.has(option.value)"
                :value="option.value"
                :checked="targetCheckedValueSet.has(option.value)"
                @click="handleTargetCheckboxInput(
                  !targetCheckedValueSet.has(option.value),
                  option.value
                )"
              >
                {{ option.label }}
              </n-transfer-list-item>
            </transition>
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
    }
  },
  data () {
    return {
      sourceCheckedValues: [],
      targetCheckedValues: [],
      memorizedOptions: null,
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
      this.memorizedOptions.forEach(option => {
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
      return this.memorizedOptions.filter(option => !valueSet.has(option.value))
    },
    targetOptions () {
      const value = Array.isArray(this.value) ? this.value : []
      return value.filter(v => this.valueToOptionMap.has(v)).map(v => this.valueToOptionMap.get(v))
    },
    orderedOptions () {
      return this.sourceOptions.concat(this.targetOptions)
    }
  },
  watch: {
    options (newOptions) {
      this.init = true
      this.$nextTick().then(() => {
        this.memorizedOptions = newOptions
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
    this.memorizedOptions = this.options
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
        this.sourceCheckedValues = this.sourceOptions.map(option => option.value)
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
        this.targetCheckedValues = this.targetOptions.map(option => option.value)
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
      this.emitInputEvent(newValue)
      this.sourceCheckedValues = []
    },
    handleToSourceClick () {
      let newValue = Array.isArray(this.value) ? this.value : []
      newValue = newValue.filter(value => this.valueToOptionMap.has(value))
      const filteredValues = newValue.filter(value => this.targetCheckedValueSet.has(value))
      const stayedValues = newValue.filter(value => !this.targetCheckedValueSet.has(value))
      newValue = stayedValues
      const reorderedOptionsFirstPart = filteredValues.concat(stayedValues).map(value => this.valueToOptionMap.get(value))
      const reorderedOptionsSecondPart = this.memorizedOptions.filter(option => !filteredValues.includes(option.value) && !stayedValues.includes(option.value))
      const reorderedOptions = reorderedOptionsFirstPart.concat(reorderedOptionsSecondPart)
      this.memorizedOptions = reorderedOptions
      this.emitInputEvent(stayedValues)
      this.targetCheckedValues = []
    }
  }
}
</script>
