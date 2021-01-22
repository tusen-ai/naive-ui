import {
  h,
  nextTick,
  ref,
  markRaw,
  provide,
  reactive,
  defineComponent,
  PropType,
  watch,
  onBeforeUnmount,
  renderSlot,
  onMounted
} from 'vue'
import { getScrollParent, unwrapElement } from 'seemly'
import { onFontsReady } from 'vooks'
import { warn } from '../../_utils'
import type { AnchorInjection } from './Link'

export interface BaseAnchorRef {
  setActiveHref: (href: string) => void
}

function getOffset (
  el: HTMLElement,
  container: HTMLElement
): {
    top: number
    height: number
  } {
  const { top: elTop, height } = el.getBoundingClientRect()
  const { top: containerTop } = container.getBoundingClientRect()
  return {
    top: elTop - containerTop,
    height
  }
}

export default defineComponent({
  name: 'BaseAnchor',
  props: {
    listenTo: [String, Object] as PropType<string | (() => HTMLElement)>,
    bound: {
      type: Number,
      default: 12
    },
    ignoreGap: {
      type: Boolean,
      default: false
    },
    // deprecated
    target: {
      type: Function as PropType<(() => HTMLElement) | undefined>,
      validator: () => {
        if (__DEV__) {
          warn(
            'anchor',
            '`target` is deprecated, please use`listen-to` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    let scrollElement: HTMLElement | null
    const collectedLinkHrefs: string[] = markRaw([])
    const titleEls: HTMLElement[] = markRaw([])
    const activeHrefRef = ref<string | null>(null)
    const slotRef = ref<HTMLElement | null>(null)
    const barRef = ref<HTMLElement | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    function disableTransitionOneTick (): void {
      const { value: barEl } = barRef
      const { value: slotEl } = slotRef
      if (barEl) {
        barEl.style.transition = 'none'
      }
      if (slotEl) {
        slotEl.style.transition = 'none'
      }
      if (titleEls) {
        titleEls.forEach((titleEl) => {
          titleEl.style.transition = 'none'
        })
      }
      void nextTick(() => {
        const { value: nextBarEl } = barRef
        const { value: nextSlotEl } = slotRef
        if (nextBarEl) {
          void nextBarEl.offsetWidth
          nextBarEl.style.transition = ''
        }
        if (nextSlotEl) {
          void nextSlotEl.offsetWidth
          nextSlotEl.style.transition = ''
        }
        if (titleEls) {
          titleEls.forEach((titleEl) => {
            void titleEl.offsetWidth
            titleEl.style.transition = ''
          })
        }
      })
    }
    function updateBarPosition (
      linkTitleEl: HTMLElement,
      transition = true
    ): void {
      const { value: barEl } = barRef
      const { value: slotEl } = slotRef
      const { value: selfEl } = selfRef
      if (!selfEl || !barEl || !slotEl) return
      if (!transition) {
        barEl.style.transition = 'none'
        slotEl.style.transition = 'none'
      }
      const { offsetHeight, offsetWidth } = linkTitleEl
      const {
        top: linkTitleClientTop,
        left: linkTitleClientLeft
      } = linkTitleEl.getBoundingClientRect()
      const {
        top: anchorClientTop,
        left: anchorClientLeft
      } = selfEl.getBoundingClientRect()
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
        barEl.style.transition = ''
        slotEl.style.transition = ''
      }
    }
    function setActiveHref (href: string, transition = true): void {
      const idMatchResult = /#([^#]+)$/.exec(href)
      if (idMatchResult) {
        const linkEl = document.getElementById(idMatchResult[1])
        if (linkEl && scrollElement) {
          activeHrefRef.value = href
          const top =
            getOffset(linkEl, scrollElement).top +
            (scrollElement.scrollTop || 0)
          scrollElement.scrollTo({
            top: top
          })
          if (!transition) {
            disableTransitionOneTick()
          }
          handleScroll()
        }
      }
    }
    function handleScroll (): void {
      _handleScroll()
    }
    function _handleScroll (transition = true): void {
      interface LinkInfo {
        top: number
        height: number
        href: string
      }
      const links: LinkInfo[] = []
      collectedLinkHrefs.forEach((href) => {
        const idMatchResult = /#([^#]+)$/.exec(href)
        if (idMatchResult) {
          const linkEl = document.getElementById(idMatchResult[1])
          if (linkEl && scrollElement) {
            const { top, height } = getOffset(linkEl, scrollElement)
            links.push({
              top,
              height,
              href
            })
          }
        }
      })
      links.sort((a, b) => {
        if (a.top >= b.top) {
          if (a.height < b.height) {
            return 1
          }
        }
        return -1
      })
      const currentActiveHref = activeHrefRef.value
      const bound = props.bound
      const ignoreGap = props.ignoreGap
      const activeLink = links.reduce((prevLink: LinkInfo | null, link) => {
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
      if (!transition) disableTransitionOneTick()
      if (activeLink) {
        activeHrefRef.value = activeLink.href
      } else {
        activeHrefRef.value = null
      }
    }
    function init (): void {
      const { target: getScrollTarget, listenTo } = props
      let scrollEl
      if (getScrollTarget) {
        // deprecated
        scrollEl = getScrollTarget()
      } else if (listenTo) {
        scrollEl = unwrapElement(listenTo)
      } else {
        scrollEl = getScrollParent(selfRef.value)
      }
      if (scrollEl) {
        scrollElement = scrollEl
      } else if (__DEV__) {
        warn('anchor', 'Target to be listened to is not valid.')
      }
      if (scrollEl) {
        scrollEl.addEventListener('scroll', handleScroll)
      }
    }
    provide<AnchorInjection>(
      'NAnchor',
      reactive({
        activeHref: activeHrefRef,
        updateBarPosition,
        setActiveHref,
        collectedLinkHrefs,
        titleEls
      })
    )
    onMounted(() => {
      init()
      setActiveHref(String(window.location))
      _handleScroll(false)
    })
    onFontsReady(() => {
      setActiveHref(String(window.location))
      _handleScroll(false)
    })
    onBeforeUnmount(() => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    })
    watch(activeHrefRef, (value) => {
      if (value === null) {
        const { value: slotEl } = slotRef
        if (slotEl) {
          slotEl.style.maxWidth = '0'
        }
      }
    })
    return {
      selfRef,
      barRef,
      slotRef,
      setActiveHref,
      activeHref: activeHrefRef
    }
  },
  render () {
    return (
      <div class="n-anchor" ref="selfRef">
        <div ref="slotRef" class="n-anchor-link-background" />
        <div class="n-anchor-rail">
          <div
            ref="barRef"
            class={[
              'n-anchor-rail__bar',
              {
                'n-anchor-rail__bar--active': this.activeHref !== null
              }
            ]}
          />
        </div>
        {renderSlot(this.$slots, 'default')}
      </div>
    )
  }
})
