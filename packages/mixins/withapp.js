export default {
  inject: {
    NApp: {
      default: null
    }
  },
  computed: {
    namespace () {
      return (this.NApp && this.NApp.namespace) || null
    }
  }
}
