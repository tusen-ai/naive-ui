<script>
function mapSlot (vNodes, value, on) {
  function transfromCheckbox (vNode) {
    if (!Array.isArray(value)) {
      vNode.componentOptions.propsData.value = false
    } else {
      vNode.componentOptions.propsData.value = !!~value.findIndex(label => label === vNode.componentOptions.propsData.label)
    }
    vNode.componentOptions.listeners = {
      ...vNode.componentOptions.listeners,
      ...on
    }
    return vNode
  }
  return vNodes.map(transfromCheckbox)
}

export default {
  name: 'NCheckboxGroup',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Array
    }
  },
  data () {
    return {
      labels: []
    }
  },
  methods: {
    handleChange (status, label) {
      if (Array.isArray(this.value)) {
        let newValue = this.value
        newValue = newValue.filter(value => this.labels.has(value))
        const index = newValue.findIndex(value => value === label)
        if (status === true) {
          if (!~index) {
            newValue.push(label)
            this.$emit('input', newValue)
          }
        } else {
          if (~index) {
            newValue.splice(index, 1)
            this.$emit('input', newValue)
          }
        }
      } else {
        if (status === true) {
          this.$emit('input', [label])
        } else {
          this.$emit('input', [])
        }
      }
    }
  },
  render (h) {
    this.labels = new Set(this.$slots.default.map(vNode => vNode.componentOptions.propsData.label))
    return h('div', {
      staticClass: 'n-checkbox-group'
    }, mapSlot(this.$slots.default, this.value, {
      change: this.handleChange
    }))
  }
}
</script>
