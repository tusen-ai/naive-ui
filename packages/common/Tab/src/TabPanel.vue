<template>
  <div
    v-if="unDelete"
    ref="tab-panel"
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
      type: [String, Number],
      default: undefined
    },
    name: {
      type: String || Number,
      default: undefined
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      unDelete: true,
      isShow: false,
      style: {}
    }
  },
  computed: {
    cls () {
      return this.isShow ? 'n-tab-panel n-tab-panel_active' : 'n-tab-panel'
    },
    offset () {
      return this.NTab.offset
    }
  },
  watch: {
    offset: {
      handler (n) {
        this.setTransfer(n)
        this.$forceUpdate()
      },
      immediate: true
    }
  },
  created () {
    this.NTab.updateLabels()
    if (this._NaiveTabOrder === this.NTab.active) {
      this.updateIsShow(true)
    }
    this.$on('display-none', this.setDisplayNone)
  },
  beforeDestroy () {
    console.log('before destory call')
    this.$off('display-none', this.setDisplayNone)
  },
  methods: {
    updateIsShow (flag) {
      this.isShow = flag
      this.$forceUpdate()
      // window.getComputedStyle(this.NTab.refs['slot'], null).getPropertyValue('width')
      // this.$refs['panel'].classList.toggle('n-tab-panel_active')
      // 这里应该是根据切换的方向(左右) 来设置
    },
    setTransfer (per) {
      this.style.transform = 'translateX(' + per + ')'
    },
    setDisplayNone (i) {
      if (i === this._NaiveTabOrder) {
        // this.$set(this.style, 'display', 'none')
        this.unDelete = false
      }
    }
  }
}
</script>
