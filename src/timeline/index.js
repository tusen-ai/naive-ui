/* istanbul ignore file */
import Timeline from './src/Timeline.vue'
import TimelineItem from './src/TimelineItem.vue'

Timeline.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Timeline.name, Timeline)
  Vue.component(naive.componentPrefix + TimelineItem.name, TimelineItem)
}

export default Timeline
