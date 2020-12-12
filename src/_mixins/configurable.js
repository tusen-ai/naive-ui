export default {
  inject: {
    NConfigProvider: {
      default: null
    }
  },
  computed: {
    mergedBordered () {
      const { bordered } = this
      if (bordered !== undefined) return bordered
      const {
        NConfigProvider: { bordered: inheritedBordered }
      } = this
      if (inheritedBordered !== undefined) return inheritedBordered
      return true
    },
    namespace () {
      return (this.NConfigProvider && this.NConfigProvider.namespace) || null
    }
  }
}
