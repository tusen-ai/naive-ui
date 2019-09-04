export default {
  data () {
    return {
      showSecondLightBar: false,
      secondLightBarTop: 0,
      secondLightBarVanishTimerId: null
    }
  },
  computed: {
    secondLightBarStyleTop () {
      return this.secondLightBarTop + 'px'
    }
  },
  beforeDestory () {
    window.clearTimeout(this.secondLightBarVanishTimerId)
  },
  methods: {
    updateSecondLightBarPosition (el) {
      if (this.active) {
        if (this.secondLightBarVanishTimerId) {
          window.clearTimeout(this.secondLightBarVanishTimerId)
          this.secondLightBarVanishTimerId = null
        }
        this.showSecondLightBar = true
        this.secondLightBarTop = el.offsetTop
      }
    },
    hideSecondLightBar (delay = 100) {
      window.clearTimeout(this.secondLightBarVanishTimerId)
      this.secondLightBarVanishTimerId = window.setTimeout(() => {
        this.showSecondLightBar = false
      }, delay)
    }
  }
}
