import HollowOutStyleManager from '../utils/HollowOutStyleManager'

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
      CSSNode: null
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
          // console.log(cursor, backgroundColorHint, theme)
          this.ascendantBackgroundColor = backgroundColorHint
          break
        }
        const backgroundColor = getComputedStyle(cursor).backgroundColor
        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
          // console.log(cursor, backgroundColor)
          this.ascendantBackgroundColor = backgroundColor
          break
        }
      }
      HollowOutStyleManager.registerComponent(this.hollowOutBackgroundColorId, this.ascendantBackgroundColor)
    }
  },
  mounted () {
    this.hollowOutBackgroundColorId = 'x' + Math.random().toString(16).slice(9)
    this.$el.setAttribute('n-background-id', this.hollowOutBackgroundColorId)
    if (this.avoidHollowOut) return
    this.updateHollowOutStyle()
  },
  beforeDestroy () {
    const id = this.hollowOutBackgroundColorId
    window.setTimeout(() => {
      HollowOutStyleManager.unregisterComponent(id)
    }, 1000)
  }
}
