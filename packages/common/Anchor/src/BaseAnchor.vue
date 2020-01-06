<template>
  <div
    class="n-anchor"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :style="synthesizedStyle"
  >
    <div
      ref="slot"
      class="n-anchor-link-background"
    />
    <div class="n-anchor-rail">
      <div
        ref="bar"
        class="n-anchor-rail__bar"
        :class="{
          'n-anchor-rail__bar--active': activeHref !== null
        }"
      />
    </div>
    <slot />
  </div>
</template>

<script>
import getScrollParent from '../../../utils/dom/getScrollParent'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import fontawarable from '../../../mixins/fontawarable'

function getOffset (el, container) {
  const {
    top: elTop,
    height
  } = el.getBoundingClientRect()
  const {
    top: containerTop
  } = container.getBoundingClientRect()
  return {
    top: elTop - containerTop,
    height
  }
}

export default {
  name: 'NBaseAnchor',
  mixins: [withapp, themeable, fontawarable],
  props: {
    target: {
      type: Function,
      default: null
    },
    bound: {
      type: Number,
      default: 12
    }
  },
  data () {
    return {
      collectedLinkHrefs: [],
      activeHref: null,
      container: null
    }
  },
  watch: {
    activeHref (value) {
      if (value === null) {
        const slotEl = this.$refs.slot
        slotEl.style.maxWidth = `0px`
        const barEl = this.$refs.bar
        window.setTimeout(() => {
          slotEl.style.top = null
          barEl.style.top = null
        }, 150)
      }
    }
  },
  provide () {
    return {
      NAnchor: this
    }
  },
  methods: {
    handleFontReady () {
      this.init()
      this.setActiveHref(window.location)
      this.handleScroll(false)
    },
    blockTransitionOneTick () {
      const barEl = this.$refs.bar
      const slotEl = this.$refs.slot
      barEl.style.transition = 'none'
      slotEl.style.transition = 'none'
      barEl.getBoundingClientRect()
      slotEl.getBoundingClientRect()
      this.$nextTick().then(() => {
        barEl.style.transition = null
        slotEl.style.transition = null
      })
    },
    updateBarPosition (linkTitleEl, transition = true) {
      const barEl = this.$refs.bar
      const slotEl = this.$refs.slot
      if (!transition) {
        barEl.style.transition = 'none'
        slotEl.style.transition = 'none'
      }
      const {
        offsetHeight,
        offsetWidth
      } = linkTitleEl
      const {
        top: linkTitleClientTop,
        left: linkTitleClientLeft
      } = linkTitleEl.getBoundingClientRect()
      const {
        top: anchorClientTop,
        left: anchorClientLeft
      } = this.$el.getBoundingClientRect()
      const offsetTop = linkTitleClientTop - anchorClientTop
      const offsetLeft = linkTitleClientLeft - anchorClientLeft
      barEl.style.top = `${offsetTop}px`
      barEl.style.height = `${offsetHeight}px`
      slotEl.style.top = `${offsetTop}px`
      slotEl.style.height = `${offsetHeight}px`
      slotEl.style.maxWidth = `${offsetWidth + offsetLeft}px`
      barEl.getBoundingClientRect()
      slotEl.getBoundingClientRect()
      if (!transition) {
        barEl.style.transition = null
        slotEl.style.transition = null
      }
    },
    setActiveHref (href, transition = true) {
      const idMatchResult = /#([^#]+)$/.exec(href)
      if (idMatchResult) {
        const linkEl = document.getElementById(idMatchResult[1])
        if (linkEl) {
          this.activeHref = href
          const top = getOffset(linkEl, this.container).top + (this.container.scrollTop || 0)
          this.container.scrollTo({
            top: top - this.bound
          })
          if (!transition) {
            this.blockTransitionOneTick()
          }
          this.handleScroll()
        }
      }
    },
    handleScroll (transition = true) {
      const links = []
      this.collectedLinkHrefs.forEach(href => {
        const idMatchResult = /#([^#]+)$/.exec(href)
        if (idMatchResult) {
          const linkEl = document.getElementById(idMatchResult[1])
          if (linkEl) {
            const {
              top,
              height
            } = getOffset(linkEl, this.container)
            links.push({
              top,
              height,
              href
            })
          }
        }
      })
      links.sort((a, b) => {
        return a.top > b.top || a.top === b.top ? a.height < b.height : false
      })
      const currentActiveHref = this.activeHref
      const activeLink = links.reduce((prevLink, link, index) => {
        if (link.top + link.height < 0) {
          return prevLink
        }
        if (link.top <= this.bound) {
          if (prevLink === null) {
            return link
          } else if (link.top === prevLink.top) {
            if (link.href === currentActiveHref) {
              return link
            } else return prevLink
          } else if (link.top > prevLink.top) {
            return link
          } else {
            return prevLink
          }
        }
        return prevLink
      }, null)
      if (!transition) this.blockTransitionOneTick()
      if (activeLink) {
        this.activeHref = activeLink.href
      } else {
        this.activeHref = null
      }
    },
    init () {
      if (this.target) {
        this.container = this.target()
      } else {
        this.container = getScrollParent(this.$el)
      }
      if (this.container) {
        this.container.addEventListener('scroll', this.handleScroll)
      }
    }
  }
}
</script>
