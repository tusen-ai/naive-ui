/*
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-25 11:31:12
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-07 11:13:03
 */
let Vue = null
export class Store {
  constructor (options = {}) {
    const store = this
    store._vm = new Vue({
      data: {
        $$state: {
          currentHoverRow: 1,
          currentTableEl: null
        }
      }
    })
  }
  get state () {
    return this._vm._data.$$state
  }
  commit (type, payload) {
    Vue.set(this._vm._data.$$state, type, payload)
    // this.state[type] = payload
  }
}

function vuexInit () {
  const options = this.$options
  const _Vue = options.Vue
  if (_Vue) {
    Vue = _Vue
  }
  // store injection
  if (options.store) {
    this.$store =
      typeof options.store === 'function' ? options.store() : options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
export const storageMixin = {
  beforeCreate: vuexInit
}
