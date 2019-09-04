
import { Vue, router } from './init'

if (localStorage.token === 'naive') {
  new Vue({
    router
  }).$mount('#app')
}
