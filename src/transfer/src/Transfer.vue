<template>
  <div
    class="n-transfer"
    :class="{
      [`n-transfer--filterable`]: filterable
    }"
    :style="cssVars"
  >
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-transfer-header-checkbox
            :source="true"
            @change="handleSrcHeaderCheck"
          />
        </div>
        <div class="n-transfer-list-header__header">
          {{ sourceTitle || locale.sourceTitle }}
        </div>
        <n-transfer-header-extra :source="true" />
      </div>
      <div class="n-transfer-list-body">
        <div v-if="filterable" class="n-transfer-filter">
          <n-input
            v-model:value="srcPattern"
            clearable
            size="small"
            :unstable-theme="mergedTheme.peers.Input"
            :unstable-theme-overrides="mergedTheme.overrides.Input"
            :placeholder="targetFilterPlaceholder"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          >
            <template #clear>
              <n-base-icon>
                <search-icon />
              </n-base-icon>
            </template>
          </n-input>
        </div>
        <div class="n-transfer-list-flex-container">
          <template v-if="filteredSrcOpts.length">
            <n-scrollbar
              v-if="virtualScroll"
              ref="srcScrollerRef"
              :unstable-theme="mergedTheme.peers.Scrollbar"
              :unstable-theme-overrides="mergedTheme.overrides.Scrollbar"
              :container="srcScrollContainer"
              :content="srcScrollContent"
            >
              <virtual-list
                ref="srcVlRef"
                class="n-virtual-scroller n-transfer-list-content"
                :items="filteredSrcOpts"
                :item-size="itemSize"
                :show-scrollbar="false"
                @resize="syncSrcVLScroller"
                @scroll="syncSrcVLScroller"
              >
                <template #="{ item }">
                  <n-transfer-source-list-item
                    :key="item.value"
                    :value="item.value"
                    :disabled="item.disabled || disabled"
                    :label="item.label"
                  />
                </template>
              </virtual-list>
            </n-scrollbar>
            <n-scrollbar
              v-else
              :unstable-theme="mergedTheme.peers.Scrollbar"
              :unstable-theme-overrides="mergedTheme.overrides.Scrollbar"
            >
              <div class="n-transfer-list-content">
                <transition-group
                  name="item"
                  :appear="isMounted"
                  :css="!isInputing"
                >
                  <n-transfer-source-list-item
                    v-for="option in filteredSrcOpts"
                    :key="option.value"
                    :value="option.value"
                    :disabled="!!option.disabled || disabled"
                    :label="option.label"
                  />
                </transition-group>
              </div>
            </n-scrollbar>
          </template>
          <transition
            name="n-fade-in-transition"
            :appear="isMounted"
            :css="!isInputing"
          >
            <n-empty v-if="!filteredSrcOpts.length" />
          </transition>
        </div>
      </div>
      <div class="n-transfer-list__border" />
    </div>
    <div class="n-transfer-gap">
      <n-button
        :disabled="toButtonDisabled || disabled"
        :unstable-theme="mergedTheme.peers.Button"
        :unstable-theme-overrides="mergedTheme.overrides.Button"
        @click="handleToTgtClick"
      >
        <template #icon>
          <n-base-icon>
            <chevron-right-icon />
          </n-base-icon>
        </template>
      </n-button>
      <n-button
        :disabled="fromButtonDisabled || disabled"
        :unstable-theme="mergedTheme.peers.Button"
        :unstable-theme-overrides="mergedTheme.overrides.Button"
        @click="handleToSrcClick"
      >
        <template #icon>
          <n-base-icon>
            <chevron-left-icon />
          </n-base-icon>
        </template>
      </n-button>
    </div>
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-transfer-header-checkbox @change="handleTgtHeaderCheck" />
        </div>
        <div class="n-transfer-list-header__header">
          {{ targetTitle || locale.targetTitle }}
        </div>
        <n-transfer-header-extra />
      </div>
      <div class="n-transfer-list-body">
        <div v-if="filterable" class="n-transfer-filter">
          <n-input
            v-model:value="tgtPattern"
            :unstable-theme="mergedTheme.peers.Input"
            :unstable-theme-overrides="mergedTheme.overrides.Input"
            clearable
            size="small"
            :placeholder="targetFilterPlaceholder"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          >
            <template #clear>
              <n-base-icon>
                <search-icon />
              </n-base-icon>
            </template>
          </n-input>
        </div>
        <div class="n-transfer-list-flex-container">
          <template v-if="filteredTgtOpts.length">
            <n-scrollbar
              v-if="virtualScroll"
              ref="tgtScrollerRef"
              :unstable-theme="mergedTheme.peers.Scrollbar"
              :unstable-theme-overrides="mergedTheme.overrides.Scrollbar"
              :container="tgtScrollContainer"
              :content="tgtScrollContent"
            >
              <virtual-list
                ref="tgtVlRef"
                class="n-virtual-scroller n-transfer-list-content"
                :items="filteredTgtOpts"
                :item-size="itemSize"
                :show-scrollbar="false"
                @resize="syncTgtVLScroller"
                @scroll="syncTgtVLScroller"
              >
                <template #default="{ item: option }">
                  <n-transfer-target-list-item
                    :key="option.value"
                    :value="option.value"
                    :disabled="!!option.disabled || disabled"
                    :label="option.label"
                  />
                </template>
              </virtual-list>
            </n-scrollbar>
            <n-scrollbar
              v-else
              :unstable-theme="mergedTheme.peers.Scrollbar"
              :unstable-theme-overrides="mergedTheme.overrides.Scrollbar"
            >
              <div class="n-transfer-list-content">
                <transition-group
                  name="item"
                  :appear="isMounted"
                  :css="!isInputing"
                >
                  <n-transfer-target-list-item
                    v-for="option in filteredTgtOpts"
                    :key="option.value"
                    :value="option.value"
                    :disabled="!!option.disabled || disabled"
                    :label="option.label"
                  />
                </transition-group>
              </div>
            </n-scrollbar>
          </template>
          <transition
            name="n-fade-in-transition"
            :appear="isMounted"
            :css="!isInputing"
          >
            <n-empty
              v-if="!filteredTgtOpts.length"
              :unstable-theme="mergedTheme.peers.Empty"
              :unstable-theme-overrides="mergedTheme.overrides.Empty"
            />
          </transition>
        </div>
      </div>
      <div class="n-transfer-list__border" />
    </div>
  </div>
