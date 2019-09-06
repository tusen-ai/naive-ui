export default {
  data () {
    return {
      ascendantBackgroundColor: null,
      cssNode: null
    }
  },
  mounted () {
    let cursor = this.$el
    while (cursor.parentElement) {
      cursor = cursor.parentElement
      const backgroundColor = getComputedStyle(cursor).backgroundColor
      if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
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
}
`
    this.cssNode.type = 'text/css'
    document.querySelector('head').appendChild(this.cssNode)
  },
  beforeDestroy () {
    window.setTimeout(() => {
      document.querySelector('head').removeChild(this.cssNode)
    }, 1000)
  }
}
