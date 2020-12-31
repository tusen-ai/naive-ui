import { inject, computed } from 'vue'

export default function useConfig (props) {
  const NConfigProvider = inject('NConfigProvider', null)
  return {
    NConfigProvider,
    mergedBordered: computed(() => {
      const { bordered } = props
      if (bordered !== undefined) return bordered
      return NConfigProvider?.mergedBordered || true
    }),
    namespace: computed(() => NConfigProvider?.namespace)
  }
}
