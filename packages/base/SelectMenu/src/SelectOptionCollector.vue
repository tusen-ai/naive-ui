<script>
import {
  getDefaultSlotOf,
  getComponentNameOf,
  getOptionPropsDataOf
} from '../../../utils/component'

import {
  VALID_COMPONENT
} from './config'

export default {
  name: 'NBaseSelectOptionCollector',
  provide () {
    return {
      NBaseSelectOptionCollector: this
    }
  },
  inject: {
    NSelect: {
      default: null
    },
    NAutoComplete: {
      default: null
    },
    NDropdownMenu: {
      default: null
    }
  },
  data () {
    return {
      options: [],
      isDestroying: false,
      isMounting: true
    }
  },
  computed: {
    injection () {
      if (this.NSelect) return this.NSelect
      if (this.NAutoComplete) return this.NAutoComplete
      if (this.NDropdownMenu) return this.NDropdownMenu
      return null
    }
  },
  watch: {
    options (value) {
      if (this.injection) {
        this.injection.collectedOptions = value
      }
    }
  },
  mounted () {
    this.isMounting = false
    this.collectOptions()
  },
  beforeDestroy () {
    this.isDestroying = true
  },
  methods: {
    collectOptions (force = false) {
      if (!force && (this.isDestroying || this.isMounting)) return
      this.options = []
      const children = getDefaultSlotOf(this)
      children.forEach((child, index) => {
        child.key = index
        if (child.componentOptions) {
          if (VALID_COMPONENT.includes(getComponentNameOf(child))) {
            const propsData = getOptionPropsDataOf(child)
            this.options.push(propsData)
          }
        }
      })
    }
  },
  render (h) {
    const children = getDefaultSlotOf(this)
    return h('div', {
      staticClass: 'n-base-selector-option-collector',
      style: {
        display: 'none'
      }
    }, children)
  }
}
</script>
