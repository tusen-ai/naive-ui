function createStyleObject (computedStyle) {
  const style = {}
  const length = computedStyle.length
  for (let index = 0; index < length; ++index) {
    const key = computedStyle[index]
    if (~key.indexOf('ransition')) continue
    style[key] = computedStyle[key]
  }
  return style
}

function createDiffedStyleObject (style, computedStyle) {
  const diffedStyle = {}
  for (const key of Object.keys(style)) {
    if (~key.indexOf('ransition')) continue
    if (computedStyle[key] !== style[key]) {
      diffedStyle[key] = style[key]
    }
  }
  return diffedStyle
}

function getNextBackgroundColorOf (el) {
  const computedStyle = window.getComputedStyle(el)
  const prevStyle = createStyleObject(computedStyle)
  const memorizedTransition = el.style.transition
  const memorizedBackgroundColor = el.style.backgroundColor
  el.style.transition = 'none'
  const nextBackgroundColor = computedStyle.backgroundColor
  const diffedStyle = createDiffedStyleObject(prevStyle, computedStyle)
  const memorizedInlineStyle = {}
  for (const key of Object.keys(diffedStyle)) {
    if (~key.indexOf('ransition')) continue
    memorizedInlineStyle[key] = el.style[key]
    el.style[key] = diffedStyle[key]
  }
  void (el.offsetHeight)
  for (const key of Object.keys(diffedStyle)) {
    if (~key.indexOf('ransition')) continue
    el.style[key] = memorizedInlineStyle[key]
  }
  el.style.transition = memorizedTransition
  el.style.backgroundColor = memorizedBackgroundColor
  return nextBackgroundColor
}

let cachedNextBackgroundColor = null
let cachedCSSStyleDeclaration = new WeakMap()
let callCount = 0

function cache () {
  callCount++
  if (!cachedNextBackgroundColor) cachedNextBackgroundColor = new Map()
}

function uncache () {
  callCount--
  if (callCount === 0) {
    cachedNextBackgroundColor = null
  }
  if (callCount < 0) {
    console.error(
      '[naive-ui/mixins/hollowoutable]: Call count < 0. If you saw this message, there\'s probably a bug.'
    )
  }
}

export default {
  watch: {
    synthesizedTheme (value) {
      if (this.avoidHollowOut) return
      cache()
      this.$nextTick().then(() => {
        this.updateHollowOutAffect(value)
        uncache()
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
    updateHollowOutAffect () {
      let cursor = this.$el
      while (cursor.parentElement) {
        cursor = cursor.parentElement
        let backgroundColor = null
        let CSSStyleDeclaration = cachedCSSStyleDeclaration.get(cursor)
        if (CSSStyleDeclaration) {
          backgroundColor = CSSStyleDeclaration.backgroundColor
        } else {
          CSSStyleDeclaration = window.getComputedStyle(cursor)
          cachedCSSStyleDeclaration.set(cursor, CSSStyleDeclaration)
          backgroundColor = CSSStyleDeclaration.backgroundColor
        }
        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
          if (cachedNextBackgroundColor) {
            const nextBackgroundColor = cachedNextBackgroundColor.get(cursor)
            if (nextBackgroundColor) {
              this.ascendantBackgroundColor = nextBackgroundColor
              break
            }
          }
          this.ascendantBackgroundColor = getNextBackgroundColorOf(cursor)
          if (cachedNextBackgroundColor) {
            cachedNextBackgroundColor.set(cursor, this.ascendantBackgroundColor)
          }
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
    cache()
    this.updateHollowOutAffect()
    this.$nextTick().then(() => {
      this.hollowOutColorTransitionDisabled = false
      uncache()
    })
  }
}
