<template>
  <div
    class="n-cascader-menu n-cascader-menu--multiple n-cascader-menu--default-size"
  >
    <n-cascader-submenu
      v-for="(submenuOptions, index) in menuModel"
      :key="index"
      :options="submenuOptions"
      :data-depth="index"
      @option-click="handleOptionClick"
      @option-mouseenter="handleOptionMouseEnter"
      @option-mouseleave="handleOptionMouseLeave"
      @menu-keyup-enter="handleMenuKeyUpEnter"
      @menu-keyup-up="handleMenuKeyUpUp"
      @menu-keyup-down="handleMenuKeyUpDown"
      @menu-keyup-left="handleMenuKeyUpLeft"
      @menu-keyup-right="handleMenuKeyUpRight"
      @menu-keyup-space="handleMenuKeyUpSpace"
      @option-check="handleOptionCheck"
    />
  </div>
</template>
<script>
import NCascaderSubmenu from './CascaderSubmenu'
import { type } from './utils'

function minus (arrA, arrB) {
  const set = new Set(arrA)
  arrB.forEach(v => {
    if (set.has(v)) {
      set.delete(v)
    }
  })
  return Array.from(set)
}

function merge (arrA, arrB) {
  const mergedSet = new Set(arrA)
  arrB.forEach(v => mergedSet.add(v))
  return Array.from(mergedSet)
}

export default {
  name: 'NCascaderMenu',
  components: {
    NCascaderSubmenu
  },
  props: {
    value: {
      validator: () => true,
      default: null
    },
    activeValue: {
      validator: () => true,
      default: null
    },
    activeId: {
      validator: () => true,
      default: null
    },
    tracedOption: {
      type: Object,
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    enableAllOptions: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeOptionPath () {
      return this.optionPath(this.activeId)
    },
    type: type,
    menuModel () {
      const activeOptionPath = this.activeOptionPath
      const activeIds = new Set(activeOptionPath.map(option => option.id))
      const model = [this.options.map(option => {
        return {
          ...option,
          traced: this.tracedOption && this.tracedOption.id === option.id,
          active: activeIds.has(option.id),
          type: this.type
        }
      })]
      for (const option of activeOptionPath) {
        if (Array.isArray(option.children) && option.children.length) {
          model.push(option.children.map(option => {
            return {
              ...option,
              traced: this.tracedOption && this.tracedOption.id === option.id,
              active: activeIds.has(option.id),
              type: this.type
            }
          }))
        }
      }
      return model
    }
  },
  watch: {
    options () {
      this.$emit('menu-options-change')
    }
  },
  created () {
    // console.log('enableAllOptions', this.enableAllOptions)
  },
  mounted () {
    // console.log(this.menuModel)
  },
  methods: {
    optionPath (optionId) {
      const path = []
      let done = false
      function traverseOptions (options) {
        if (!Array.isArray(options) || !options.length) return
        for (const option of options) {
          if (done) return
          path.push(option)
          if (option.id === optionId) {
            done = true
            return
          }
          if (option.children) {
            traverseOptions(option.children)
          }
          if (done) return
          path.pop(option)
        }
      }
      traverseOptions(this.options)
      return path
    },
    handleOptionMouseEnter (e, option) {
      this.$emit('option-mouse-enter', e, option)
    },
    handleOptionMouseLeave (e, option) {
    },
    handleOptionClick (e, option, menu) {
      this.$emit('option-click', e, option, menu)
    },
    handleMenuKeyUpEnter (submenu) {
      this.$emit('menu-keyup-enter', submenu)
    },
    handleMenuKeyUpSpace (submenu) {
      this.$emit('menu-keyup-space', submenu)
    },
    handleMenuKeyUpUp (submenu) {
      this.$emit('menu-keyup-up', submenu)
    },
    handleMenuKeyUpDown (submenu) {
      this.$emit('menu-keyup-down', submenu)
    },
    handleMenuKeyUpLeft () {
      this.$emit('menu-keyup-left')
    },
    handleMenuKeyUpRight () {
      this.$emit('menu-keyup-right')
    },
    handleOptionCheck (option, checked, indeterminate) {
      if (this.type === 'multiple') {
        const newValues = []
        const traverseMultiple = option => {
          if (!option || option.disabled) return
          if (Array.isArray(option.children)) {
            for (const child of option.children) {
              traverseMultiple(child)
            }
          }
          if (!option.children) {
            newValues.push(option.value)
          }
        }
        traverseMultiple(option)
        if (Array.isArray(this.value)) {
          if (!option.checked && !option.indeterminate) {
            this.$emit('input', merge(this.value, newValues))
          } else {
            this.$emit('input', minus(this.value, newValues))
          }
        } else {
          this.$emit('input', newValues)
        }
      } else if (this.type === 'multiple-all-options') {
        if (Array.isArray(this.value)) {
          if (!option.checked) {
            this.$emit('input', merge(this.value, [option.value]))
          } else {
            this.$emit('input', minus(this.value, [option.value]))
          }
        } else {
          this.$emit('input', [option.value])
        }
      } else if (this.type === 'single-all-options') {
        this.$emit('input', option.value)
      } else if (this.type === 'single') {
        this.$emit('input', option.value)
      }
    }
  }
}
</script>
