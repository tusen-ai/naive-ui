/*
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-24 14:26:37
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-10-24 14:50:03
 */
let Vue = null
export class Store {
  constructor (options = {}) {
    const store = this
    store._vm = new Vue({
      data: {
        $$state: {
          currentHoverRow: null
        }
      }
    })
  }
  get state () {
    return this._vm._data.$$state
  }
  commit (type, payload) {
    Vue.set(this._vm._data.$$state, type, payload)
  }
}

export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  // applyMixin(Vue)
}

// function applyMixin (Vue) {
//   const version = Number(Vue.version.split('.')[0])

//   if (version >= 2) {
//     Vue.mixin({ beforeCreate: vuexInit })
//   }

//   /**
//    * Vuex init hook, injected into each instances init hooks list.
//    */

//   function vuexInit () {
//     const options = this.$options
//     // store injection
//     if (options.store) {
//       this.$store =
//         typeof options.store === 'function' ? options.store() : options.store
//     }
//     //  else if (options.parent && options.parent.$store) {
//     //   this.$store = options.parent.$store
//     // }
//   }
// }
