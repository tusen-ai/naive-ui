<template>
  <n-base-portal ref="portal" :on-mounted="init">
    <transition name="n-back-top-transition">
      <div
        v-if="show"
        :class="{
          [`n-${syntheticTheme}-theme`]: syntheticTheme
        }"
        :style="{
          ...syntheticStyle,
          right: styleRight,
          bottom: styleBottom
        }"
        class="n-back-top"
        @click="handleClick"
      >
        <slot>
          <div class="n-back-top__default-button">
            <svg
              viewBox="0 0 40 40"
            >
              <title>BackTop</title>
              <g>
                <path
                  d="M30,8A20,20,0,1,0,50,28,20,20,0,0,0,30,8Zm8,23.8a1.65,1.65,0,0,1-2.36,0l-4-3.94V36.4a1.67,1.67,0,0,1-3.34,0V28l-4,3.76a1.65,1.65,0,0,1-2.36,0,1.48,1.48,0,0,1,0-2.25l7-6.67a1.65,1.65,0,0,1,2.36,0L38,29.45A1.59,1.59,0,0,1,38,31.8Zm2.36-10.61H19.67a1.6,1.6,0,1,1,0-3.19H40.33a1.6,1.6,0,1,1,0,3.19Z"
                  transform="translate(-10 -8)"
                />
              </g>
            </svg>
          </div>
        </slot>
      </div>
    </transition>
  </n-base-portal>
</template>

<script>
import getScrollParent from '../../_utils/dom/getScrollParent'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asthemecontext from '../../_mixins/asthemecontext'
import NBasePortal from '../../_base/Portal'

export default {
  name: 'NBackTop',
  components: {
    NBasePortal
  },
  mixins: [withapp, themeable, asthemecontext],
  props: {
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    },
    target: {
      type: Function,
      default: null
    },
    visibilityHeight: {
      type: Number,
      default: 180
    }
  },
  data () {
    return {
      container: null,
      content: null,
      show: false
    }
  },
  computed: {
    styleRight () {
      return this.right + 'px'
    },
    styleBottom () {
      return this.bottom + 'px'
    }
  },
  watch: {
    show (value) {
      if (value) this.$emit('shohw')
      return this.$emit('hide')
    }
  },
  mounted () {
    this.$refs.portal.transferElement()
  },
  beforeDestroy () {
    if (this.container) {
      this.container.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    init () {
      if (this.target) {
        this.container = this.target()
      } else {
        this.container = getScrollParent(this.$el)
      }
      if (this.container) {
        this.container.addEventListener('scroll', this.handleScroll)
        this.handleScroll()
      }
    },
    handleClick () {
      if (this.container.nodeName === '#document') {
        this.container.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        this.container.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      this.$emit('click')
    },
    handleScroll () {
      let scrollTop = this.container.scrollTop
      if (this.container.nodeName === '#document') {
        scrollTop = this.container.documentElement.scrollTop
      }
      if (scrollTop === 0) {
        this.show = false
      } else if (scrollTop >= this.visibilityHeight) {
        this.show = true
      } else {
        this.show = false
      }
    }
  }
}
</script>
