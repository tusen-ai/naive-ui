<script>
import {
  getDefaultSlotOf,
  getOptionPropsDataOf,
  isSelectOptionLikeComponent
} from '../../../utils/component'

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
      isMounting: true,
      isUpdatingOptions: false
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
  updated () {
    if (!this.isUpdatingOptions) {
      this.isUpdatingOptions = true
      this.collectOptions()
    } else {
      this.isUpdatingOptions = false
    }
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
        /**
         * If component name is valid,
         * there must be data
         */
        if (isSelectOptionLikeComponent(child)) {
          const propsData = getOptionPropsDataOf(child)
          this.options.push({ ...propsData, children: child.children })
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
