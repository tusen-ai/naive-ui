<script>
function mapSlot (slot, activeNames, isAccordion, handleInput, self) {
  const names = []
  for (const vNode of slot) {
    if (vNode.componentOptions && (vNode.componentOptions.tag === 'NCollapseItem' || vNode.componentOptions.tag === 'n-collapse-item')) {
      const name = vNode.componentOptions.propsData.name
      names.push(name)
      vNode.componentOptions.listeners = {
        ...vNode.componentOptions.listeners,
        input: handleInput
      }
      if (isAccordion) {
        console.log(name, activeNames)
        if (name === activeNames) {
          vNode.componentOptions.propsData.value = true
        }
      } else {
        if (Array.isArray(activeNames) && activeNames.includes(name)) {
          vNode.componentOptions.propsData.value = true
        }
      }
    }
  }
  self.memorizedNames = names
  return slot
}

export default {
  name: 'NCollapse',
  props: {
    value: {
      type: [Array, String],
      default: null
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      memorizedNames: null
    }
  },
  methods: {
    handleInput (value, name) {
      if (this.accordion) {
        if (value) {
          this.$emit('input', name)
        } else {
          this.$emit('input', null)
        }
      } else {
        if (!Array.isArray(this.value)) {
          this.$emit('input', [name])
        } else {
          const activeNames = Array.from(new Set(this.value.filter(v => this.memorizedNames.includes(v))))
          const index = activeNames.findIndex(activeName => name === activeName)
          if (~index) {
            activeNames.splice(index, 1)
            this.$emit('input', activeNames)
          } else {
            activeNames.push(name)
            this.$emit('input', activeNames)
          }
        }
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-collapse'
    }, mapSlot(this.$slots.default, this.value, this.accordion, this.handleInput, this))
  }
}
</script>
