export default {
  data () {
    return {
      showLightBar: false,
      lightBarTop: 0
    }
  },
  computed: {
    lightBarStyleTop () {
      return this.lightBarTop + 'px'
    }
  },
  methods: {
    updateLightBarPosition (el) {
      if (this.active) {
        this.showLightBar = true
        this.lightBarTop = el.offsetTop
      }
    },
    hideLightBar () {
      this.showLightBar = false
    }
  }
}
