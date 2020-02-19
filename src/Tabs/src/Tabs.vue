<template>
  <div
    ref="tab"
    class="n-tabs"
    :class="{
      [`n-tabs--${type}-type`]: true,
      'n-tabs--scroll': showScrollButton,
      [`n-tabs--${size}-size`]: size,
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
                'n-tabs-label--active': value === panel.name,
                'n-tabs-label--disabled': panel.disabled
              }"
              @click="handleTabClick($event, panel.name, panel.disabled)"
            >
              <!-- <n-tab-label-corner v-if="typeIsCard" class="n-tabs-label__corner n-tabs-label__corner--left" direction="left" />
              <n-tab-label-corner v-if="typeIsCard" class="n-tabs-label__corner n-tabs-label__corner--right" direction="right" /> -->
              <span class="n-tabs-label__label">{{ panel.label }}</span>
              <div
                v-if="closable && typeIsCard"
                class="n-tabs-label__close"
                @click.stop="handleCloseMarkClick(panel)"
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
  props: {
    value: {
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
    size: {
      type: String,
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
    labelWrapperStyle () {
      if (!this.justifyContent) return null
      return {
        display: 'flex',
        justifyContent: this.justifyContent
      }
    }
  },
  watch: {
    showScrollButton (value) {
      this.$emit('scrollable-change', value)
    }
  },
  mounted () {
    function updateBarPosition () {
      let index = 0
      for (const panel of this.panels) {
        if (panel.name === this.value) {
          this.updateBarPosition(this.$refs[`label(${index})`][0])
          break
        }
        index++
      }
    }
    this.updateScrollStatus()
    this
      .$nextTick()
      .then(() => {
        const fontsReady = document.fonts.ready
        return fontsReady || undefined
      })
      .then(() => {
        this.updateScrollStatus()
        updateBarPosition.bind(this)()
      })
    this.resizeObserver = new ResizeObserver(() => {
      this.transitionDisabled = true
      updateBarPosition.bind(this)()
      this.$nextTick().then(() => {
        this.transitionDisabled = false
      })
    })
    this.resizeObserver.observe(this.$refs.tab)
  },
  updated () {
    this
      .$nextTick()
      .then(() => {
        this.updateScrollStatus()
      })
  },
  beforeDestroy () {
    this.resizeObserver.disconnect()
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
    handleTabClick (e, panelName, disabled) {
      if (!disabled) {
        this.setPanelActive(panelName)
        this.updateBarPosition(e.currentTarget)
      }
    },
    setPanelActive (tabLabel) {
      this.$emit('input', tabLabel)
    },
    handleAddButtonClick () {
      this.$emit('add-button-click')
    },
    handleCloseMarkClick (panel) {
      this.$emit('close', panel.name)
    }
  }
}
</script>
