export default {
  props: ['id'],
  mounted () {
    console.log('Content Mounted', this.id)
  },
  updated () {
    console.log('Content Updated', this.id)
  },
  beforeDestroy () {
    console.log('Content Destroyed', this.id)
  }
}
