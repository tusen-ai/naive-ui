<template>
  <div
    class="n-anchor"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div
      ref="slot"
      class="n-anchor-slot"
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

function getOffsetTop (el, container) {
  const {
    top: elTop
  } = el.getBoundingClientRect()
  const {
    top: containerTop
  } = container.getBoundingClientRect()
  // console.log('elTop', elTop, 'containerTop', containerTop)
  return elTop - containerTop
}

export default {
  name: 'NAnchor',
  mixins: [withapp, themeable],
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
          // slotEl.style.top = null
        }, 150)
      }
    }
  },
  mounted () {
    this.init()
    this.setActiveHref(window.location)
    // this.blockTransitionOneTick()
  },
  provide () {
    return {
      NAnchor: this
    }
  },
  methods: {
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
    updateBarPosition (linkTitleEl) {
      // console.log('updateBarPosition')
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
      const barEl = this.$refs.bar
      barEl.style.top = `${offsetTop}px`
      barEl.style.height = `${offsetHeight}px`
      const slotEl = this.$refs.slot
      slotEl.style.top = `${offsetTop}px`
      slotEl.style.height = `${offsetHeight}px`
      slotEl.style.maxWidth = `${offsetWidth + offsetLeft}px`
    },
    setActiveHref (href) {
      this.activeHref = href
      const idMatchResult = /#([^#]+)$/.exec(href)
      if (idMatchResult) {
        const linkEl = document.getElementById(idMatchResult[1])
        if (linkEl) {
          const top = getOffsetTop(linkEl, this.container) + (this.container.scrollTop || 0)
          this.container.scrollTo({
            top: top - this.bound
          })
          this.blockTransitionOneTick()
          this.handleScroll()
        }
      }
    },
    handleScroll () {
      // console.log('handleScroll')
      const links = []
      this.collectedLinkHrefs.forEach(href => {
        const idMatchResult = /#([^#]+)$/.exec(href)
        if (idMatchResult) {
          const linkEl = document.getElementById(idMatchResult[1])
          if (linkEl) {
            links.push({
              top: getOffsetTop(linkEl, this.container),
              href
            })
          }
        }
      })
      links.sort((a, b) => {
        return a.top > b.top
      })
      // const containerScrollTop = this.container.scrollTop
      // console.log(links)
      const activeLink = links.reduce((prevLink, link) => {
        // console.log(link.top)
        if (link.top <= this.bound) {
          if (prevLink === null) {
            return link
          } else if (link.top > prevLink.top) {
            return link
          } else {
            return prevLink
          }
        }
        return prevLink
      }, null)
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
