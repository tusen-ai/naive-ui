import { getPortalTarget } from '../../../_utils/component/portal'

function cleanUp (content, target) {
  if (content && target && target.contains(content)) {
    target.removeChild(content)
  }
}

export default {
  name: 'NBasePortal',
  props: {
    onMounted: {
      type: Function,
      default: null
    },
    transferTarget: {
      type: Function,
      default: function () {
        return getPortalTarget(this)
      }
    }
  },
  mounted () {
    if (this.onMounted) this.onMounted()
    if (this.$el.parentElement && !this.elementTransferred) {
      this.$el.parentElement.removeChild(this.$el)
    }
  },
  beforeDestroy () {
    const target = this.transferTarget()
    const content = this.$el
    /**
     * Since content may be detached in modal, waiting animation done is
     * important. A more elegant solution is needed.
     */
    if (getPortalTarget(this, true)) {
      setTimeout(() => {
        cleanUp(content, target)
      }, 300)
    } else {
      cleanUp(content, target)
    }
  },
  data () {
    return {
      elementTransferred: false
    }
  },
  methods: {
    transferElement () {
      if (!this.elementTransferred) {
        this.transferTarget().appendChild(this.$el)
        this.elementTransferred = true
      }
    }
  },
  render () {
    const defaultSlot = this.$slots.default ? this.$slots.default() : []
    const childrenCount = defaultSlot && defaultSlot.length
    if (defaultSlot && childrenCount) {
      if (childrenCount !== 1) {
        console.error(
          '[naive-ui/n-base-portal]: `n-base-portal` only takes single child node. If multiple child nodes are set, only the first one will be rendered.'
        )
      }
      return defaultSlot[0]
    } else {
      console.error(
        '[naive-ui/n-base-portal]: `n-base-portal` has no child node.'
      )
      return null
    }
  }
}
