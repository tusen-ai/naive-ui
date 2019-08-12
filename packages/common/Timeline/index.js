/* istanbul ignore file */
import Timeline from './src/main.vue'
import TimelineItem from './src/TimelineItem.vue'

Timeline.install = function (Vue) {
  Vue.component(Timeline.name, Timeline)
  Vue.component(TimelineItem.name, TimelineItem)
}

export default Timeline
