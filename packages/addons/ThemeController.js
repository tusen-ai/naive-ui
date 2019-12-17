export default {
  install: function install (Vue) {
    if (!Vue.prototype.$naive) {
      Vue.prototype.$naive = {}
    }
    const naive = Vue.prototype.$naive
    console.info('naive theme', naive)
    // naive.theme
  }
}
