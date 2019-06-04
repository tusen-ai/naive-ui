import MasonryGroup from './src/main.vue'

MasonryGroup.install = function (Vue) {
  Vue.component(MasonryGroup.name, MasonryGroup)
}

export default MasonryGroup
