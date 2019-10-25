/*
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-25 10:13:50
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-10-25 11:24:13
 */

import Scaffold from './src/main.vue'

Scaffold.install = function(Vue) {
  Scaffold.Vue = Vue
  Vue.component(Scaffold.name, Scaffold)
}

export default Scaffold
