
import { Vue, router, i18n } from './init'

if (localStorage.token === 'naive') {
  new Vue({
    router,
    i18n
  }).$mount('#app')
}
