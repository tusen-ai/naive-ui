/* istanbul ignore file */
import Avatar from './src/main.vue'

Avatar.install = function (Vue) {
  Vue.component(Avatar.name, Avatar)
}

export default Avatar
