<template>
  <div
    ref="offsetContainerRef"
    v-zindexable="{ enabled: active }"
    class="n-positioning-container"
  >
    <div ref="trackingRef" class="n-positioning-content">
      <transition
        name="n-fade-in-scale-up-transition"
        :appear="NCascader.isMounted"
      >
        <n-base-select-menu
          v-if="active"
          ref="menuRef"
          v-clickoutside="handleClickOutside"
          class="n-cascader-menu"
          :theme="theme"
          :pattern="pattern"
          :options="filteredSelectOptions"
          :multiple="multiple"
          :size="size"
          :value="value"
          @menu-toggle-option="handleSelectMenuToggleOption"
          @menu-visible="handleMenuVisible"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import NBaseSelectMenu from '../../_base/select-menu'
import { traverseWithCallback, getPickerElement } from './utils'
import {
  placeable
} from '../../_mixins'
import {
  zindexable,
  clickoutside
} from '../../_directives'

export default {
  name: 'NCascaderSelectMenu',
  components: {
    NBaseSelectMenu
  },
  inject: {
    NCascader: {
      default: null
    }
  },
  directives: {
    zindexable,
    clickoutside
  },
  mixins: [
    placeable
  ],
  props: {
    type: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    placement: {
      ...placeable.props.placement,
      default: 'bottom-start'
    },
    // eslint-disable-next-line vue/require-prop-types
    widthMode: {
      ...placeable.props.widthMode,
      default: 'trigger'
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: null
    },
    pattern: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Function,
      default: (pattern, _, path) => path.some(option => option.label && ~(option.label.indexOf(pattern)))
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      required: true
    }
  },
  setup () {
    return {
      offsetContainerRef: ref(null),
      trackingRef: ref(null),
      menuRef: ref(null)
    }
  },
  computed: {
    __placeableEnabled () {
      return this.active
    },
    selectOptions () {
      const selectOptions = []
      const type = this.type
      traverseWithCallback(this.options, option => {
        if (
          ((type === 'multiple' || type === 'single') && option.isLeaf) ||
          (type !== 'multiple' && type !== 'single')
        ) {
          if (option.isRoot) return
          if (option.disabled) return
          selectOptions.push({
            label: option.path.map(optionInPath => optionInPath.label).join('/'),
            value: option.value,
            path: option.path
          })
        }
      })
      return selectOptions || []
    },
    filteredSelectOptions () {
      return this.selectOptions.filter(option => {
        return this.filter(this.pattern, { label: option.label, value: option.value }, option.path)
      }).map(option => ({
        value: option.value,
        label: option.label
      }))
    }
  },
  watch: {
    value () {
      this.$nextTick(() => {
        this.__placeableSyncPosition()
      })
    },
    pattern () {
      this.$nextTick(() => {
        this.__placeableSyncPosition()
      })
    }
  },
  methods: {
    __placeableOffsetContainer () {
      return this.offsetContainerRef
    },
    __placeableTracking () {
      return this.trackingRef
    },
    __placeableTracked () {
      return getPickerElement(this)
    },
    __placeableBody () {
      return this.menuRef
    },
    handleSelectMenuToggleOption (option) {
      this.handleSelectOptionCheck(option)
    },
    handleSelectOptionCheck (option) {
      if (option.disabled) return
      const {
        'onUpdate:value': onUpdateValue
      } = this
      if (this.type === 'multiple' || this.type === 'multiple-all-options') {
        if (Array.isArray(this.value)) {
          const index = this.value.findIndex(v => v === option.value)
          if (~index) {
            const newValue = this.value
            newValue.splice(index, 1)
            onUpdateValue(newValue)
          } else {
            const newValue = this.value
            newValue.push(option.value)
            onUpdateValue(newValue)
          }
        } else {
          onUpdateValue([option.value])
        }
      } else {
        onUpdateValue(option.value)
      }
    },
    prev () {
      const { menuRef } = this
      menuRef && menuRef.prev()
    },
    next () {
      const { menuRef } = this
      menuRef && menuRef.next()
    },
    enter () {
      const { menuRef } = this
      if (menuRef) {
        const pendingOptionData = menuRef.getPendingOptionData()
        this.handleSelectOptionCheck(pendingOptionData)
      }
    },
    handleMenuVisible () {
      this.__placeableSyncPosition()
    },
    handleClickOutside (e) {
      this.NCascader.handleSelectMenuClickOutside(e)
    }
  }
}
</script>
