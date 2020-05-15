<template>
  <div
    class="n-tabs"
    :class="{
      [`n-tabs--${type}-type`]: true,
      'n-tabs--scroll': showScrollButton,
      [`n-tabs--${labelSize}-size`]: labelSize,
      [`n-tabs--flex`]: justifyContent,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <div
      ref="nav"
      class="n-tabs-nav"
      :style="navStyle"
    >
      <div
        v-if="showScrollButton"
        class="n-tabs-nav-scroll-button n-tabs-nav-scroll-button--left"
        :class="{
          'n-tabs-nav-scroll-button--disabled': leftScrollButtonDisabled
        }"
        @click="scroll('left')"
      >
        <n-icon>
          <ios-arrow-back />
        </n-icon>
      </div>
      <div
        ref="navScroll"
        class="n-tabs-nav-scroll"
      >
        <div
          ref="labelWrapper"
          class="n-tabs-label-wrapper"
        >
          <div :style="labelWrapperStyle">
            <div
              v-for="(panel, i) in panels"
              :key="i"
              :ref="`label(${i})`"
              class="n-tabs-label"
              :class="{
                'n-tabs-label--active': activeName === panel.name,
                'n-tabs-label--disabled': panel.disabled
              }"
              @click="handleTabClick($event, panel.name, panel.disabled)"
            >
              <span class="n-tabs-label__label">{{ panel.label }}</span>
              <div
                v-if="closable && typeIsCard"
                class="n-tabs-label__close"
                @click.stop="handleCloseClick(panel)"
              >
                <n-icon>
                  <md-close />
                </n-icon>
              </div>
            </div>
          </div>
          <div
            v-if="!typeIsCard"
            ref="labelBar"
            class="n-tabs-label-bar"
            :class="{
              'n-tabs-label-bar--transition-disabled': transitionDisabled
            }"
          />
        </div>
      </div>
      <div
        v-if="showScrollButton"
        class="n-tabs-nav-scroll-button n-tabs-nav-scroll-button--right"
        :class="{
          'n-tabs-nav-scroll-button--disabled': rightScrollButtonDisabled
        }"
        @click="scroll('right')"
      >
        <n-icon>
          <ios-arrow-forward />
        </n-icon>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import NIcon from '../../Icon'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import iosArrowBack from '../../_icons/ios-arrow-back'
import iosArrowForward from '../../_icons/ios-arrow-forward'
import mdClose from '../../_icons/md-close'
import resizeObserverDelegate from '../../_utils/delegate/resizeObserverDelegate'
import throttle from 'lodash-es/throttle'

