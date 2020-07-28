/* istanbul ignore file */
import Avatar from './src/Avatar.vue'

Avatar.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Avatar.name, Avatar)
}

export default Avatar
