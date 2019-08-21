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
      @menu-keyup-up="handleMenuKeyUpUp"
      @menu-keyup-down="handleMenuKeyUpDown"
      @menu-keyup-left="handleMenuKeyUpLeft"
      @menu-keyup-right="handleMenuKeyUpRight"
    />
  </div>
</template>
<script>
import NCascaderSubmenu from './CascaderSubmenu'

export default {
  name: 'CasPanel',
  components: {
    NCascaderSubmenu
  },
  props: {
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
    }
  },
  computed: {
    activeOptionPath () {
      const path = []
      const activeId = this.activeId
      let done = false
      function traverseOptions (options) {
        if (!Array.isArray(options) || !options.length) return
        for (const option of options) {
          if (done) return
          path.push(option)
          if (option.id === activeId) {
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
    menuModel () {
      const activeOptionPath = this.activeOptionPath
      const activeIds = new Set(activeOptionPath.map(option => option.id))
      const model = [this.options.map(option => {
        return {
          ...option,
          traced: this.tracedOption && this.tracedOption.id === option.id,
          active: activeIds.has(option.id)
        }
      })]
      for (const option of activeOptionPath) {
        if (Array.isArray(option.children) && option.children.length) {
          model.push(option.children.map(option => {
            return {
              ...option,
              traced: this.tracedOption && this.tracedOption.id === option.id,
              active: activeIds.has(option.id)
            }
          }))
        }
      }
      return model
    }
  },
  mounted () {
    console.log(this.menuModel)
  },
  methods: {
    handleOptionMouseEnter (e, option) {
      this.$emit('option-mouse-enter', e, option)
    },
    handleOptionMouseLeave (e, option) {
    },
    handleOptionClick (e, option, menu) {
      this.$emit('option-click', e, option, menu)
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
    }
  }
}
</script>
