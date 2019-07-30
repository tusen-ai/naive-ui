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
    offset () {
      return this.NTab.offset
    }
  },
  watch: {
    offset: {
      handler (n) {
        this.setTransfer(n)
        console.log('zhixing', n)
      },
      immediate: true
    }
  },
  created () {
    this.NTab.updateLabels()
    if (this._NaiveTabOrder === this.NTab.active) {
      this.updateIsShow(true)
    }
  },
  methods: {
    updateIsShow (flag) {
      this.isShow = flag
      // window.getComputedStyle(this.NTab.refs['slot'], null).getPropertyValue('width')
      // this.$refs['panel'].classList.toggle('n-tab-panel_active')
      // 这里应该是根据切换的方向(左右) 来设置
    },
    setTransfer (per) {
      this.style.transform = 'translateX(' + per + ')'
    }
  }
}
</script>
