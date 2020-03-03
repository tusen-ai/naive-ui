<template>
  <div
    class="n-transfer"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-transfer--filterable`]: filterable,
      [`n-transfer--${syntheticSize}-size`]: true
    }"
  >
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-transfer-header-checkbox :source="true" :theme="syntheticTheme" @change="handleSourceHeaderCheckboxChange" />
        </div>
        <div class="n-transfer-list-header__header">
          {{ sourceTitle || localeNamespace.sourceTitle }}
        </div>
        <n-transfer-header-extra :source="true" />
      </div>
      <div
        class="n-transfer-list-body"
        @mouseleave="handleSourceListMouseLeave"
      >
        <div v-if="filterable" class="n-transfer-filter">
          <n-input v-model="sourcePattern" clearable size="small" :placeholder="targetFilterPlaceholder">
            <template v-slot:suffix>
              <n-icon :size="16">
                <ios-search />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="n-transfer-list-flex-container">
          <template v-if="filteredSourceOptions.length">
            <n-scrollbar
              v-if="virtualScroll"
              :theme="syntheticTheme"
              :container="sourceScrollContainer"
              :content="sourceScrollContent"
            >
              <recycle-scroller
                v-if="virtualScroll"
                ref="sourceVirtualScroller"
                class="n-virtual-scroller n-transfer-list-content"
                :items="filteredSourceOptions"
                :item-size="itemSize"
                key-field="value"
              >
                <template v-slot:before>
                  <n-base-tracking-rect ref="sourceLightBar" :item-size="itemSize" :theme="syntheticTheme" />
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
                <n-base-tracking-rect ref="sourceLightBar" :item-size="itemSize" :theme="syntheticTheme" />
                <n-transfer-source-list-item
                  v-for="option in filteredSourceOptions"
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
          </template>
          <n-empty v-else />
        </div>
      </div>
      <div class="n-transfer-list__border-mask" />
    </div>
    <div class="n-transfer-gap">
      <n-transfer-button
        :to="true"
        @click="handleToTargetClick"
      />
      <n-transfer-button
        :to="false"
        @click="handleToSourceClick"
      />
    </div>
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-transfer-header-checkbox :theme="syntheticTheme" @change="handleTargetHeaderCheckboxChange" />
        </div>
        <div class="n-transfer-list-header__header">
          {{ targetTitle || localeNamespace.targetTitle }}
        </div>
        <n-transfer-header-extra />
      </div>
      <div
        class="n-transfer-list-body"
        @mouseleave="handleTargetListMouseLeave"
      >
        <div v-if="filterable" class="n-transfer-filter">
          <n-input v-model="targetPattern" clearable size="small" :placeholder="targetFilterPlaceholder">
            <template v-slot:suffix>
              <n-icon :size="16">
                <ios-search />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="n-transfer-list-flex-container">
          <template v-if="filteredTargetOptions.length">
            <n-scrollbar
              v-if="virtualScroll"
              :theme="syntheticTheme"
              :container="targetScrollContainer"
              :content="targetScrollContent"
            >
              <recycle-scroller
                v-if="virtualScroll"
                ref="targetVirtualScroller"
                class="n-virtual-scroller n-transfer-list-content"
                :items="filteredTargetOptions"
                :item-size="itemSize"
                key-field="value"
              >
                <template v-slot:before>
                  <n-base-tracking-rect ref="targetLightBar" :item-size="itemSize" :theme="syntheticTheme" />
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
                <n-base-tracking-rect ref="targetLightBar" :item-size="itemSize" :theme="syntheticTheme" />
                <n-transfer-target-list-item
                  v-for="(option, index) in filteredTargetOptions"
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
          </template>
          <n-empty v-else />
        </div>
      </div>
      <div class="n-transfer-list__border-mask" />
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
import NInput from '../../Input'
import NIcon from '../../Icon'
import NEmpty from '../../Empty'
import NBaseTrackingRect from '../../_base/TrackingRect'
import iosSearch from '../../_icons/ios-search'
import locale from '../../_mixins/locale'
import asformitem from '../../_mixins/asformitem'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import { RecycleScroller } from 'vue-virtual-scroller'
import debounce from 'lodash-es/debounce'
import { itemSize } from '../../_interoperation/common'

export default {
  name: 'NTransfer',
  components: {
    NTransferHeaderCheckbox,
    NTransferHeaderExtra,
    NScrollbar,
    NTransferSourceListItem,
    NTransferTargetListItem,
    NTransferButton,
    NBaseTrackingRect,
    NInput,
    NIcon,
    NEmpty,
    iosSearch,
    RecycleScroller
  },
  mixins: [withapp, themeable, locale('Transfer'), asformitem()],
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
    },
    sourceTitle: {
      type: String,
      default: null
    },
    targetTitle: {
      type: String,
      default: null
    },
    filterable: {
      type: Boolean,
      default: false
    },
    sourceFilterPlaceholder: {
      type: String,
      default: null
    },
    targetFilterPlaceholder: {
      type: String,
      default: null
    },
    filter: {
      type: Function,
      default: (pattern, option, from) => {
        if (!pattern) return true
        return ~('' + option.label).toLowerCase().indexOf(('' + pattern).toLowerCase())
      }
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: null
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
      sourcePattern: '',
      targetPattern: ''
    }
  },
  computed: {
    itemSize () {
      return itemSize[this.syntheticSize] || itemSize.medium
    },
    valueToOptionMap () {
      const map = new Map()
      this.options.forEach(option => {
        map.set(option.value, option)
      })
      return map
    },
    valueSet () {
      return Array.isArray(this.value) ? new Set(this.value) : new Set()
    },
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
    },
    filteredSourceOptions () {
      const filterable = this.filterable
      if (!filterable) return this.memorizedSourceOptions
      const sourcePattern = this.sourcePattern
      if (!sourcePattern.length) return this.memorizedSourceOptions
      const filter = this.filter
      return this.memorizedSourceOptions.filter(option => filter(sourcePattern, option, 'source'))
    },
    filteredTargetOptions () {
      const filterable = this.filterable
      if (!filterable) return this.targetOptions
      const targetPattern = this.targetPattern
      if (!targetPattern.length) return this.targetOptions
      const filter = this.filter
      return this.targetOptions.filter(option => filter(targetPattern, option, 'target'))
    }
  },
  watch: {
    options () {
      this.initialized = false
      const valueSet = this.valueSet
      this.memorizedSourceOptions = this.options.filter(option => !valueSet.has(option.value))
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
    this.memorizedSourceOptions = this.options.filter(option => !valueSet.has(option.value))
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
    clearSourceCheck () {
      const sourceValueSet = new Set(this.filteredSourceOptions.map(option => option.value))
      this.sourceCheckedValues = this.sourceCheckedValues.filter(value => !sourceValueSet.has(value))
    },
    handleSourceHeaderCheckboxChange (value) {
      if (this.sourceHeaderCheckboxIndeterminate) {
        if (!this.virtualScroll) {
          (this.$refs.sourceListItems || []).forEach(listItem => listItem.setChecked(false))
        }
        this.clearSourceCheck()
        return
      }
      if (value) {
        if (!this.virtualScroll) {
          (this.$refs.sourceListItems || []).forEach(listItem => listItem.setChecked(true))
        }
        const newValues = this.filteredSourceOptions
          .filter(option => !option.disabled)
          .map(option => option.value)
          .concat(this.sourceCheckedValues)
        this.sourceCheckedValues = Array.from(new Set(newValues))
      } else {
        if (!this.virtualScroll) {
          (this.$refs.sourceListItems || []).forEach(listItem => listItem.setChecked(false))
        }
        this.clearSourceCheck()
      }
    },
    clearTargetCheck () {
      const targetValueSet = new Set(this.filteredTargetOptions.map(option => option.value))
      this.targetCheckedValues = this.targetCheckedValues.filter(value => !targetValueSet.has(value))
    },
    handleTargetHeaderCheckboxChange (value) {
      if (this.targetHeaderCheckboxIndeterminate) {
        if (!this.virtualScroll) {
          (this.$refs.targetListItems || []).forEach(listItem => listItem.setChecked(false))
        }
        this.clearTargetCheck()
        return
      }
      if (value) {
        if (!this.virtualScroll) {
          (this.$refs.targetListItems || []).forEach(listItem => listItem.setChecked(true))
        }
        const newValues = this.filteredTargetOptions
          .filter(option => !option.disabled)
          .map(option => option.value)
          .concat(this.targetCheckedValues)
        this.targetCheckedValues = Array.from(new Set(newValues))
      } else {
        if (!this.virtualScroll) {
          (this.$refs.targetListItems || []).forEach(listItem => listItem.setChecked(false))
        }
        this.clearTargetCheck()
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
    handleToTargetClickWhenVirtualScroll () {
      let nextValue = Array.isArray(this.value) ? this.value : []
      nextValue = this.sourceCheckedValues.concat(nextValue)
      const sourceCheckedValueSet = this.sourceCheckedValueSet
      this.memorizedSourceOptions = this.memorizedSourceOptions
        .filter(option => !sourceCheckedValueSet.has(option.value))
      this.$emit('change', nextValue)
      this.sourceCheckedValues = []
    },
    handleToTargetClick () {
      if (this.virtualScroll) {
        this.handleToTargetClickWhenVirtualScroll()
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
    handleToSourceClickWhenVirtualScroll () {
      let newValue = Array.isArray(this.value) ? this.value : []
      const targetValueSet = this.targetCheckedValueSet
      newValue = newValue.filter(value => !targetValueSet.has(value))
      const valueToOptionMap = this.valueToOptionMap
      const newSourceOptions = this.targetCheckedValues.map(value => valueToOptionMap.get(value))
      this.memorizedSourceOptions = newSourceOptions.concat(this.memorizedSourceOptions)
      this.$emit('change', newValue)
      this.targetCheckedValues = []
    },
    handleToSourceClick () {
      if (this.virtualScroll) {
        this.handleToSourceClickWhenVirtualScroll()
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
      const sourceLightBar = this.$refs.sourceLightBar
      if (!sourceLightBar) return
      if (this.virtualScroll) {
        sourceLightBar.updateLightBarTop(true, () => index * this.itemSize)
      } else {
        sourceLightBar.updateLightBarTop(e.target)
      }
    }, 64),
    handleTargetOptionMouseEnter: debounce(function (e, index) {
      const targetLightBar = this.$refs.targetLightBar
      if (this.virtualScroll) {
        targetLightBar.updateLightBarTop(true, () => index * this.itemSize)
      } else {
        targetLightBar.updateLightBarTop(e.target)
      }
    }, 64),
    handleSourceOptionMouseLeave: debounce(function (e) {
      const sourceLightBar = this.$refs.sourceLightBar
      sourceLightBar && sourceLightBar.hideLightBar()
    }, 64),
    handleTargetOptionMouseLeave: debounce(function (e) {
      const targetLightBar = this.$refs.targetLightBar
      targetLightBar && targetLightBar.hideLightBar()
    }, 64),
    handleSourceListMouseLeave: debounce(function () {
      const sourceLightBar = this.$refs.sourceLightBar
      sourceLightBar && sourceLightBar.hideLightBar()
    }, 64),
    handleTargetListMouseLeave: debounce(function () {
      const targetLightBar = this.$refs.targetLightBar
      targetLightBar && targetLightBar.hideLightBar()
    }, 64)
  }
}
</script>
