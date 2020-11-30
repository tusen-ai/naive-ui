<template>
  <div class="n-select">
    <v-binder>
      <v-target>
        <n-base-selection
          ref="triggerRef"
          :bordered="mergedBordered"
          :active="mergedShow"
          :pattern="pattern"
          :placeholder="localizedPlaceholder"
          :selected-option="selectedOption"
          :selected-options="selectedOptions"
          :multiple="multiple"
          :filterable="filterable"
          :remote="remote"
          :clearable="clearable"
          :disabled="disabled"
          :size="mergedSize"
          :theme="mergedTheme"
          :loading="loading"
          :autofocus="autofocus"
          @click="handleTriggerClick"
          @delete-last-option="handleDeleteLastOption"
          @delete-option="handleToggleOption"
          @pattern-input="handlePatternInput"
          @clear="handleClear"
          @blur="handleTriggerBlur"
          @focus="handleTriggerFocus"
          @keydown.up.prevent
          @keydown.down.prevent
          @keydown.space="handleKeyDownSpace"
          @keyup.up="handleKeyUpUp"
          @keyup.down="handleKeyUpDown"
          @keyup.enter="handleKeyUpEnter"
          @keyup.space="handleKeyUpSpace"
          @keyup.esc="handleKeyUpEsc"
        />
      </v-target>
      <v-follower
        ref="followerRef"
        :show="mergedShow"
        :to="adjustedTo"
        :container-class="namespace"
        width="target"
        placement="bottom-start"
      >
        <transition
          name="n-fade-in-scale-up-transition"
          :appear="isMounted"
          @leave="handleMenuLeave"
        >
          <n-base-select-menu
            v-if="mergedShow"
            ref="menuRef"
            v-clickoutside="handleMenuClickOutside"
            class="n-select-menu"
            auto-pending
            :theme="mergedTheme"
            :pattern="pattern"
            :tree-mate="treeMate"
            :multiple="multiple"
            size="medium"
            :filterable="filterable"
            :value="value"
            @menu-toggle-option="handleToggleOption"
            @scroll="handleMenuScroll"
          >
            <template v-if="$slots.empty" #empty>
              <slot name="empty" />
            </template>
            <template v-if="$slots.unmatch" #unmatch>
              <slot name="unmatch" />
            </template>
            <template v-if="$slots.action" #action>
              <slot name="action" />
            </template>
          </n-base-select-menu>
        </transition>
      </v-follower>
    </v-binder>
  </div>
</template>

<script>
import { ref, computed, toRef } from 'vue'
import { createTreeMate } from 'treemate'
import { VBinder, VFollower, VTarget } from 'vueuc'
import {
  useIsMounted,
  useMergedState,
  useCompitable
} from 'vooks'
import {
  clickoutside
} from 'vdirs'
import {
  configurable,
  themeable,
  asFormItem,
  locale,
  withCssr
} from '../../_mixins'
import {
  warn, call, useAdjustedTo
} from '../../_utils'
import {
  NBaseSelectMenu,
  NBaseSelection
} from '../../_base'
import styles from './styles/index.js'

function patternMatched (pattern, value) {
  try {
    return 1 + value.toString().toLowerCase().indexOf(pattern.trim().toLowerCase())
  } catch (err) {
    return false
  }
}

function filterOptions (originalOpts, filter, pattern) {
  if (!filter) return originalOpts
  function traverse (options) {
    if (!Array.isArray(options)) return []
    const filteredOptions = []
    for (const option of options) {
      if (option.type === 'group') {
        const children = traverse(option.children)
        if (children.length) {
          filteredOptions.push(Object.assign({}, option, {
            children
          }))
        }
      } else if (filter(pattern, option)) {
        filteredOptions.push(option)
      }
    }
    return filteredOptions
  }
  return traverse(originalOpts)
}

function createValOptMap (options) {
  const valOptMap = new Map()
  options.forEach(option => {
    if (option.type === 'group') {
      option.children.forEach(groupOption => {
        valOptMap.set(groupOption.value, groupOption)
      })
    } else {
      valOptMap.set(option.value, option)
    }
  })
  return valOptMap
}

