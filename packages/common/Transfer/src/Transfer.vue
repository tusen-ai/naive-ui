<template>
  <div
    class="n-transfer"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-transfer-header-checkbox :source="true" :theme="synthesizedTheme" @change="handleSourceHeaderCheckboxChange" />
        </div>
        <div class="n-transfer-list-header__header">
          Source
        </div>
        <n-transfer-header-extra :source="true" />
      </div>
      <div
        class="n-transfer-list-body"
        @mouseleave="handleSourceListMouseLeave"
      >
        <n-scrollbar
          v-if="virtualScroll"
          :theme="synthesizedTheme"
          :container="sourceScrollContainer"
          :content="sourceScrollContent"
        >
          <recycle-scroller
            v-if="virtualScroll"
            ref="sourceVirtualScroller"
            class="n-virtual-scroller n-transfer-list-content"
            :items="memorizedSourceOptions"
            :item-size="ITEM_SIZE"
            key-field="value"
          >
            <template v-slot:before>
              <n-base-light-bar ref="sourceLightBar" :item-size="ITEM_SIZE" :theme="synthesizedTheme" />
            </template>
            <template v-slot="{ item: option, index }">
              <n-transfer-source-list-item
                :key="option.value"
                :value="option.value"
                :disabled="!!option.disabled"
                :label="option.label"
                :index="index"
                @click="handleSourceCheckboxClick"
                @mouseenter="handleSourceOptionMouseEnter"
                @mouseleave="handleSourceOptionMouseLeave"
              />
            </template>
          </recycle-scroller>
        </n-scrollbar>
        <n-scrollbar v-else>
          <div ref="sourceList" class="n-transfer-list-content">
            <n-base-light-bar ref="sourceLightBar" :item-size="ITEM_SIZE" :theme="synthesizedTheme" />
            <n-transfer-source-list-item
              v-for="option in memorizedSourceOptions"
              ref="sourceListItems"
              :key="option.value"
              :value="option.value"
              :disabled="!!option.disabled"
              :label="option.label"
              @click="handleSourceCheckboxClick"
              @mouseenter="handleSourceOptionMouseEnter"
              @mouseleave="handleSourceOptionMouseLeave"
            />
          </div>
        </n-scrollbar>
      </div>
    </div>
    <div class="n-transfer-gap">
      <n-transfer-button
        :to="true"
        @click="handleToTargetClick"
      >
        To Target
      </n-transfer-button>
      <n-transfer-button
        @click="handleToSourceClick"
      >
        To Source
      </n-transfer-button>
    </div>
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-transfer-header-checkbox :theme="synthesizedTheme" @change="handleTargetHeaderCheckboxChange" />
        </div>
        <div class="n-transfer-list-header__header">
          Target
        </div>
        <n-transfer-header-extra />
      </div>
      <div
        class="n-transfer-list-body"
        @mouseleave="handleTargetListMouseLeave"
      >
        <n-scrollbar
          v-if="virtualScroll"
          :theme="synthesizedTheme"
          :container="targetScrollContainer"
          :content="targetScrollContent"
        >
          <recycle-scroller
            v-if="virtualScroll"
            ref="targetVirtualScroller"
            class="n-virtual-scroller n-transfer-list-content"
            :items="targetOptions"
            :item-size="ITEM_SIZE"
            key-field="value"
          >
            <template v-slot:before>
              <n-base-light-bar ref="targetLightBar" :item-size="ITEM_SIZE" :theme="synthesizedTheme" />
            </template>
            <template v-slot="{ item: option, index }">
              <n-transfer-target-list-item
                :key="option.value"
                :value="option.value"
                :disabled="!!option.disabled"
                :label="option.label"
                :index="index"
                @click="handleTargetCheckboxClick"
                @mouseenter="handleTargetOptionMouseEnter"
                @mouseleave="handleTargetOptionMouseLeave"
              />
            </template>
          </recycle-scroller>
        </n-scrollbar>
        <n-scrollbar v-else>
          <div ref="targetList" class="n-transfer-list-content">
            <n-base-light-bar ref="targetLightBar" :item-size="ITEM_SIZE" :theme="synthesizedTheme" />
            <n-transfer-target-list-item
              v-for="(option, index) in targetOptions"
              ref="targetListItems"
              :key="option.value"
              :index="index"
              :value="option.value"
              :disabled="!!option.disabled"
              :label="option.label"
              @click="handleTargetCheckboxClick"
              @mouseenter="handleTargetOptionMouseEnter"
              @mouseleave="handleTargetOptionMouseLeave"
            />
          </div>
        </n-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import NScrollbar from '../../Scrollbar'