</template>

<script>
import { computed, ref, defineComponent } from 'vue'
import { VirtualList } from 'vueuc'
import { useIsMounted } from 'vooks'
import { depx } from 'seemly'
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '../../_base/icons'
import { NBaseIcon } from '../../_base'
import { NScrollbar } from '../../scrollbar'
import { NInput } from '../../input'
import { NEmpty } from '../../empty'
import { useLocale, useFormItem, useTheme } from '../../_mixins'
import { createKey } from '../../_utils/cssr'
import { warn, call } from '../../_utils'
import { transferLight } from '../styles'
import NTransferHeaderCheckbox from './TransferHeaderCheckbox.vue'
import NTransferHeaderExtra from './TransferHeaderExtra.vue'
import NTransferSourceListItem from './TransferSourceListItem.vue'
import NTransferTargetListItem from './TransferTargetListItem.vue'
import { data } from './data-utils'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Transfer',
  components: {
    NTransferHeaderCheckbox,
    NTransferHeaderExtra,
    NScrollbar,
    NTransferSourceListItem,
    NTransferTargetListItem,
    NInput,
    NBaseIcon,
    NEmpty,
    SearchIcon,
    VirtualList,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  provide () {
    return {
      NTransfer: this
    }
  },
  props: {
    ...useTheme.props,
    value: {
      type: Array,
      default: undefined
    },
    defaultValue: {
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
      default: undefined
    },
    targetTitle: {
      type: String,
      default: undefined
    },
    filterable: {
      type: Boolean,
      default: false
    },
    sourceFilterPlaceholder: {
      type: String,
      default: undefined
    },
    targetFilterPlaceholder: {
      type: String,
      default: undefined
    },
    filter: {
      type: Function,
      default: (pattern, option, from) => {
        if (!pattern) return true
        return ~('' + option.label)
          .toLowerCase()
          .indexOf(('' + pattern).toLowerCase())
      }
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    onChange: {
      validator () {
        if (__DEV__) {
          warn(
            'transfer',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Transfer',
      'Transfer',
      style,
      transferLight,
      props
    )
    const formItem = useFormItem(props)
    const itemSizeRef = computed(() => {
      const {
        mergedSize: { value: size }
      } = formItem
      const {
        self: { [createKey('itemHeight', size)]: itemSize }
      } = themeRef.value
      return depx(itemSize)
    })
    return {
      ...data(props),
      ...formItem,
      ...useLocale('Transfer'),
      itemSize: itemSizeRef,
      isMounted: useIsMounted(),
      srcScrollerRef: ref(null),
      tgtScrollerRef: ref(null),
      srcVlRef: ref(null),
      tgtVlRef: ref(null),
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          mergedSize: { value: size }
        } = formItem
        const {
          common: {
            cubicBezierEaseInOut,
            cubicBezierEaseIn,
            cubicBezierEaseOut
          },
          self: {
            width,
            borderRadius,
            borderColor,
            listColor,
            headerColor,
            titleTextColor,
            titleTextColorDisabled,
            headerExtraTextColor,
            filterDividerColor,
            itemTextColor,
            itemColorPending,
            itemTextColorDisabled,
            extraFontSize,
            titleFontWeight,
            [createKey('fontSize', size)]: fontSize,
            [createKey('itemHeight', size)]: itemHeight
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--bezier-ease-in': cubicBezierEaseIn,
          '--bezier-ease-out': cubicBezierEaseOut,
          '--border-color': borderColor,
          '--border-radius': borderRadius,
          '--extra-font-size': extraFontSize,
          '--filter-divider-color': filterDividerColor,
          '--font-size': fontSize,
          '--header-color': headerColor,
          '--header-extra-text-color': headerExtraTextColor,
          '--header-font-weight': titleFontWeight,
          '--header-text-color': titleTextColor,
          '--header-text-color-disabled': titleTextColorDisabled,
          '--item-color-pending': itemColorPending,
          '--item-height': itemHeight,
          '--item-text-color': itemTextColor,
          '--item-text-color-disabled': itemTextColorDisabled,
          '--list-color': listColor,
          '--width': width
        }
      })
    }
  },
  methods: {
    doUpdateValue (value) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, value)
      if (onChange) call(onChange, value)
      this.uncontrolledValue = value
      nTriggerFormInput()
      nTriggerFormChange()
    },
    handleSrcHeaderCheck (value) {
      const {
        srcCheckedStatus: { checked, indeterminate }
      } = this
      if (indeterminate || checked) {
        this.srcCheckedValues = []
      } else {
        this.srcCheckedValues = Array.from(this.avlSrcValueSet)
      }
    },
    handleTgtHeaderCheck () {
      const {
        tgtCheckedStatus: { checked, indeterminate }
      } = this
      if (indeterminate || checked) {
        this.tgtCheckedValues = []
      } else {
        this.tgtCheckedValues = Array.from(this.avlTgtValueSet)
      }
    },
    handleTgtCheckboxClick (checked, optionValue) {
      if (checked) {
        this.tgtCheckedValues.push(optionValue)
      } else {
        const index = this.tgtCheckedValues.findIndex((v) => v === optionValue)
        if (~index) {
          this.tgtCheckedValues.splice(index, 1)
        }
      }
    },
    handleSrcCheckboxClick (checked, optionValue) {
      if (checked) {
        this.srcCheckedValues.push(optionValue)
      } else {
        const index = this.srcCheckedValues.findIndex((v) => v === optionValue)
        if (~index) {
          this.srcCheckedValues.splice(index, 1)
        }
      }
    },
    handleToTgtClick () {
      this.doUpdateValue(this.srcCheckedValues.concat(this.mergedValue || []))
      this.srcCheckedValues = []
    },
    handleToSrcClick () {
      const tgtCheckedValueSet = new Set(this.tgtCheckedValues)
      this.doUpdateValue(
        (this.mergedValue || []).filter((v) => !tgtCheckedValueSet.has(v))
      )
      this.tgtCheckedValues = []
    },
    // scroll related
    syncSrcVLScroller () {
      const { srcScrollerRef } = this
      srcScrollerRef && srcScrollerRef.sync()
    },
    syncTgtVLScroller () {
      const { tgtScrollerRef } = this
      tgtScrollerRef && tgtScrollerRef.sync()
    },
    srcScrollContainer () {
      return this.srcVlRef?.listRef
    },
    srcScrollContent () {
      return this.srcVlRef?.itemsRef
    },
    tgtScrollContainer () {
      return this.tgtVlRef?.listRef
    },
    tgtScrollContent () {
      return this.tgtVlRef?.itemsRef
    }
  }
})
</script>
