function getNextBackgroundOf (el) {
  const computedStyle = window.getComputedStyle(el)
  const prevBackgroundColor = computedStyle.backgroundColor
  const transition = computedStyle.transition || ''
  const transitionProperty = computedStyle.transitionProperty || ''
  const transitionProperties = transitionProperty.split(', ')
  const transitionDuration = computedStyle.transitionDuration || ''
  const transitionDurations = transitionDuration.split(', ')
  let indexOfBackgroundColorTransition = transitionProperties.findIndex(property => property === 'background-color')
  if (!~indexOfBackgroundColorTransition) {
    indexOfBackgroundColorTransition = transitionProperties.findIndex(property => property === 'all')
  }
  if (!~indexOfBackgroundColorTransition) return computedStyle.backgroundColor
  const backgroundColorTransitionDuration = transitionDurations[indexOfBackgroundColorTransition]
  if (backgroundColorTransitionDuration === '0s') return computedStyle.backgroundColor
  const memorizedTransition = el.style.transition
  const memorizedBackgroundColor = el.style.backgroundColor
  el.style.transition = transition ? 'none' : transition + ', background-color 0s'
  const nextBackgroundColor = computedStyle.backgroundColor
  el.style.backgroundColor = prevBackgroundColor
  void (el.offsetHeight)
  el.style.transition = memorizedTransition
  el.style.backgroundColor = memorizedBackgroundColor
  return nextBackgroundColor
}

export default {
  watch: {
    synthesizedTheme (value) {
      if (this.avoidHollowOut) return
      this.$nextTick().then(() => {
        this.setHollowOutAffect(value)
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
          this.ascendantBackgroundColor = getNextBackgroundOf(cursor)
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
    this.setHollowOutAffect()
    this.$nextTick().then(() => {
      this.hollowOutColorTransitionDisabled = false
    })
  }
}