export default {
  name: 'NTabs',
  provide () {
    return {
      NTab: this
    }
  },
  components: {
    NIcon,
    iosArrowBack,
    iosArrowForward,
    mdClose
  },
  mixins: [ withapp, themeable ],
  model: {
    prop: 'active-name',
    event: 'active-name-change'
  },
  props: {
    activeName: {
      type: String || Number,
      default: undefined
    },
    type: {
      validator (type) {
        return ['line', 'card'].includes(type)
      },
      default: 'line'
    },
    closable: {
      type: Boolean,
      default: false
    },
    justifyContent: {
      validator (value) {
        return ['space-between', 'space-around', 'space-evenly'].includes(value)
      },
      default: null
    },
    labelSize: {
      validator (value) {
        return ['small', 'medium', 'large', 'huge'].includes(value)
      },
      default: 'medium'
    },
    navStyle: {
      type: [String, Object],
      default: null
    }
  },
  data () {
    return {
      panels: [],
      barStyleInitialized: false,
      showScrollButton: false,
      leftScrollButtonDisabled: true,
      rightScrollButtonDisabled: false,
      transitionDisabled: false,
      resizeObserver: null
    }
  },
  computed: {
    typeIsCard () {
      return this.type === 'card'
    },
    typeIsLine () {
      return this.type === 'line'
    },
    labelWrapperStyle () {
      if (!this.justifyContent) return null
      return {
        display: 'flex',
        justifyContent: this.justifyContent
      }
    },
    panelLabels () {
      return this.panels.map(panel => panel.label)
    }
  },
  watch: {
    activeName () {
      if (this.typeIsLine) {
        this.updateCurrentBarPosition()
      }
    },
    showScrollButton (value) {
      this.$emit('scrollable-change', value)
    },
    panelLabels () {
      this.$nextTick().then(this.updateScrollStatus)
    }
  },
  mounted () {
    this.updateScrollStatus()
    this.registerScrollContentResizeObserver()
    this
      .$nextTick()
      .then(() => {
        const fontsReady = document.fonts.ready
        return fontsReady || undefined
      })
      .then(() => {
        this.updateScrollStatus()
        if (this.typeIsLine) {
          this.updateCurrentBarPosition()
        }
      })
    this.registerResizeObserver()
  },
  beforeDestroy () {
    this.unregisterResizeObserver()
    this.unregisterScrollContentResizeObserver()
  },
  methods: {
    scroll (direction) {
      const navScroll = this.$refs.navScroll
      const scrollLeft = navScroll.scrollLeft
      const labelWrapper = this.$refs.labelWrapper
      const scrollWidth = navScroll.offsetWidth * 0.8
      let left = 0
      if (direction === 'left') {
        left = scrollLeft - scrollWidth
      } else {
        left = scrollLeft + scrollWidth
      }
      if (left <= 0) {
        this.leftScrollButtonDisabled = true
        this.rightScrollButtonDisabled = false
      } else if (left >= labelWrapper.offsetWidth - navScroll.offsetWidth) {
        this.rightScrollButtonDisabled = true
        this.leftScrollButtonDisabled = false
      } else {
        this.rightScrollButtonDisabled = false
        this.leftScrollButtonDisabled = false
      }
      navScroll.scrollTo({
        left,
        behavior: 'smooth'
      })
    },
    updateScrollStatus () {
      const labelWrapper = this.$refs.labelWrapper
      const nav = this.$refs.nav
      if (labelWrapper.offsetWidth > nav.offsetWidth) {
        this.showScrollButton = true
      } else {
        this.showScrollButton = false
      }
    },
    addPanel (panelInstance) {
      this.panels.push(panelInstance)
    },
    removePanel (panelInstance) {
      const index = this.panels.findIndex(panel => panel === panelInstance)
      if (~index) {
        this.panels.splice(index, 1)
      }
    },
    updateBarPosition (labelEl) {
      if (this.$refs.labelBar) {
        this.$refs.labelBar.style.left = labelEl.offsetLeft + 'px'
        this.$refs.labelBar.style.width = this.$el.offsetWidth + 'px'
        if (this.type === 'card') {
          this.$refs.labelBar.style.maxWidth = labelEl.offsetWidth + 'px'
        } else {
          this.$refs.labelBar.style.maxWidth = labelEl.offsetWidth + 1 + 'px'
        }
      }
    },
    updateCurrentBarPosition () {
      let index = 0
      const value = this.activeName
      const refs = this.$refs
      for (const panel of this.panels) {
        if (panel.name === value) {
          this.updateBarPosition(refs[`label(${index})`][0])
          break
        }
        index++
      }
    },
    handleTabClick (e, panelName, disabled) {
      if (!disabled) {
        this.setPanelActive(panelName)
      }
    },
    setPanelActive (panelName) {
      this.$emit('active-name-change', panelName)
    },
    handleCloseClick (panel) {
      this.$emit('close', panel.name)
    },
    registerResizeObserver () {
      resizeObserverDelegate.registerHandler(this.$refs.nav, throttle(() => {
        if (
          this.typeIsCard ||
          (this.typeIsLine && !this.justifyContent)
        ) {
          this.updateScrollStatus()
        }
        if (this.typeIsLine) {
          this.transitionDisabled = true
          this.$nextTick().then(() => {
            this.updateCurrentBarPosition()
            this.transitionDisabled = false
          })
        }
      }, 64))
    },
    unregisterResizeObserver () {
      resizeObserverDelegate.unregisterHandler(this.$refs.nav)
    },
    registerScrollContentResizeObserver () {
      resizeObserverDelegate.registerHandler(this.$refs.labelWrapper, throttle(() => {
        this.updateScrollStatus()
      }, 64))
    },
    unregisterScrollContentResizeObserver () {
      resizeObserverDelegate.unregisterHandler(this.$refs.labelWrapper)
    }
  }
}
</script>