export default {
  name: 'Select',
  components: {
    NBaseSelectMenu,
    NBaseSelection,
    VBinder,
    VFollower,
    VTarget
  },
  directives: {
    clickoutside
  },
  mixins: [
    configurable,
    themeable,
    locale('Select'),
    asFormItem(),
    withCssr(styles)
  ],
  provide () {
    return {
      NSelect: this
    }
  },
  props: {
    bordered: {
      type: Boolean,
      default: undefined
    },
    clearable: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    placeholder: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function,
      default: (pattern, option) => {
        if (!option) return false
        if (option.label !== undefined) {
          return patternMatched(pattern, option.label)
        } else if (option.value !== undefined) {
          return patternMatched(pattern, option.value)
        }
        return false
      }
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    widthMode: {
      type: String,
      default: 'trigger'
    },
    tag: {
      type: Boolean,
      default: false
    },
    onCreate: {
      type: Function,
      default: label => ({
        label: label,
        value: label
      })
    },
    fallbackOption: {
      type: [Function, Boolean],
      default: () => value => ({
        label: '' + value,
        value
      })
    },
    show: {
      type: Boolean,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    onBlur: {
      type: [Function, Array],
      default: undefined
    },
    onFocus: {
      type: [Function, Array],
      default: undefined
    },
    onScroll: {
      type: [Function, Array],
      default: undefined
    },
    onSearch: {
      type: [Function, Array],
      default: undefined
    },
    /** deprecated */
    onChange: {
      validator () {
        if (__DEV__) warn('select', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    },
    items: {
      validator () {
        if (__DEV__) warn('select', '`items` is deprecated, please use `options` instead.')
        return true
      },
      default: undefined
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const patternRef = ref('')
    const filteredOptionsRef = computed(() => filterOptions(
      props.options,
      props.filter,
      patternRef.value
    ))
    const treeMateRef = computed(() => createTreeMate(filteredOptionsRef.value, {
      getKey (node) {
        if (node.type === 'group') return node.name
        return node.value
      }
    }))
    const valOptMapRef = computed(() => createValOptMap(props.options))
    const uncontrolledShowRef = ref(false)
    const mergedShowRef = useMergedState(
      toRef(props, 'show'),
      uncontrolledShowRef
    )
    const followerRef = ref(null)
    return {
      treeMate: treeMateRef,
      flattenedNodes: computed(() => {
        return treeMateRef.value.flattenedNodes
      }),
      valOptMap: valOptMapRef,
      isMounted: useIsMounted(),
      offsetContainerRef: ref(null),
      triggerRef: ref(null),
      trackingRef: ref(null),
      menuRef: ref(null),
      pattern: patternRef,
      uncontrolledShow: uncontrolledShowRef,
      mergedShow: mergedShowRef,
      compitableOptions: useCompitable(props, [
        'items',
        'options'
      ]),
      adjustedTo: useAdjustedTo(props),
      createdOptions: ref([]),
      beingCreatedOptions: ref([]),
      memoValOptMap: ref(new Map()),
      followerRef
    }
  },
  computed: {
    localizedPlaceholder () {
      return this.placeholder ?? this.localeNs.placeholder
    },
    localOptions () {
      return this.compitableOptions
        .concat(this.createdOptions)
        .concat(this.beingCreatedOptions)
    },
    filteredOptions () {
      if (this.remote) {
        return this.compitableOptions
      } else {
        const { localOptions, pattern } = this
        if (!pattern.length || !this.filterable) {
          return localOptions
        } else {
          const { filter } = this
          const mergedFilter = option => filter(pattern, option)
          return filterOptions(localOptions, mergedFilter)
        }
      }
    },
    selectedOptions () {
      if (this.multiple) {
        const { value: values } = this
        if (!Array.isArray(values)) return []
        const remote = this.remote
        const {
          valOptMap,
          memoValOptMap,
          wrappedFallbackOption
        } = this
        const options = []
        values.forEach(value => {
          if (valOptMap.has(value)) {
            options.push(valOptMap.get(value))
          } else if (remote && memoValOptMap.has(value)) {
            options.push(memoValOptMap.get(value))
          } else if (wrappedFallbackOption) {
            const option = wrappedFallbackOption(value)
            if (option) {
              options.push(option)
            }
          }
        })
        return options
      }
      return null
    },
    selectedOption () {
      if (!this.multiple) {
        const { value, valOptMap, wrappedFallbackOption } = this
        if (value === null) return null
        let selectedOption = null
        if (valOptMap.has(value)) {
          selectedOption = valOptMap.get(value)
        } else if (this.remote) {
          selectedOption = this.memoValOptMap.get(value)
        }
        return (
          selectedOption ||
          (wrappedFallbackOption && wrappedFallbackOption(value)) ||
          null
        )
      }
      return null
    },
    wrappedFallbackOption () {
      const { fallbackOption } = this
      if (!fallbackOption) return false
      return value => {
        if (['string', 'number'].includes(typeof value)) {
          return Object.assign(fallbackOption(value), { value })
        } return null
      }
    }
  },
  watch: {
    options () {
      this.updateMemorizedOptions()
    },
    filteredOptions () {
      if (!this.mergedShow) return
      this.$nextTick(this.syncPosition)
    },
    value () {
      if (!this.mergedShow) return
      this.$nextTick(this.syncPosition)
    }
  },
  created () {
    this.updateMemorizedOptions()
  },
  methods: {
    doUpdateValue (value) {
      const {
        onChange,
        'onUpdate:value': onUpdateValue,
        nTriggerFormChange,
        nTriggerFormInput
      } = this
      if (onChange) call(onChange, value)
      if (onUpdateValue) call(onUpdateValue, value)
      nTriggerFormChange()
      nTriggerFormInput()
    },
    doBlur (value) {
      const {
        onBlur,
        nTriggerFormBlur
      } = this
      if (onBlur) call(onBlur, value)
      nTriggerFormBlur()
    },
    doFocus (value) {
      const {
        onFocus,
        nTriggerFormFocus
      } = this
      if (onFocus) call(onFocus, value)
      nTriggerFormFocus()
    },
    doSearch (value) {
      const {
        onSearch
      } = this
      if (onSearch) call(onSearch, value)
    },
    doScroll (...args) {
      const {
        onScroll
      } = this
      if (onScroll) call(onScroll, ...args)
    },
    /**
     * remote related methods
     */
    updateMemorizedOptions () {
      const {
        remote,
        multiple
      } = this
      if (remote) {
        const { memoValOptMap } = this
        if (multiple) {
          this.selectedOptions.forEach(option => {
            memoValOptMap.set(option.value, option)
          })
        } else {
          const option = this.selectedOption
          if (option) {
            memoValOptMap.set(option.value, option)
          }
        }
      }
    },
    /**
     * menu related methods
     */
    openMenu () {
      if (!this.disabled) {
        this.pattern = ''
        this.uncontrolledShow = true
        if (this.filterable) {
          this.triggerRef.focusPatternInput()
        }
      }
    },
    closeMenu () {
      this.uncontrolledShow = false
    },
    handleMenuLeave () {
      this.pattern = ''
    },
    handleTriggerClick () {
      if (this.disabled) return
      if (!this.mergedShow) {
        this.openMenu()
      } else {
        if (!this.filterable) {
          this.closeMenu()
        }
      }
    },
    handleTriggerBlur () {
      this.doBlur()
      this.closeMenu()
    },
    handleTriggerFocus () {
      this.doFocus()
    },
    handleMenuClickOutside (e) {
      if (this.mergedShow) {
        if (!this.triggerRef.$el.contains(e.target)) {
          this.closeMenu()
        }
      }
    },
    createClearedMultipleSelectValue (value) {
      if (!Array.isArray(value)) return []
      if (this.wrappedFallbackOption) {
        // if option has a fallback, I can't help user to clear some unknown value
        return Array.from(value)
      } else {
        // if there's no option fallback, unappeared options are treated as invalid
        const {
          remote,
          valOptMap
        } = this
        if (remote) {
          const { memoValOptMap } = this
          return value.filter(v => valOptMap.has(v) || memoValOptMap.has(v))
        } else {
          return value.filter(v => valOptMap.has(v))
        }
      }
    },
    handleToggleOption (option) {
      if (this.disabled) return
      const { tag, remote } = this
      if (tag && !remote) {
        const { beingCreatedOptions } = this
        const beingCreatedOption = beingCreatedOptions[0] || null
        if (beingCreatedOption) {
          this.createdOptions.push(beingCreatedOption)
          this.beingCreatedOptions = []
        }
      }
      if (remote) {
        this.memoValOptMap.set(option.value, option)
      }
      if (this.multiple) {
        const changedValue = this.createClearedMultipleSelectValue(this.value)
        const index = changedValue.findIndex(value => value === option.value)
        if (~index) {
          changedValue.splice(index, 1)
          if (tag && !remote) {
            const createdOptionIndex = this.getCreatedOptionIndex(option.value)
            if (~createdOptionIndex) {
              this.createdOptions.splice(createdOptionIndex, 1)
              this.pattern = ''
            }
          }
        } else {
          changedValue.push(option.value)
          this.pattern = ''
        }
        this.doUpdateValue(changedValue)
      } else {
        if (tag && !remote) {
          const createdOptionIndex = this.getCreatedOptionIndex(option.value)
          if (~createdOptionIndex) {
            this.createdOptions = [this.createdOptions[createdOptionIndex]]
          } else {
            this.createdOptions = []
          }
        }
        if (this.filterable && !this.multiple) {
          this.returnFocusToWrapper()
        }
        this.closeMenu()
        this.doUpdateValue(option.value)
      }
    },
    handleDeleteLastOption (e) {
      if (!this.pattern.length) {
        const changedValue = this.createClearedMultipleSelectValue(this.value)
        if (Array.isArray(changedValue)) {
          const poppedValue = changedValue.pop()
          const createdOptionIndex = this.getCreatedOptionIndex(poppedValue)
          ~createdOptionIndex && this.createdOptions.splice(createdOptionIndex, 1)
          this.doUpdateValue(changedValue)
        }
      }
    },
    getCreatedOptionIndex (optionValue) {
      const createdOptions = this.createdOptions
      return createdOptions.findIndex(
        createdOption => createdOption.value === optionValue
      )
    },
    handlePatternInput (e) {
      const value = e.target.value
      this.pattern = value
      const { onSearch, tag, remote } = this
      if (onSearch) {
        onSearch(value)
        this.doSearch(value)
      }
      if (tag && !remote) {
        if (!value) {
          this.beingCreatedOptions = []
          return
        }
        const optionBeingCreated = this.onCreate(value)
        if (
          this.compitableOptions.some(
            option => option.value === optionBeingCreated.value
          ) ||
          this.createdOptions.some(
            option => option.value === optionBeingCreated.value
          )
        ) {
          this.beingCreatedOptions = []
        } else {
          this.beingCreatedOptions = [optionBeingCreated]
        }
      }
    },
    handleClear (e) {
      e.stopPropagation()
      const { multiple, doUpdateValue } = this
      if (!multiple && this.filterable) {
        this.closeMenu()
      }
      if (multiple) {
        doUpdateValue([])
      } else {
        doUpdateValue(null)
      }
    },
    // scroll events on menu
    handleMenuScroll (e, scrollContainer, scrollContent) {
      this.doScroll(e, scrollContainer, scrollContent)
    },
    // keyboard events
    handleKeyUpEnter (e) {
      if (this.mergedShow) {
        const menu = this.menuRef
        const pendingOptionData = menu && menu.getPendingOption()
        if (pendingOptionData) {
          this.handleToggleOption(pendingOptionData)
        } else {
          this.closeMenu()
          this.returnFocusToWrapper()
        }
      } else {
        this.openMenu()
      }
      e.preventDefault()
    },
    handleKeyUpSpace (e) {
      if (!this.filterable) {
        this.handleKeyUpEnter(e)
      }
    },
    handleKeyUpUp () {
      if (this.loading) return
      if (this.mergedShow) {
        this.menuRef.prev()
      }
    },
    handleKeyUpDown () {
      if (this.loading) return
      if (this.mergedShow) {
        this.menuRef.next()
      }
    },
    handleKeyDownSpace (e) {
      if (!this.filterable) {
        e.preventDefault()
      }
    },
    handleKeyUpEsc (e) {
      this.closeMenu()
      this.triggerRef.focusPatternInputWrapper()
    },
    returnFocusToWrapper () {
      this.triggerRef.focusPatternInputWrapper()
    },
    syncPosition () {
      this.followerRef.syncPosition()
    }
  }
}
</script>
