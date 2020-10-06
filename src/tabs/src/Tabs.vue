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
    <resize-observer @resize="handleNavResize">
      <div
        ref="navRef"
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
            <backward-icon />
          </n-icon>
        </div>
        <div
          ref="navScrollRef"
          class="n-tabs-nav-scroll"
        >
          <resize-observer @resize="handleScrollContentResize">
            <div
              ref="labelWrapperRef"
              class="n-tabs-label-wrapper"
            >
              <div :style="labelWrapperStyle">
                <div
                  v-for="(panel, i) in panels"
                  :key="i"
                  :ref="`label(${i})`"
                  class="n-tabs-label"
                  :class="{
                    'n-tabs-label--active': compitableValue === panel.name,
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
                      <close-icon />
                    </n-icon>
                  </div>
                </div>
              </div>
              <div
                v-if="!typeIsCard"
                ref="labelBarRef"
                class="n-tabs-label-bar"
                :class="{
                  'n-tabs-label-bar--transition-disabled': transitionDisabled
                }"
              />
            </div>
          </resize-observer>
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
            <forward-icon />
          </n-icon>
        </div>
      </div>
    </resize-observer>
    <slot />
  </div>
</template>

<script>
import { ref } from 'vue'
import NIcon from '../../icon'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import BackwardIcon from '../../_icons/ios-arrow-back.vue'
import ForwardIcon from '../../_icons/ios-arrow-forward.vue'
import CloseIcon from '../../_icons/md-close.vue'
import { ResizeObserver } from '../../_base'
import { throttle } from 'lodash-es'
import styles from './styles'
import { warn } from '../../_utils/naive/warn'
import { onFontReady, useCompitable } from '../../_utils/composition'

export default {
  name: 'Tabs',
  provide () {
    return {
      NTab: this
    }
  },
  components: {
    NIcon,
    BackwardIcon,
    ForwardIcon,
    CloseIcon,
    ResizeObserver
  },
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    value: {
      type: String || Number,
      required: true
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
      default: undefined
    },
    labelSize: {
      validator (value) {
        return ['small', 'medium', 'large', 'huge'].includes(value)
      },
      default: 'medium'
    },
    navStyle: {
      type: [String, Object],
      default: undefined
    },
    onScrollableChange: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    onClose: {
      type: Function,
      default: undefined
    },
    // deprecated
    activeName: {
      validator () {
        if (__DEV__) warn('tabs', '`active-name` is deprecated, please use `value` instead.')
        return true
      },
      default: undefined
    },
    onActiveNameChange: {
      validator () {
        if (__DEV__) warn('tabs', '`on-active-name-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
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
    compitableValue () {
      if (this.typeIsLine) {
        this.updateCurrentBarPosition()
      }
    },
    showScrollButton (value) {
      const {
        onScrollableChange
      } = this
      if (onScrollableChange) onScrollableChange(value)
    },
    panelLabels () {
      this.$nextTick(this.updateScrollStatus)
    }
  },
  setup (props) {
    onFontReady(vm => {
      vm.updateScrollStatus()
      if (vm.typeIsLine) {
        vm.updateCurrentBarPosition()
      }
    })
    return {
      compitableValue: useCompitable(props, ['activeName', 'value']),
      compitableOnValueChange: useCompitable(props, ['onActiveNameChange', 'onUpdate:value']),
      navScrollRef: ref(null),
      labelWrapperRef: ref(null),
      navRef: ref(null),
      labelBarRef: ref(null)
    }
  },
  mounted () {
    this.updateScrollStatus()
  },
  methods: {
    scroll (direction) {
      const navScroll = this.navScrollRef
      const scrollLeft = navScroll.scrollLeft
      const labelWrapper = this.labelWrapperRef
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
      const labelWrapper = this.labelWrapperRef
      const nav = this.navRef
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
      const labelBarEl = this.labelBarRef
      // BUG? this.$el is null
      if (labelBarEl && labelEl) {
        labelBarEl.style.left = labelEl.offsetLeft + 'px'
        labelBarEl.style.width = '8192px'
        if (this.type === 'card') {
          labelBarEl.style.maxWidth = labelEl.offsetWidth + 'px'
        } else {
          labelBarEl.style.maxWidth = labelEl.offsetWidth + 1 + 'px'
        }
      }
    },
    updateCurrentBarPosition () {
      let index = 0
      const value = this.compitableValue
      const refs = this.$refs
      for (const panel of this.panels) {
        if (panel.name === value) {
          this.updateBarPosition(refs[`label(${index})`])
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
      const {
        compitableOnValueChange
      } = this
      if (compitableOnValueChange) compitableOnValueChange(panelName)
    },
    handleCloseClick (panel) {
      const {
        onClose
      } = this
      if (onClose) onClose(panel.name)
    },
    handleNavResize: throttle(function handleNavResize () {
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
    }, 64),
    handleScrollContentResize: throttle(function handleScrollContentResize () {
      this.updateScrollStatus()
    }, 64)
  }
}
</script>
