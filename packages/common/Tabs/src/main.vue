<template>
  <div
    class="n-tab"
    :class="{
      [`n-tab--${type}-type`]: true
    }"
  >
    <div class="n-tab-nav">
      <div class="n-tab-nav__scroll">
        <div class="n-tab-label-wrapper">
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
              <span class="n-tab-label__label">{{ panel.label }}</span>
              <div
                v-if="panel.closable ? true : closable"
                class="n-tab-label__icon"
              >
                <n-icon
                  type="ios-close"
                />
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
        v-if="addable"
        class="n-tab-add-button"
      >
        <n-icon
          type="ios-add-circle-outline"
          @click="handleAddButtonClick"
        />
      </div>
    </div>
    <div
      ref="slot"
      class="n-tab--slot-panel"
    >
      <div class="n-tab--slot">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'NTabs',
  provide () {
    return {
      NTab: this
    }
  },
  mixins: [ Emitter ],
  props: {
    value: {
      type: String || Number,
      default: undefined
    },
    type: {
      validator (type) {
        return ['line', 'card', 'board'].includes(type)
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
    },
    /** callback */
    // addPanel: {
    //   type: Function,
    //   default: () => {}
    // },
    beforeLeave: {
      type: Function,
      default: () => { return true }
    },
    // tabClick: {
    //   type: Function,
    //   default: () => {}
    // },
    tabRemove: {
      type: Function,
      default: () => {}
    }
    // tabAdd: {
    //   type: Function,
    //   default: () => {}
    // },
    // edit: {
    //   type: Function,
    //   default: () => {}
    // }
  },
  data () {
    return {
      panels: [],
      barStyleInitialized: false
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
    this
      .$nextTick()
      .then(() => {
        const fontsReady = document.fonts.ready
        return fontsReady || undefined
      })
      .then(updateBarPosition.bind(this))
  },
  methods: {
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
