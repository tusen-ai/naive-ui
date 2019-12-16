/* istanbul ignore file */
import Timeline from './src/Timeline.vue'
import TimelineItem from './src/TimelineItem.vue'

Timeline.install = function (Vue) {
  Vue.component(Timeline.name, Timeline)
  Vue.component(TimelineItem.name, TimelineItem)
}

export default Timeline
