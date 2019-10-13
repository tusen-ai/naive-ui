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
  return elTop - containerTop
}

export default {
  name: 'NAnchor',
  mixins: [withapp, themeable],
  props: {
    target: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      collectedLinkHrefs: [],
      activeHref: null,
      container: null
    }
  },
  mounted () {
    this.init()
  },
  provide () {
    return {
      NAnchor: this
    }
  },
  methods: {
    updateBarPosition (linkTitleEl) {
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
    },
    handleScroll () {
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
        if (link.top < 5) {
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
