<template>
  <div
    class="n-transfer"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-transfer--filterable`]: filterable,
      [`n-transfer--${mergedSize}-size`]: true
    }"
  >
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-transfer-header-checkbox
            :source="true"
            :theme="mergedTheme"
            @change="handleSrcHeaderCheck"
          />
        </div>
        <div class="n-transfer-list-header__header">
          {{ sourceTitle || localeNs.sourceTitle }}
        </div>
        <n-transfer-header-extra :source="true" />
      </div>
      <div
        class="n-transfer-list-body"
      >
        <div v-if="filterable" class="n-transfer-filter">
          <n-input
            v-model:value="srcPattern"
            clearable
            size="small"
            :placeholder="targetFilterPlaceholder"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          >
            <template #suffix>
              <n-icon :size="16">
                <search-icon />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="n-transfer-list-flex-container">
          <template v-if="filteredSrcOpts.length">
            <n-scrollbar
              v-if="virtualScroll"
              ref="srcScrollerRef"
              :theme="mergedTheme"
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
                    :disabled="item.disabled"
                    :label="item.label"
                  />
                </template>
              </virtual-list>
            </n-scrollbar>
            <n-scrollbar
              v-else
              :theme="mergedTheme"
            >
              <div class="n-transfer-list-content">
                <transition-group name="item" :appear="isMounted" :css="!isInputing">
                  <n-transfer-source-list-item
                    v-for="option in filteredSrcOpts"
                    :key="option.value"
                    :value="option.value"
                    :disabled="!!option.disabled"
                    :label="option.label"
                  />
                </transition-group>
              </div>
            </n-scrollbar>
          </template>
          <transition name="n-fade-in-transition" :appear="isMounted" :css="!isInputing">
            <n-empty v-if="!filteredSrcOpts.length" />
          </transition>
        </div>
      </div>
      <div class="n-transfer-list__border-mask" />
    </div>
    <div class="n-transfer-gap">
      <n-transfer-button
        :to="true"
        @click="handleToTgtClick"
      />
      <n-transfer-button
        :to="false"
        @click="handleToSrcClick"
      />
    </div>
    <div class="n-transfer-list">
      <div class="n-transfer-list-header">
        <div class="n-transfer-list-header__checkbox">
          <n-transfer-header-checkbox
            :theme="mergedTheme"
            @change="handleTgtHeaderCheck"
          />
        </div>
        <div class="n-transfer-list-header__header">
          {{ targetTitle || localeNs.targetTitle }}
        </div>
        <n-transfer-header-extra />
      </div>
      <div
        class="n-transfer-list-body"
      >
        <div v-if="filterable" class="n-transfer-filter">
          <n-input
            v-model:value="tgtPattern"
            clearable
            size="small"
            :placeholder="targetFilterPlaceholder"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          >
            <template #suffix>
              <n-icon :size="16">
                <search-icon />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="n-transfer-list-flex-container">
          <template v-if="filteredTgtOpts.length">
            <n-scrollbar
              v-if="virtualScroll"
              ref="tgtScrollerRef"
              :theme="mergedTheme"
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
                    :disabled="!!option.disabled"
                    :label="option.label"
                  />
                </template>
              </virtual-list>
            </n-scrollbar>
            <n-scrollbar
              v-else
              :theme="mergedTheme"
            >
              <div class="n-transfer-list-content">
                <transition-group name="item" :appear="isMounted" :css="!isInputing">
                  <n-transfer-target-list-item
                    v-for="option in filteredTgtOpts"
                    :key="option.value"
                    :value="option.value"
                    :disabled="!!option.disabled"
                    :label="option.label"
                  />
                </transition-group>
              </div>
            </n-scrollbar>
          </template>
          <transition name="n-fade-in-transition" :appear="isMounted" :css="!isInputing">
            <n-empty v-if="!filteredTgtOpts.length" />
          </transition>
        </div>
      </div>
      <div class="n-transfer-list__border-mask" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { VirtualList } from 'vueuc'
import { useIsMounted } from 'vooks'
import { depx } from 'seemly'
import NScrollbar from '../../scrollbar'
import NTransferHeaderCheckbox from './TransferHeaderCheckbox.vue'
import NTransferHeaderExtra from './TransferHeaderExtra.vue'
import NTransferSourceListItem from './TransferSourceListItem.vue'
import NTransferTargetListItem from './TransferTargetListItem.vue'
import NTransferButton from './TransferButton.vue'
import NInput from '../../input'
import NIcon from '../../icon'
import NEmpty from '../../empty'
import {
  SearchIcon
} from '../../_base/icons'
import {
  configurable,
  asFormItem,
  themeable,
  withCssr,
  locale
} from '../../_mixins'
import styles from './styles'
import { createKey } from '../../_utils/cssr'
import { warn, call } from '../../_utils'
import { data } from './data-utils'

export default {
  name: 'Transfer',
  components: {
    NTransferHeaderCheckbox,
    NTransferHeaderExtra,
    NScrollbar,
    NTransferSourceListItem,
    NTransferTargetListItem,
    NTransferButton,
    NInput,
    NIcon,
    NEmpty,
    SearchIcon,
    VirtualList
  },
  mixins: [
    configurable,
    themeable,
    withCssr(
      styles, {
        themeKey: 'mergedTheme',
        injectCssrProps: true
      }
    ),
    locale('Transfer'),
    asFormItem()
  ],
  provide () {
    return {
      NTransfer: this
    }
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
        return ~('' + option.label).toLowerCase().indexOf(('' + pattern).toLowerCase())
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
        if (__DEV__) warn('transfer', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    return {
      isMounted: useIsMounted(),
      srcScrollerRef: ref(null),
      tgtScrollerRef: ref(null),
      srcVlRef: ref(null),
      tgtVlRef: ref(null),
      ...data(props)
    }
  },
  computed: {
    itemSize () {
      return depx(this.cssrProps.$local[createKey('itemHeight', this.mergedSize)])
    }
  },
  methods: {
    doUpdateValue (...args) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, ...args)
      if (onChange) call(onChange, ...args)
      nTriggerFormInput()
      nTriggerFormChange()
    },
    handleSrcHeaderCheck (value) {
      const {
        srcCheckedStatus: {
          checked,
          indeterminate
        }
      } = this
      if (indeterminate || checked) {
        this.srcCheckedValues = []
      } else {
        this.srcCheckedValues = Array.from(this.avlSrcValueSet)
      }
    },
    handleTgtHeaderCheck () {
      const {
        tgtCheckedStatus: {
          checked,
          indeterminate
        }
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
        const index = this.tgtCheckedValues.findIndex(v => v === optionValue)
        if (~index) {
          this.tgtCheckedValues.splice(index, 1)
        }
      }
    },
    handleSrcCheckboxClick (checked, optionValue) {
      if (checked) {
        this.srcCheckedValues.push(optionValue)
      } else {
        const index = this.srcCheckedValues.findIndex(v => v === optionValue)
        if (~index) {
          this.srcCheckedValues.splice(index, 1)
        }
      }
    },
    handleToTgtClick () {
      this.doUpdateValue(this.srcCheckedValues.concat(this.value || []))
      this.srcCheckedValues = []
    },
    handleToSrcClick () {
      const tgtCheckedValueSet = new Set(this.tgtCheckedValues)
      this.doUpdateValue((this.value || []).filter(v => !tgtCheckedValueSet.has(v)))
      this.tgtCheckedValues = []
    },
    // scroll related
    syncSrcVLScroller () {
      const {
        srcScrollerRef
      } = this
      srcScrollerRef && srcScrollerRef.sync()
    },
    syncTgtVLScroller () {
      const {
        tgtScrollerRef
      } = this
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
}
</script>
