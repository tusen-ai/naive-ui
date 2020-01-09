function getTransitionTimingFunctions (transitionTimingFunction) {
  return transitionTimingFunction.replace(/([^\d]),/g, '$1#').split('# ')
}

function getComputedTransition (computedStyle) {
  const transitionProperty = computedStyle.transitionProperty || ''
  const transitionProperties = transitionProperty.split(', ')
  const transitionDuration = computedStyle.transitionDuration || ''
  const transitionDurations = transitionDuration.split(', ')
  const transitionTimingFunction = computedStyle.transitionTimingFunction || ''
  const transitionTimingFunctions = getTransitionTimingFunctions(transitionTimingFunction)
  const transitionDelay = computedStyle.transitionDelay || ''
  const transitionDelays = transitionDelay.split(', ')
  const transitionWithoutBackgroundColor = transitionProperties.map((prop, i) => (prop !== 'background-color' ? [
    transitionProperties[i],
    transitionDurations[i],
    transitionTimingFunctions[i],
    transitionDelays[i]
  ].join(' ') : null)).filter(v => v !== null).join(', ')
  return {
    transitionProperties,
    transitionDurations,
    transitionWithoutBackgroundColor: transitionProperties.includes('all') ? 'none' : transitionWithoutBackgroundColor
  }
}

function getNextBackgroundOf (el) {
  console.log('getNextBackgroundOf called')
  const computedStyle = window.getComputedStyle(el)
  const prevBackgroundColor = computedStyle.backgroundColor
  const {
    transitionProperties,
    transitionDurations,
    transitionWithoutBackgroundColor
  } = getComputedTransition(computedStyle)
  let indexOfBackgroundColorTransition = transitionProperties.findIndex(property => property === 'background-color')
  if (!~indexOfBackgroundColorTransition) {
    indexOfBackgroundColorTransition = transitionProperties.findIndex(property => property === 'all')
    if (~indexOfBackgroundColorTransition) {
      console.warn(`[naive-ui/hollowoutable]: 
background-color of`, el, `is transitioned by \`all\` property,
naive-ui can't read read all potential transition properties in this case.
When theme is changed it may cause losing some transition on it beside background-color transition.
To be avoid of this issue, specified all potential transition property explicitly.`)
    }
  }
  if (!~indexOfBackgroundColorTransition) return computedStyle.backgroundColor
  const backgroundColorTransitionDuration = transitionDurations[indexOfBackgroundColorTransition]
  if (backgroundColorTransitionDuration === '0s') return computedStyle.backgroundColor
  const memorizedTransition = el.style.transition
  const memorizedBackgroundColor = el.style.backgroundColor
  el.style.transition = transitionWithoutBackgroundColor || 'none'
  const nextBackgroundColor = computedStyle.backgroundColor
  el.style.backgroundColor = prevBackgroundColor
  void (el.offsetHeight)
  el.style.transition = memorizedTransition
  el.style.backgroundColor = memorizedBackgroundColor
  return nextBackgroundColor
}

let cachedNextBackgroundColor = null
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
    console.error(['[naive-ui/hollowoutable]: Call count < 0. If you saw this line, there\'s probably a bug.'])
  }
}

export default {
  watch: {
    synthesizedTheme (value) {
      if (this.avoidHollowOut) return
      cache()
      this.$nextTick().then(() => {
        this.setHollowOutAffect(value)
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
    setHollowOutAffect () {
      let cursor = this.$el
      while (cursor.parentElement) {
        cursor = cursor.parentElement
        const backgroundColor = window.getComputedStyle(cursor).backgroundColor
        if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
          if (cachedNextBackgroundColor) {
            const nextBackgroundColor = cachedNextBackgroundColor.get(cursor)
            if (nextBackgroundColor) {
              this.ascendantBackgroundColor = nextBackgroundColor
              break
            }
          }
          this.ascendantBackgroundColor = getNextBackgroundOf(cursor)
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
    this.setHollowOutAffect()
    this.$nextTick().then(() => {
      this.hollowOutColorTransitionDisabled = false
      uncache()
    })
  }
}
