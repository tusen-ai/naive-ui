<template>
  <div
    :class="cls"
    :style="style"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'NTabPanel',
  inject: [ 'NTab' ],
  props: {
    label: {
      type: String,
      default: undefined
    },
    name: {
      type: String || Number,
      default: undefined
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false,
      style: {}
    }
  },
  computed: {
    cls () {
      return this.isShow ? 'n-tab-panel n-tab-panel_active' : 'n-tab-panel'
    },
    order () {
      return this.$vnode._NaiveTabOrder
    }
  },
  watch: {
    order: {

    }
  },
  created () {
    this.NTab.updateLabels()
    this.initActive()
    // this.setTransfer('-', )
  },
  methods: {
    updateIsShow (flag, dir = 'left') {
      this.isShow = flag
      // window.getComputedStyle(this.NTab.refs['slot'], null).getPropertyValue('width')
      // this.$refs['panel'].classList.toggle('n-tab-panel_active')
      // 这里应该是根据切换的方向(左右) 来设置
    },
    setTransfer (dir, per) {
      this.style.transform = 'translateX(' + dir + per + '%)'
    },
    initActive () {
      if ((this.active || (this.NTab.name === this.name && this.name !== undefined)) && this.NTab.active === null) {
        this.updateIsShow(true)
        this.NTab.initActive()
      }
    }
  }
}
</script>
