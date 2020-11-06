export default {
  inject: {
    NConfigProvider: {
      default: null
    }
  },
  computed: {
    namespace () {
      return (this.NConfigProvider && this.NConfigProvider.namespace) || null
    }
  }
}