import NTransferHeaderCheckbox from './TransferHeaderCheckbox'
import NTransferHeaderExtra from './TransferHeaderExtra'
import NTransferSourceListItem from './TransferSourceListItem'
import NTransferTargetListItem from './TransferTargetListItem'
import NTransferButton from './TransferButton'
import cloneDeep from 'lodash/cloneDeep'
import asformitem from '../../../mixins/asformitem'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import { RecycleScroller } from 'vue-virtual-scroller'
import debounce from 'lodash-es/debounce'
import NBaseLightBar from '../../../base/LightBar'

const ITEM_SIZE = 34

export default {
  name: 'NTransfer',
  components: {
    NTransferHeaderCheckbox,
    NTransferHeaderExtra,
    NScrollbar,
    NTransferSourceListItem,
    NTransferTargetListItem,
    NTransferButton,
    NBaseLightBar,
    RecycleScroller
  },
  mixins: [withapp, themeable, asformitem()],
  model: {
    prop: 'value',
    event: 'change'
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
    },
    virtualScroll: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      NTransfer: this
    }
  },
  data () {
    return {
      sourceCheckedValues: [],
      targetCheckedValues: [],
      memorizedSourceOptions: null,
      nextSourceOptionsLength: null,
      nextTargetOptionsLength: null,
      enableSourceEnterAnimation: false,
      enableTargetEnterAnimation: false,
      initialized: false,
      ITEM_SIZE
    }
  },
  computed: {
    sourceScrollContainer () {
      if (this.virtualScroll) {
        return () => (
          this.$refs.sourceVirtualScroller &&
          this.$refs.sourceVirtualScroller.$el
        )
      }
      return null
    },
    sourceScrollContent () {
      if (this.virtualScroll) {
        return () => (
          this.$refs.sourceVirtualScroller &&
          this.$refs.sourceVirtualScroller.$refs.wrapper
        )
      }
      return null
    },
    targetScrollContainer () {
      if (this.virtualScroll) {
        return () => (
          this.$refs.targetVirtualScroller &&
          this.$refs.targetVirtualScroller.$el
        )
      }
      return null
    },
    targetScrollContent () {
      if (this.virtualScroll) {
        return () => (
          this.$refs.targetVirtualScroller &&
          this.$refs.targetVirtualScroller.$refs.wrapper
        )
      }
      return null
    },
    mergedDisabledStatus () {
      return {
        source: this.memorizedSourceOptions.every(option => option.disabled),
        target: this.targetOptions.every(option => option.disabled)
      }
    },
    sourceHeaderCheckboxDisabled () {
      return this.disabled || this.mergedDisabledStatus.source
    },
    targetHeaderCheckboxDisabled () {
      return this.disabled || this.mergedDisabledStatus.target
    },
    sourceHeaderCheckboxChecked () {
      return this.sourceCheckedValues.length === this.memorizedSourceOptions.length && !!this.memorizedSourceOptions.length
    },
    targetHeaderCheckboxChecked () {
      return this.targetCheckedValues.length === this.targetOptions.length && !!this.targetOptions.length
    },
    valueToOptionMap () {
      const map = new Map()
      this.options.forEach(option => {
        map.set(option.value, { ...option })
      })
      return map
    },
    sourceHeaderCheckboxIndeterminate () {
      return this.sourceCheckedValues.length !== 0 && this.sourceCheckedValues.length < this.memorizedSourceOptions.length
    },
    targetHeaderCheckboxIndeterminate () {
      return this.targetCheckedValues.length !== 0 && this.targetCheckedValues.length < this.targetOptions.length
    },
    sourceCheckedValueSet () {
      const valueToOptionMap = this.valueToOptionMap
      return new Set(this.sourceCheckedValues.filter(value => valueToOptionMap.has(value)))
    },
    targetCheckedValueSet () {
      const valueToOptionMap = this.valueToOptionMap
      return new Set(this.targetCheckedValues.filter(value => valueToOptionMap.has(value)))
    },
    valueSet () {
      return Array.isArray(this.value) ? new Set(this.value) : new Set()
    },
    sourceValueSet () {
      return this.mergedValueSet.sourceValueSet
    },
    targetValueSet () {
      return this.mergedValueSet.targetValueSet
    },
    mergedValueSet () {
      const valueSet = this.valueSet
      const sourceValueSet = new Set()
      const targetValueSet = new Set()
      this.options.forEach(option => {
        if (valueSet.has(option.value)) {
          targetValueSet.add(option.value)
        } else {
          sourceValueSet.add(option.value)
        }
      })
      return {
        sourceValueSet,
        targetValueSet
      }
    },
    targetOptions () {
      const vModelValue = Array.isArray(this.value) ? this.value : []
      const valueMap = this.valueToOptionMap
      const targetOptions = []
      vModelValue.forEach(value => {
        const option = valueMap.get(value)
        if (option !== undefined) targetOptions.push(option)
      })
      return targetOptions
    }
  },
  watch: {
    options (newOptions) {
      this.initialized = false
      const valueSet = this.valueSet
      this.memorizedSourceOptions = cloneDeep(this.options.filter(option => !valueSet.has(option.value)))
      this.sourceCheckedValues = []
      this.targetCheckedValues = []
      this.$nextTick().then(() => {
        this.initialized = true
      })
    }
  },
  mounted () {
    this.initialized = true
  },
  created () {
    const valueSet = this.valueSet
    this.memorizedSourceOptions = cloneDeep(this.options.filter(option => !valueSet.has(option.value)))
  },
  methods: {
    emitChangeEvent (value) {
      const newValue = this.cleanValue(value)
      this.$emit('change', newValue)
    },
    cleanValue (value) {
      if (Array.isArray(value)) {
        const valueToOptionMap = this.valueToOptionMap
        return value.filter(v => valueToOptionMap.has(v))
      } else return null
    },
    handleSourceHeaderCheckboxChange (value) {
      if (this.sourceHeaderCheckboxIndeterminate) {
        if (!this.virtualScroll) {
          (this.$refs.sourceListItems || []).forEach(listItem => listItem.setChecked(false))
        }
        this.sourceCheckedValues = []
        return
      }
      if (value) {
        if (!this.virtualScroll) {
          (this.$refs.sourceListItems || []).forEach(listItem => listItem.setChecked(true))
        }
        const newValues = this.memorizedSourceOptions
          .filter(option => !option.disabled)
          .map(option => option.value)
          .concat(this.sourceCheckedValues)
        this.sourceCheckedValues = Array.from(new Set(newValues))
      } else {
        if (!this.virtualScroll) {
          (this.$refs.sourceListItems || []).forEach(listItem => listItem.setChecked(false))
        }
        this.sourceCheckedValues = []
      }
    },
    handleTargetHeaderCheckboxChange (value) {
      if (this.targetHeaderCheckboxIndeterminate) {
        if (!this.virtualScroll) {
          (this.$refs.targetListItems || []).forEach(listItem => listItem.setChecked(false))
        }
        this.targetCheckedValues = []
        return
      }
      if (value) {
        if (!this.virtualScroll) {
          (this.$refs.targetListItems || []).forEach(listItem => listItem.setChecked(true))
        }
        const newValues = this.targetOptions
          .filter(option => !option.disabled)
          .map(option => option.value)
          .concat(this.targetCheckedValues)
        this.targetCheckedValues = Array.from(new Set(newValues))
      } else {
        if (!this.virtualScroll) {
          (this.$refs.targetListItems || []).forEach(listItem => listItem.setChecked(false))
        }
        this.targetCheckedValues = []
      }
    },
    handleTargetCheckboxClick (checked, optionValue) {
      if (checked) {
        this.targetCheckedValues.push(optionValue)
      } else {
        const index = this.targetCheckedValues.findIndex(v => v === optionValue)
        if (~index) {
          this.targetCheckedValues.splice(index, 1)
        }
      }
    },
    handleSourceCheckboxClick (checked, optionValue) {
      if (checked) {
        this.sourceCheckedValues.push(optionValue)
      } else {
        const index = this.sourceCheckedValues.findIndex(v => v === optionValue)
        if (~index) {
          this.sourceCheckedValues.splice(index, 1)
        }
      }
    },
    handleToTargetClick () {
      if (this.virtualScroll) {
        let newValue = Array.isArray(this.value) ? this.value : []
        newValue = this.sourceCheckedValues.concat(newValue)
        const sourceCheckedValueSet = this.sourceCheckedValueSet
        this.memorizedSourceOptions = this.memorizedSourceOptions
          .filter(option => !sourceCheckedValueSet.has(option.value))
        this.$emit('change', newValue)
        this.sourceCheckedValues = []
        return
      }
      this.enableTargetEnterAnimation = true
      const enteredItemEls = Array.from(this.$el.getElementsByClassName('n-transfer-list-item--enter'))
      const length = enteredItemEls.length
      for (let i = 0; i < length; ++i) {
        enteredItemEls[i].classList.remove('n-transfer-list-item--enter')
      }
      const sourceCheckedValues = this.sourceCheckedValues
      /** create new value */
      let newValue = Array.isArray(this.value) ? this.value : []
      newValue = sourceCheckedValues.concat(newValue)
      /** create new source length */
      this.nextSourceOptionsLength = this.memorizedSourceOptions.length - sourceCheckedValues.length
      /** play source leave animation */
      const sourceCheckedValueSet = this.sourceCheckedValueSet
      this.$refs.sourceListItems.forEach(listItem => {
        if (sourceCheckedValueSet.has(listItem.value)) {
          listItem.leave()
        }
      })
      window.setTimeout(() => {
        /** after animation is done change memorized source options to remove dom */
        this.memorizedSourceOptions = this.memorizedSourceOptions.filter(option => !sourceCheckedValueSet.has(option.value))
        this.nextSourceOptionsLength = null
        this.enableTargetEnterAnimation = false
      }, 500)
      /** clear check */
      this.sourceCheckedValues = []
      /** emit new value */
      /** auto play target options enter animation */
      this.$emit('change', newValue)
    },
    handleToSourceClick () {
      if (this.virtualScroll) {
        let newValue = Array.isArray(this.value) ? this.value : []
        const targetValueSet = this.targetCheckedValueSet
        newValue = newValue.filter(value => !targetValueSet.has(value))
        const valueToOptionMap = this.valueToOptionMap
        const newSourceOptions = this.targetCheckedValues.map(value => valueToOptionMap.get(value))
        this.memorizedSourceOptions = newSourceOptions.concat(this.memorizedSourceOptions)
        this.$emit('change', newValue)
        this.targetCheckedValues = []
        return
      }
      this.enableSourceEnterAnimation = true
      const enteredItemEls = Array.from(this.$el.getElementsByClassName('n-transfer-list-item--enter'))
      const length = enteredItemEls.length
      for (let i = 0; i < length; ++i) {
        enteredItemEls[i].classList.remove('n-transfer-list-item--enter')
      }
      /** create new value */
      let newValue = Array.isArray(this.value) ? this.value : []
      const targetValueSet = this.targetCheckedValueSet
      /** play target leave animation */
      this.$refs.targetListItems.forEach(listItem => {
        if (targetValueSet.has(listItem.value)) {
          listItem.leave()
        }
      })
      /** create new value sync to know nextTargetOptionsLength */
      newValue = newValue.filter(value => !targetValueSet.has(value))
      this.nextTargetOptionsLength = newValue.length
      window.setTimeout(() => {
        /** disable animation before apply dom change */
        this.targetAnimationDisabled = true
        /** after animation is done change value to remove dom */
        /** then emit new value */
        this.emitChangeEvent(newValue)
        this.enableSourceEnterAnimation = false
        this.nextTargetOptionsLength = null
      }, 500)
      /** change memorized source options */
      const valueToOptionMap = this.valueToOptionMap
      const newSourceOptions = this.targetCheckedValues.map(value => valueToOptionMap.get(value))
      this.memorizedSourceOptions = newSourceOptions.concat(this.memorizedSourceOptions)
      /** clear check */
      this.targetCheckedValues = []
    },
    handleSourceOptionMouseEnter: debounce(function (e, index) {
      if (this.virtualScroll) {
        this.$refs.sourceLightBar.updateLightBarTop(true, () => index * ITEM_SIZE)
      } else {
        this.$refs.sourceLightBar.updateLightBarTop(e.target)
      }
    }, 96),
    handleTargetOptionMouseEnter: debounce(function (e, index) {
      if (this.virtualScroll) {
        this.$refs.targetLightBar.updateLightBarTop(true, () => index * ITEM_SIZE)
      } else {
        this.$refs.targetLightBar.updateLightBarTop(e.target)
      }
    }, 96),
    handleSourceOptionMouseLeave: debounce(function (e) {
      this.$refs.sourceLightBar.hideLightBar()
    }, 96),
    handleTargetOptionMouseLeave: debounce(function (e) {
      this.$refs.targetLightBar.hideLightBar()
    }, 96),
    handleSourceListMouseLeave: debounce(function () {
      this.$refs.sourceLightBar.hideLightBar()
    }, 96),
    handleTargetListMouseLeave: debounce(function () {
      this.$refs.targetLightBar.hideLightBar()
    }, 96)
  }
}
</script>
