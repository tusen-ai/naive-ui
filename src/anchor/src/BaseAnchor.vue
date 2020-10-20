<template>
  <div
    class="n-anchor"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    :style="mergedStyle"
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
import { nextTick, ref, markRaw } from 'vue'
import getScrollParent from '../../_utils/dom/getScrollParent'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import { onFontReady } from '../../_utils/composition/index'
import { warn } from '../../_utils/naive/warn'

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
  mixins: [
    withapp,
    themeable
  ],
  provide () {
    return {
      NAnchor: this
    }
  },
  props: {
    target: {
      type: Function,
      default: null
    },
    bound: {
      type: Number,
      default: 12
    },
    ignoreGap: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    onFontReady(vm => {
      vm.init()
      vm.setActiveHref(window.location)
      vm.handleScroll(false)
    })
    return {
      collectedLinkHrefs: markRaw([]),
      titleEls: markRaw([]),
      activeHref: ref(null),
      container: ref(null)
    }
  },
  watch: {
    activeHref (value) {
      if (value === null) {
        const slotEl = this.$refs.slot
        slotEl.style.maxWidth = 0
      }
    }
  },
  methods: {
    disableTransitionOneTick () {
      const barEl = this.$refs.bar
      const slotEl = this.$refs.slot
      const titleEls = this.titleEls
      if (barEl) {
        barEl.style.transition = 'none'
      }
      if (slotEl) {
        slotEl.style.transition = 'none'
      }
      titleEls.forEach(titleEl => {
        titleEl.style.transition = 'none'
      })
      nextTick(() => {
        const nextBarEl = this.$refs.bar
        const nextSlotEl = this.$refs.slot
        if (nextBarEl) {
          void (nextBarEl.offsetWidth)
          nextBarEl.style.transition = null
        }
        if (nextSlotEl) {
          void (nextSlotEl.offsetWidth)
          nextSlotEl.style.transition = null
        }
        titleEls.forEach(titleEl => {
          void (titleEl.offsetWidth)
          titleEl.style.transition = null
        })
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
      void barEl.offsetHeight
      void slotEl.offsetHeight

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
            top: top
          })
          if (!transition) {
            this.disableTransitionOneTick()
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
      let bound = this.bound
      let ignoreGap = this.ignoreGap
      const activeLink = links.reduce((prevLink, link, index) => {
        if (link.top + link.height < 0) {
          if (ignoreGap) {
            return link
          } else {
            return prevLink
          }
        }
        if (link.top <= bound) {
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
      if (!transition) this.disableTransitionOneTick()
      if (activeLink) {
        this.activeHref = activeLink.href
      } else {
        this.activeHref = null
      }
    },
    init () {
      this.container = getScrollParent(this.$el)
      if (this.target) {
        const target = this.target()
        if (target instanceof Element) {
          this.container = target
        } else if (__DEV__) {
          warn('anchor', 'target is not a element')
        }
      }
      if (this.container) {
        this.container.addEventListener('scroll', this.handleScroll)
      }
    }
  }
}
</script>
