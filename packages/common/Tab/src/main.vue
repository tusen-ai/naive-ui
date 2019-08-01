<template>
  <div
    class="n-tab"
  >
    <div
      :class="addable ? 'n-tab--label_addable n-tab--label' : 'n-tab--label'"
    >
      <div
        v-for="(label, i) in labels"
        :key="i"
        :class="getClass(i)"
        @click="updateActive($event, i)"
      >
        <span class="n-tab--label-content">{{ label }}
          <span class="n-tab--label-delete"> + </span>
        </span>
      </div>
      <n-button
        size="small"
        class="n-tab--label-add"
        @click="addPanelItem"
      >
        +
      </n-button>
    </div>
    <div
      ref="slot"
      class="n-tab--slot"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'NTab',
  provide () {
    return {
      NTab: this
    }
  },
  mixins: [ Emitter ],
  props: {
    name: {
      type: String || Number,
      default: undefined
    },
    closable: {
      type: Boolean,
      default: undefined
    },
    type: {
      type: String,
      default: 'normal' // card board?
    },
    addable: {
      type: Boolean,
      default: false
    },
    addPanel: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      labels: [],
      active: null, // number
      offset: null,
      prefix: 'n-tab--label'
    }
  },
  computed: {
  },
  created () {
    this.updateOrder()
    this.initOffset()
  },
  mounted () {
    if (this.active === null) {
      this.active = 0
      let panel = this.$children.find(i => { return i.$options.name === 'NTabPanel' })
      panel.updateIsShow(true)
    }
  },
  methods: {
    getClass (i) {
      let panel = this.getTabPanel(i) || {}
      let cName = this.prefix + '-item '
      cName += (panel.disabled ? this.prefix + '-item_disabled ' : '')
      cName += (this.active === i ? this.prefix + '-item_active ' : '')
      cName += this.type === 'card' ? this.prefix + '-item_card ' : ''
      cName += this.type === 'card' && (this.closable || panel.closable) ? this.prefix + '-item_close ' : ''
      // cName += this.addable ? this.prefix + '-item_addable ' : ''

      return cName
    },
    updateLabels () {
      let labels = []
      let j = 0
      this.$children.forEach((i) => {
        if (i.$options.name === 'NTabPanel') {
          labels.push(i.label || '')
          i._NaiveTabOrder = j++
        }
      })
      this.$set(this, 'labels', labels)
    },
    initActive () {
      this.active = this.labels.length - 1
    },
    updateActive (e, i) {
      let eName = e.target.className
      let eParentName = e.target.parentElement.className
      let isLabel = eName.indexOf('n-tab--label-item') > -1 || eParentName.indexOf('n-tab--label-item') > -1
      if (eName === 'n-tab--label-delete') {
        // steps while deleting, need to set display none to label and the tab panel and then init the display
        this.labels.splice(i, 1)
        this.broadcast('NTabPanel', 'display-none', i)
        this.updateOrder(false)
        if (this.active === i) {
          this.active = 0
          this.getTabPanel(this.active).updateIsShow(true)
        } else {
          this.active = i > this.active ? this.active : this.active - 1
        }
        this.offset = '-' + this.active * 100 + '%'
      } else if (isLabel && i !== this.active) {
        this.getTabPanel(this.active).updateIsShow(false)
        this.active = i
        let temp = this.getTabPanel(i)
        console.log(temp, this.$children, i)
        temp.updateIsShow(true)
        this.offset = '-' + this.active * 100 + '%'
      }
    },
    updateOrder (init = true) {
      // method duplicate with updateLabels
      let j = 0
      let arr = init ? this.$slots.default : this.$children
      arr.forEach((i) => {
        if (init || i.unDelete) {
          i._NaiveTabOrder = j++
        } else {
          delete i._NaiveTabOrder
        }
      })
    },
    initOffset () {
      // method duplicate with updateLabels
      let order = this.$slots.default.findIndex((i) => {
        let props = i.componentOptions.propsData
        if ([undefined, false].indexOf(props.active) === -1) {
          return true
        }
        if (this.name === props.name && this.name !== undefined) {
          return true
        }
      })
      this.active = order > -1 ? order : 0
      this.offset = '-' + this.active * 100 + '%'
      console.log('active', this.active)
    },
    getTabPanel (i) {
      if (i === undefined) return
      return this.$children.find(c => {
        return c._NaiveTabOrder === i
      })
    },
    addPanelItem () {
      this.addPanel()
      this.updateOrder(false)
    }
  }
}
</script>
