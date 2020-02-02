<template>
  <div class="n-positioning-container">
    <div ref="content" class="n-positioning-content">
      <transition name="n-cascader-menu--transition">
        <n-base-select-menu
          v-if="active"
          ref="contentInner"
          class="n-cascader-menu"
          :theme="theme"
          filterable
          :pattern="pattern"
          :options="filteredSelectOptions"
          :multiple="multiple"
          :size="size"
          :is-option-selected="isSelected"
          @mousedown.native.prevent="() => {}"
          @menu-toggle-option="handleSelectMenuToggleOption"
          @menu-visible="handleMenuVisible"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import NBaseSelectMenu from '../../../base/SelectMenu'
import { traverseWithCallback, getPickerElement } from './utils'
import placeable from '../../../mixins/placeable'
import zindexable from '../../../mixins/zindexable'

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
  mixins: [ placeable, zindexable ],
  props: {
    type: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    widthMode: {
      type: String,
      default: 'activator'
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
    }
  },
  data () {
    return {
      /** for zindexable, shouldn't be changed */
      detached: true
    }
  },
  computed: {
    selectOptions () {
      const selectOptions = []
      const type = this.type
      traverseWithCallback(this.options, option => {
        if (
          ((type === 'multiple' || type === 'single') && option.isLeaf) ||
          (type !== 'multiple' && type !== 'single')
        ) {
          if (option.isRoot) return
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
    },
    valueSet () {
      return new Set(this.value)
    }
  },
  watch: {
    value () {
      this.$nextTick().then(() => {
        // console.log('menu model')
        this.updatePosition()
      })
    },
    pattern () {
      this.$nextTick().then(() => {
        // console.log('menu model')
        this.updatePosition()
      })
    }
  },
  methods: {
    getZindexableContent () {
      return this.$el
    },
    getTrackedElement () {
      return getPickerElement(this)
    },
    /**
     * filterable related attributes
     */
    isSelected (option) {
      if (this.multiple) {
        return this.valueSet.has(option.value)
      } else {
        return this.value === option.value
      }
    },
    handleSelectMenuToggleOption (option) {
      // console.log('handleSelectMenuToggleOption', option)
      this.handleSelectOptionCheck(option)
    },
    handleSelectOptionCheck (option) {
      if (option.disabled) return
      if (this.type === 'multiple' || this.type === 'multiple-all-options') {
        if (Array.isArray(this.value)) {
          const index = this.value.findIndex(v => v === option.value)
          if (~index) {
            const newValue = this.value
            newValue.splice(index, 1)
            this.$emit('input', newValue)
          } else {
            const newValue = this.value
            newValue.push(option.value)
            this.$emit('input', newValue)
          }
        } else {
          this.$emit('input', [option.value])
        }
      } else {
        this.$emit('input', option.value)
      }
    },
    prev () {
      this.$refs.contentInner && this.$refs.contentInner.prev()
    },
    next () {
      this.$refs.contentInner && this.$refs.contentInner.next()
    },
    enter () {
      if (this.$refs.contentInner) {
        const pendingOptionData = this.$refs.contentInner.getPendingOptionData()
        this.handleSelectOptionCheck(pendingOptionData)
      }
    },
    handleMenuVisible () {
      this.updatePosition()
    }
  }
}
</script>
