// import HollowOutStyleManager from '../utils/HollowOutStyleManager'

export default {
  watch: {
    synthesizedTheme (value) {
      if (this.avoidHollowOut) return
      this.$nextTick().then(() => {
        this.updateHollowOutStyle(value)
      })
    }
  },
  data () {
    return {
      ascendantBackgroundColor: null,
      hollowOutColorTransitionDisabled: true
    }
  },
  methods: {
    setHollowOutAffect () {
      this.updateHollowOutStyle()
    },
    updateHollowOutStyle (theme) {
      let cursor = this.$el
      theme = theme || this.synthesizedTheme
      while (cursor.parentElement) {
        cursor = cursor.parentElement
        const backgroundColorHint = cursor.getAttribute(`n-${theme}-theme-background-color-hint`)
        if (backgroundColorHint === 'transparent') continue
        if (backgroundColorHint) {
          this.ascendantBackgroundColor = backgroundColorHint
          break
        }
        const backgroundColor = getComputedStyle(cursor).backgroundColor
        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
          this.ascendantBackgroundColor = backgroundColor
          break
        }
      }
    }
  },
  created () {
    if (this.avoidHollowOut) this.hollowOutColorTransitionDisabled = false
  },
  mounted () {
    if (this.avoidHollowOut) return
    this.updateHollowOutStyle()
    this.$nextTick().then(() => {
      this.hollowOutColorTransitionDisabled = false
    })
  }
}
