export default {
  inject: {
    NConfigProvider: {
      default: null
    }
  },
  computed: {
    mergedBordered () {
      return this.bordered ?? this.NConfigProvider?.mergedBordered ?? true
    },
    namespace () {
      return this.NConfigProvider?.namespace
    }
  }
}
