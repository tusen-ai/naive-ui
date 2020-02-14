export default {
  data () {
    return {
      showLightBar: false,
      lightBarTop: 0,
      lightBarVanishTimerId: null
    }
  },
  computed: {
    lightBarStyleTop () {
      return this.lightBarTop + 'px'
    }
  },
  beforeDestory () {
    window.clearTimeout(this.lightBarVanishTimerId)
  },
  methods: {
    updateLightBarPosition (el) {
      if (this.active) {
        if (this.lightBarVanishTimerId) {
          window.clearTimeout(this.lightBarVanishTimerId)
          this.lightBarVanishTimerId = null
        }
        this.showLightBar = true
        this.lightBarTop = el.offsetTop
      }
    },
    hideLightBar (delay = 80) {
      window.clearTimeout(this.lightBarVanishTimerId)
      this.lightBarVanishTimerId = window.setTimeout(() => {
        this.showLightBar = false
      }, delay)
    },
    hideLightBarSync () {
      this.showLightBar = false
    }
  }
}
