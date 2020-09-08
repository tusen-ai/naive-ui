/* istanbul ignore file */
import Avatar from './src/Avatar.vue'

Avatar.install = function (app, naive) {
  app.component(naive.componentPrefix + Avatar.name, Avatar)
}

export default Avatar
