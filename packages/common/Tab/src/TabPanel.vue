<template>
  <div class="NTabPanel">
    <div v-show="isShow">
      <slot />
    </div>
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
      isShow: false
    }
  },
  computed: {
  },
  created () {
    this.NTab.updateLabels()
    this.initActive()
  },
  methods: {
    updateIsShow (flag) {
      this.isShow = flag
      // 这里应该是根据切换的方向(左右) 来设置
    },
    initActive () {
      if ((this.active || this.NTab.name === this.name) && this.NTab.active === null) {
        this.updateIsShow(true)
        this.NTab.initActive()
      }
    }
  }
}
</script>
