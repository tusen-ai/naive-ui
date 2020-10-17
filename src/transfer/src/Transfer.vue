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
          >
            <template v-slot:suffix>
              <n-icon :size="16">
                <search-icon />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="n-transfer-list-flex-container">
          <template v-if="filteredSrcOpts.length">
            <!-- <n-scrollbar
              v-if="virtualScroll"
              :theme="mergedTheme"
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
                <template v-slot="{ item: option }">
                  <n-transfer-source-list-item
                    :key="option.value"
                    :value="option.value"
                    :disabled="!!option.disabled"
                    :label="option.label"
                    @click="handleSourceCheckboxClick"
                  />
                </template>
              </recycle-scroller>
            </n-scrollbar> -->
            <n-scrollbar :theme="mergedTheme">
              <div class="n-transfer-list-content">
                <transition-group name="item" :appear="isMounted">
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
          <transition name="n-fade-in-transition" :appear="isMounted">
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
          >
            <template v-slot:suffix>
              <n-icon :size="16">
                <search-icon />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="n-transfer-list-flex-container">
          <template v-if="filteredTgtOpts.length">
            <!-- <n-scrollbar
              v-if="virtualScroll"
              :theme="mergedTheme"
              :container="targetScrollContainer"
              :content="targetScrollContent"
            >
              <recycle-scroller
                v-if="virtualScroll"
                ref="targetVirtualScroller"
                class="n-virtual-scroller n-transfer-list-content"
                :items="filteredTgtOpts"
                :item-size="itemSize"
                key-field="value"
              >
                <template v-slot="{ item: option }">
                  <n-transfer-target-list-item
                    :key="option.value"
                    :value="option.value"
                    :disabled="!!option.disabled"
                    :label="option.label"
                    @click="handleTargetCheckboxClick"
                  />
                </template>
              </recycle-scroller>
            </n-scrollbar> -->
            <n-scrollbar :theme="mergedTheme">
              <div class="n-transfer-list-content">
                <transition-group name="item" :appear="isMounted">
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
          <transition name="n-fade-in-transition" :appear="isMounted">
            <n-empty v-if="!filteredTgtOpts.length" />
          </transition>
        </div>
      </div>
      <div class="n-transfer-list__border-mask" />
    </div>
  </div>
</template>

<script>
import NScrollbar from '../../scrollbar'
import NTransferHeaderCheckbox from './TransferHeaderCheckbox.vue'
import NTransferHeaderExtra from './TransferHeaderExtra.vue'
import NTransferSourceListItem from './TransferSourceListItem.vue'
import NTransferTargetListItem from './TransferTargetListItem.vue'
import NTransferButton from './TransferButton.vue'
import NInput from '../../input'
import NIcon from '../../icon'
import NEmpty from '../../empty'
import SearchIcon from '../../_icons/ios-search.vue'
import {
  configurable,
  asformitem,
  themeable,
  usecssr,
  locale
} from '../../_mixins'
import styles from './styles'
import { warn } from '../../_utils/naive'
import { call } from '../../_utils/vue'
import { useIsMounted } from '../../_utils/composition'
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
    SearchIcon
    // RecycleScroller
  },
  mixins: [
    configurable,
    themeable,
    usecssr(
      styles, {
        themeKey: 'mergedTheme',
        injectCssrProps: true
      }
    ),
    locale('Transfer'),
    asformitem()
  ],
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
      default: null
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
  provide () {
    return {
      NTransfer: this
    }
  },
  setup (props) {
    return {
      isMounted: useIsMounted(),
      ...data(props)
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
    }
  }
}
</script>
