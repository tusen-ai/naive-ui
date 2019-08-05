<template>
  <div
    :class="tabCls"
  >
    <div
      :class="addable ? 'n-tab--label_addable n-tab--label' : 'n-tab--label'"
    >
      <div style="display: inline-flex;">
        <div
          v-for="(label, i) in labels"
          :key="i"
          :class="getClass(i)"
          @click="clickChange($event, i)"
        >
          <span class="n-tab--label-content">
            <span class="n-tab--label-text">{{ label }}</span>
            <n-icon
              class="n-tab--label-delete"
              type="ios-close"
              size="20"
            />
          </span>
        </div>
      </div>
      <n-icon
        type="ios-add"
        class="n-tab--label-add"
        @click="addPanelItem"
      />
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
      default: 'normal' // card board
    },
    addable: {
      type: Boolean,
      default: false
    },
    addPanel: {
      type: Function,
      default: () => {}
    },
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
      labels: [],
      names: [],
      active: null, // number
      offset: null,
      prefix: 'n-tab--label'
    }
  },
  computed: {
    tabCls () {
      let type = ['normal', 'card', 'board']
      let cls = 'n-tab '
      return type.indexOf(this.type) > -1 ? cls + 'n-tab_' + this.type + '' : ''
    }
  },
  watch: {
    name (n, o) {
      let i = this.names.indexOf(n)
      if (i === -1) {
        return
      }
      this.specPanel(i)
    }
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
      let type = ['normal', 'card', 'board']
      cName += (panel.disabled ? this.prefix + '-item_disabled ' : '')
      cName += (this.active === i ? this.prefix + '-item_active ' : '')
      cName += type.indexOf(this.type) > -1 ? this.prefix + '-item_' + this.type + '' : ''
      cName += type.indexOf(this.type) && (this.closable || panel.closable) ? this.prefix + '-item_close ' : ''

      return cName
    },
    updateLabels () {
      let labels = []
      let j = 0
      this.names = []
      this.$children.forEach((i) => {
        if (i.$options.name === 'NTabPanel') {
          let l = i.label === undefined ? '' : i.label
          labels.push(l)
          this.names.push(i.name)
          i._NaiveTabOrder = j++
        }
      })
      this.$set(this, 'labels', labels)
    },
    initActive () {
      this.active = this.labels.length - 1
    },
    clickChange (e, i) {
      let oldName = this.names[this.active]
      let newName = this.names[i]
      let eName = e.target.className
      let eParentName = e.target.parentElement.className
      let isLabel = eName.indexOf('n-tab--label-item') > -1 || eParentName.indexOf('n-tab--label-item') > -1
      if (isLabel) {
        Promise.resolve(this.beforeLeave(newName, oldName)).then(res => {
          if (res) {
            this.updateActive(e, i)
          }
        })
      } else {
        this.updateActive(e, i)
      }
    },
    updateActive (e, i) {
      let eName = e.target.className
      let eParentName = e.target.parentElement.className
      let isLabel = eName.indexOf('n-tab--label-item') > -1 || eParentName.indexOf('n-tab--label-item') > -1
      if (eName.indexOf('n-tab--label-delete') > -1) {
        // steps while deleting, need to set display none to label and the tab panel and then init the display
        this.labels.splice(i, 1)
        this.names.splice(i, 1)
        this.broadcast('NTabPanel', 'display-none', i)
        this.updateOrder(false)
        if (this.active === i) {
          this.active = 0
          this.getTabPanel(this.active).updateIsShow(true)
        } else {
          this.active = i > this.active ? this.active : this.active - 1
        }
        this.offset = '-' + this.active * 100 + '%'
        this.tabRemove(this.getTabPanel(i))
      } else if (isLabel && i !== this.active) {
        this.specPanel(i)
      }
    },
    specPanel (i) {
      this.getTabPanel(this.active).updateIsShow(false)
      this.active = i
      this.getTabPanel(i).updateIsShow(true)
      this.offset = '-' + this.active * 100 + '%'
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
