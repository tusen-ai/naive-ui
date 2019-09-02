<template>
  <div
    class="n-tab"
    :class="{
      [`n-tab--${type}-type`]: true
    }"
  >
    <div
      ref="nav"
      class="n-tab-nav"
    >
      <div
        v-if="showScrollButton"
        @click="scroll('left')"
      >
        Left
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
                'n-tab-label--disabled': panel.disabled
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
        @click="scroll('right')"
      >
        Right
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
import Emitter from '../../../mixins/emitter'
import TabLabelCorner from './TabLabelCorner'

export default {
  name: 'NTabs',
  provide () {
    return {
      NTab: this
    }
  },
  components: {
    TabLabelCorner
  },
  mixins: [ Emitter ],
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
      default: undefined
    },
    addable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      panels: [],
      barStyleInitialized: false,
      showScrollButton: false
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
        updateBarPosition.bind(this)
      })
  },
  methods: {
    scroll (direction) {
      const navScroll = this.$refs.navScroll
      const scrollLeft = navScroll.scrollLeft
      const scrollWidth = navScroll.offsetWidth * 0.8
      if (direction === 'left') {
        navScroll.scrollTo({
          left: scrollLeft - scrollWidth,
          behavior: 'smooth'
        })
      } else {
        navScroll.scrollTo({
          left: scrollLeft + scrollWidth,
          behavior: 'smooth'
        })
      }
    },
    updateScrollStatus () {
      const labelWrapper = this.$refs.labelWrapper
      const nav = this.$refs.nav
      if (labelWrapper.offsetWidth > nav.offsetWidth) {
        console.log('showScrollButton')
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
    }
  }
}
</script>
