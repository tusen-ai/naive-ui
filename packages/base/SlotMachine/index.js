import SlotMachine from './src/main.vue'

SlotMachine.install = function (Vue) {
  Vue.component(SlotMachine.name, SlotMachine)
}

export default SlotMachine
