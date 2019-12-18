/*
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-25 11:31:12
 * @LastEditors  : Jiwen.bai
 * @LastEditTime : 2019-12-18 17:46:19
 */
let Vue = null
export class Store {
  constructor (options = {}) {
    const store = this
    store._vm = new Vue({
      data: {
        $$state: {
          currentHoverRow: 1,
          currentTableEl: null,
          selectedAllChecked: false
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
  if (options.parent && options.parent.$tableStore) {
    this.$tableStore = options.parent.$tableStore
  } else if (!this.$tableStore) {
    this.$tableStore = new Store()
  }
}
export const storageMixin = {
  beforeCreate: vuexInit
}
