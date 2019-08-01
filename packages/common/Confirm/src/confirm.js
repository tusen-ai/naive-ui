import Vue from 'vue'
import Confirm from './confirm.vue'

Confirm.newInstance = properties => {
  const _props = properties || {}
  let Instance = new Vue({
    data: _props,
    render (h) {
      return h(Confirm, {
        props: _props
      })
    }
  })

  Instance.$mount()

  // console.log('TCL: Instance', Instance)
  const confirm = Instance.$children[0]

  return {
    remove () {
      this.destroy()
    },
    setLoading (loading) {
      confirm.loading = loading
      console.log(confirm, confirm.loading)
    },
    update (options) {
      Object.keys(options).forEach(key => {
        confirm[key] = options[key]
      })
    },
    component: confirm,
    destroy () {
      if (confirm) confirm.isActive = false
      setTimeout(() => {
        // confirm && confirm.$destroy()
        Instance && Instance.$destroy()
      }, 300)
    }
  }
}
export default Confirm
