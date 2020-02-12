export default function (Vue) {
  if (!Vue.options.components.PropsUnsafeTransition) {
    const PropsUnsafeTransition = { ...(Vue.options.components.Transition) }
    PropsUnsafeTransition.name = 'PropsUnsafeTransition'
    PropsUnsafeTransition.props = {
      name: {
        validator: () => true
      },
      appear: {
        validator: () => true
      }
    }
    Vue.component(PropsUnsafeTransition.name, PropsUnsafeTransition)
  }
}
