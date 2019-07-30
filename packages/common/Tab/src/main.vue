<template>
  <div
    class="n-tab"
  >
    <div
      class="n-tab--label"
    >
      <div
        v-for="(label, i) in labels"
        :key="i"
        class="n-tab--label-item"
        @click="updateActive($event, i)"
      >
        {{ label }}
      </div>
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
export default {
  name: 'NTab',
  provide () {
    return {
      NTab: this
    }
  },
  props: {
    name: {
      type: String || Number,
      default: undefined
    }
  },
  data () {
    return {
      labels: [],
      active: null, // number
      offset: null
    }
  },
  created () {
    this.updateOrder()
    this.initOffset()
    // this.initActive()
  },
  beforeMount () {
    console.log('slot', this.$slots)
  },
  mounted () {
    if (this.active === null) {
      this.active = 0
      let panel = this.$children.find(i => { return i.$options.name === 'NTabPanel' })
      panel.updateIsShow(true)
    }
  },
  methods: {
    updateLabels () {
      let labels = []
      this.$children.forEach((i, order) => {
        if (i.$options.name === 'NTabPanel') {
          labels.push(i.label || '')
          i._NaiveTabOrder = order
        }
      })
      this.$set(this, 'labels', labels)
    },
    initActive () {
      // let res = this.$children.findIndex(i => { return i.$options.name === 'NTabPanel' && i.active })
      // let order = res > -1 ? res : 0
      // this.$children[order].updateIsShow(true)
      // this.active = order
      this.active = this.labels.length - 1
    },
    updateActive (e, i) {
      if (e.target.className === 'n-tab--label-item' && i !== this.active) {
        this.$children[this.active].updateIsShow(false)
        this.active = i
        this.$children[i].updateIsShow(true)
        this.offset = '-' + this.active * 100 + '%'
      }
    },
    updateOrder () {
      // method duplicate with updateLabels
      this.$slots.default.forEach((i, order) => {
        i._NaiveTabOrder = order
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
    }
  }
}
</script>
