export default {
  watch: {
    synthesizedTheme (value) {
      if (this.avoidHollowOut) return
      this.$nextTick().then(() => {
        if (this.cssNode) {
          document.querySelector('head').removeChild(this.cssNode)
        }
        this.setCSSNode(value)
        document.querySelector('head').appendChild(this.cssNode)
      })
    }
  },
  data () {
    return {
      ascendantBackgroundColor: null,
      cssNode: null
    }
  },
  methods: {
    setHollowOutAffect () {
      this.setCSSNode()
      document.querySelector('head').appendChild(this.cssNode)
    },
    setCSSNode (theme) {
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
      const id = 'x' + Math.random().toString(16).slice(9)
      this.$el.setAttribute('n-background-id', id)
      this.cssNode = document.createElement('style')
      this.cssNode.innerHTML = `[n-background-id=${id}] .simulate-transparent-text {
  color: ${this.ascendantBackgroundColor}!important;
}
[n-background-id=${id}] .simulate-transparent-background {
  background-color: ${this.ascendantBackgroundColor}!important;
}
[n-background-id=${id}] .simulate-transparent-stroke circle {
  stroke: ${this.ascendantBackgroundColor}!important;
}`
      this.cssNode.type = 'text/css'
    }
  },
  mounted () {
    if (this.avoidHollowOut) return
    this.setCSSNode()
    document.querySelector('head').appendChild(this.cssNode)
  },
  beforeDestroy () {
    if (this.cssNode) {
      window.setTimeout(() => {
        if (this.cssNode) {
          document.querySelector('head').removeChild(this.cssNode)
        }
      }, 1000)
    }
  }
}
