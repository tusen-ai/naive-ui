/* istanbul ignore file */
import Timeline from './src/Timeline.vue'
import TimelineItem from './src/TimelineItem.vue'

Timeline.install = function (app, naive) {
  app.component(naive.componentPrefix + Timeline.name, Timeline)
  app.component(naive.componentPrefix + TimelineItem.name, TimelineItem)
}

export default Timeline
