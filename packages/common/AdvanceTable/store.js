/*
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-24 14:03:55
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-10-24 14:49:04
 */
import Vue from 'vue'
import Vuex from './TableStore'
Vue.use(Vuex)

export default new Vuex.Store()
export const storeMixin = {
  beforeCreate: function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store =
        typeof options.store === 'function' ? options.store() : options.store
    }
  }
}
