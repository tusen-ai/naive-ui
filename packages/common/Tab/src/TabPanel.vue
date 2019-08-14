<template>
  <div
    v-if="NTab && name === NTab.value"
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
      type: String,
      default: null
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
      isShow: false,
      style: {}
    }
  },
  computed: {
    cls () {
      return this.isShow ? 'n-tab-panel n-tab-panel_active' : 'n-tab-panel'
    }
    // offset () {
    //   return this.NTab.offset
    // }
  },
  watch: {
    // offset: {
    //   handler (n) {
    //     this.setTransfer(n)
    //     this.$forceUpdate()
    //   },
    //   immediate: true
    // }
  },
  // created () {
  //   this.NTab.updateLabels()
  //   if (this._NaiveTabOrder === this.NTab.active) {
  //     this.updateIsShow(true)
  //   }
  //   this.$on('display-none', this.setDisplayNone)
  // },
  mounted () {
    if (this.NTab) {
      console.log(this.NTab.value)
      this.NTab.addPanel(this)
    }
  },
  beforeDestroy () {
    if (this.NTab) {
      this.NTab.removePanel(this)
    }
  }
  // methods: {
  //   updateIsShow (flag) {
  //     this.isShow = flag
  //     this.$forceUpdate()
  //   },
  //   setTransfer (per) {
  //     // 这里可以优化, 直接在上层div做整体移动, 不需要对子元素移动
  //     this.style.transform = 'translateX(' + per + ')'
  //   }
  // }
}
</script>
