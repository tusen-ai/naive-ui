class HollowOutStyleManager {
  constructor () {
    this.idStyleMap = new Map()
    this.CSSNode = document.createElement('style')
    this.CSSNode.type = 'text/css'
  }
  styleForComponent (id, backgroundColor) {
    if (!backgroundColor) return ''
    return `[n-hollowoutable-id=${id}] .simulate-hollow-out-text {
  color: ${backgroundColor}!important;
}
[n-hollowoutable-id=${id}] .simulate-hollow-out-background {
  background-color: ${backgroundColor}!important;
}
[n-hollowoutable-id=${id}] .simulate-hollow-out-stroke circle {
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
