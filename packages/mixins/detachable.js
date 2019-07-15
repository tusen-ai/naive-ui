export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      detachTarget: document.body
    }
  },
  model: {
    prop: 'isActive',
    event: 'toggle'
  },
  methods: {
    deactivate () {
      this.$emit('toggle', false)
    },
    activate () {
      this.$emit('toggle', true)
    },
    detachContent () {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
      this.detachTarget.append(this.$refs.content)
    }
  },
  beforeMount () {
    if (!this.detachTarget) {
      console.warn(this.$options.name, ' will be mounted to', this.detachTarget, ', but it doesn\'t exist! Modal component won\'t work!')
    }
  },
  mounted () {
    this.detachTarget = document.body // getScrollParent(this.$refs.self)
    this.detachContent()
  },
  beforeDestroy () {
    this.detachTarget.removeChild(this.$refs.content)
  }
}
