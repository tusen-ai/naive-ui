<template>
  <div
    v-if="NTab && name === NTab.value"
    class="n-tab-panel"
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
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    type () {
      return this.NTab.type
    }
  },
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
}
</script>
