class HollowOutStyleManager {
  constructor () {
    this.idStyleMap = new Map()
    this.CSSNode = document.createElement('style')
    this.CSSNode.type = 'text/css'
  }
  styleForComponent (id, backgroundColor) {
    if (!backgroundColor) return ''
    return `[n-background-id=${id}] .simulate-transparent-text {
  color: ${backgroundColor}!important;
}
[n-background-id=${id}] .simulate-transparent-background {
  background-color: ${backgroundColor}!important;
}
[n-background-id=${id}] .simulate-transparent-stroke circle {
  stroke: ${backgroundColor}!important;
}
`
  }
  get styleLiteral () {
    let style = ''
    this.idStyleMap.forEach((value) => {
      style += value
    })
    // console.log('styleLiteral', style)
    return style
  }
  updateCSSNode () {
    this.CSSNode.innerHTML = this.styleLiteral
    const headEl = document.querySelector('head')
    if (!headEl.contains(this.CSSNode)) {
      headEl.appendChild(this.CSSNode)
    }
  }
  registerComponent (id, backgroundColor) {
    // console.log('registerComponent', id, backgroundColor)
    this.idStyleMap.set(id, this.styleForComponent(id, backgroundColor))
    this.updateCSSNode()
  }
  unregisterComponent (id) {
    this.isStyleMap.remove(id)
    this.updateCSSNode()
  }
}

export default new HollowOutStyleManager()
