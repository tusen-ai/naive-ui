<template>
  <n-popover
    ref="popover"
    class="n-popselect"
    trigger="click"
    :width="width"
    @hide="handlePopoverHide"
    @show="handlePopoverShow"
    @keydown.native="handleActivatorKeyDown"
    @keyup.up.native="handleActivatorKeyUpUp"
    @keyup.down.native="handleActivatorKeyUpDown"
    @keyup.enter.native="handleActivatorKeyUpEnter"
  >
    <template v-slot:activator>
      <div
        class="n-popselect__activator"
      >
        <slot name="activator" />
      </div>
    </template>
    <div
      ref="popselectContent"
      class="n-popselect-content"
      :class="{
        'n-popselect-content--multiple': multiple
      }"
      @mouseleave="handleContentMouseLeave"
    >
      <transition name="n-popselect-light-bar--transition">
        <div
          v-if="showLightBar"
          class="n-popselect-light-bar-container"
        >
          <div
            class="n-popselect-light-bar"
            :style="{ top: `${lightBarTop}px` }"
          />
        </div>
      </transition>
      <slot />
    </div>
  </n-popover>
</template>

<script>
import NPopover from '../../Popover'
import withlightbar from '../../../mixins/withlightbar'

function collectOptions (self, componentName) {
  const options = []
  const traverse = (component, componentName) => {
    component.$children.forEach(child => {
      let name = child.$options.name
      if (name === componentName) {
        options.push(child)
      } else {
        traverse(child, componentName)
      }
    })
  }
  traverse(self, componentName)
  return options
}

function getOption (options, currentIndex, direction) {
  if (currentIndex === null) {
    currentIndex = -1
  }
  for (let offset = 1; offset < options.length; ++offset) {
    let index = null
    if (direction === 'prev') {
      index = (currentIndex - offset + options.length) % options.length
    } else {
      index = (currentIndex + offset) % options.length
    }
    if (!options[index].disabled) {
      return {
        option: options[index],
        index
      }
    }
  }
  return {
    option: null,
    index: null
  }
}

export default {
  name: 'NPopselect',
  provide () {
    return {
      NPopselect: this
    }
  },
  components: {
    NPopover
  },
  mixins: [withlightbar],
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      validator () {
        return true
      },
      default: null
    },
    cancelable: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      active: false,
      options: [],
      pendingOption: null,
      pendingOptionIndex: null
    }
  },
  watch: {
    active (newActive) {
      const activator = this.$el
      if (newActive) {
        activator.setAttribute('tabindex', '0')
        activator.focus()
        this.$nextTick(function () {
          this.options = collectOptions(this, 'NPopselectOption')
        })
      } else {
        activator.removeAttribute('tabindex')
        this.pendingOption = null
        this.pendingOptionIndex = null
        this.hideLightBar()
      }
    }
  },
  mounted () {
    this.options = collectOptions(this, 'NPopselectOption')
  },
  updated () {
    this.$nextTick(function () {
      this.options = collectOptions(this, 'NPopselectOption')
    })
  },
  methods: {
    close () {
      this.$refs.popover.active = false
    },
    handleContentMouseLeave () {
      this.hideLightBar()
    },
    handlePopoverHide () {
      this.active = false
    },
    handlePopoverShow () {
      this.active = true
    },
    handleActivatorKeyUpUp () {
      const { option, index } = getOption(this.options, this.pendingOptionIndex, 'prev')
      this.pendingOption = option
      this.pendingOptionIndex = index
      this.updateLightBarPosition(option.$el)
    },
    handleActivatorKeyUpDown () {
      const { option, index } = getOption(this.options, this.pendingOptionIndex, 'next')
      this.pendingOption = option
      this.pendingOptionIndex = index
      this.updateLightBarPosition(option.$el)
    },
    handleActivatorKeyUpEnter () {
      if (this.pendingOption && this.pendingOption.$el) {
        this.pendingOption.$el.click()
      }
    },
    handleActivatorKeyDown (e) {
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault()
      }
    },
    toggle (value) {
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          const validValues = new Set(this.options.map(option => option.value))
          const newValue = this.value.filter((v) => validValues.has(v))
          const index = newValue.findIndex(v => v === value)
          if (~index) {
            newValue.splice(index, 1)
          } else {
            newValue.push(value)
          }
          this.$emit('input', newValue)
          this.$emit('change', newValue)
        } else {
          this.$emit('input', [value])
          this.$emit('change', [value])
        }
      } else {
        if (this.value === value && this.cancelable) {
          this.$emit('input', null)
          this.$emit('change', null)
        } else {
          this.$emit('input', value)
          this.$emit('change', value)
        }
        this.$refs.popover.deactivate()
      }
    }
  }
}
</script>
