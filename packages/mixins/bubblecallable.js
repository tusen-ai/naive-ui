export default {
  methods: {
    bubbleCall (componentName, functionName, ...params) {
      let parent = this.$parent || this.$root
      while (true) {
        if (parent) {
          const name = parent.$options.name
          if (Array.isArray(componentName)) {
            if (componentName.includes(name)) {
              parent[functionName](...params)
              break
            }
          } else {
            if (name === componentName) {
              parent[functionName](...params)
              break
            }
          }
        }
        if (!parent || parent === this.$root) break
        parent = parent.$parent
      }
    }
  }
}
