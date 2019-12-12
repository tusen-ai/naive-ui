<template>
  <div
    class="n-tabs"
    :class="{
      [`n-tabs--${type}-type`]: true,
      'n-tabs--scroll': showScrollButton,
      [`n-tabs--${size}-size`]: size,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div
      ref="nav"
      class="n-tab-nav"
    >
      <div
        v-if="showScrollButton"
        class="n-tab-nav__scroll-button n-tab-nav__scroll-button--left"
        :class="{
          'n-tab-nav__scroll-button--disabled': leftScrollButtonDisabled
        }"
        @click="scroll('left')"
      >
        <n-icon>
          <ios-arrow-back />
        </n-icon>
      </div>
      <div
        ref="navScroll"
        class="n-tab-nav__scroll"
      >
        <div
          ref="labelWrapper"
          class="n-tab-label-wrapper"
        >
          <div>
            <div
              v-for="(panel, i) in panels"
              :key="i"
              :ref="`label(${i})`"
              class="n-tab-label"
              :class="{
                'n-tab-label--active': value === panel.name,
                'n-tab-label--disabled': panel.disabled,
                'n-tab-label--transition-disabled': transitionDisabled
              }"
              @click="handleTabClick($event, panel.name, panel.disabled)"
            >
              <tab-label-corner
                v-if="value === panel.name && type === 'card'"
                direction="left"
              />
              <tab-label-corner
                v-if="value === panel.name && type === 'card'"
                direction="right"
              />
              <span class="n-tab-label__label">{{ panel.label }}</span>
              <div
                v-if="closable && type === 'card'"
                class="n-tab-label__close"
                @click.stop="handleCloseMarkClick(panel)"
              >
                <n-icon>
                  <md-close />
                </n-icon>
              </div>
            </div>
          </div>
          <div
            v-if="type === 'line'"
            ref="labelBar"
            class="n-tab-label-bar"
          />
        </div>
      </div>
      <div
        v-if="showScrollButton"
        class="n-tab-nav__scroll-button n-tab-nav__scroll-button--right"
        :class="{
          'n-tab-nav__scroll-button--disabled': rightScrollButtonDisabled
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
import TabLabelCorner from './TabLabelCorner'
import NIcon from '../../Icon'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import iosArrowBack from '../../../icons/ios-arrow-back'
import iosArrowForward from '../../../icons/ios-arrow-forward'
import mdClose from '../../../icons/md-close'

export default {
  name: 'NTabs',
  provide () {
    return {
      NTab: this
    }
  },
  components: {
    TabLabelCorner,
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
    bodered: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data () {
    return {
      panels: [],
      barStyleInitialized: false,
      showScrollButton: false,
      leftScrollButtonDisabled: true,
      rightScrollButtonDisabled: false,
      transitionDisabled: false
    }
  },
  watch: {
    value () {
      this.transitionDisabled = true
      this.$nextTick().then(() => {
        this.transitionDisabled = false
      })
    }
  },
  mounted () {
    function updateBarPosition () {
      let index = 0
      for (const panel of this.panels) {
        if (panel.name === this.value) {
        // this.$el.getBoundingClientRect()
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
  },
  updated () {
    this
      .$nextTick()
      .then(() => {
        this.updateScrollStatus()
      })
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
        this.$refs.labelBar.style.maxWidth = labelEl.offsetWidth + 1 + 'px'
      }
    },
    handleTabClick (e, panelName, disabled) {
      if (!disabled) {
        this.setPanelActive(panelName)
        this.updateBarPosition(e.target)
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
    },
    blockTransitionOneTick () {

    }
  }
}
</script>
