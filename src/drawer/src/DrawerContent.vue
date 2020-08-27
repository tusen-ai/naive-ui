<template>
  <n-scrollbar>
    <div
      class="n-drawer-content"
      :style="{
        width: styleWidth
      }"
    >
      <slot />
    </div>
  </n-scrollbar>
</template>

<script>
import NScrollbar from '../../scrollbar'

export default {
  name: 'NDrawerContent',
  components: {
    NScrollbar
  },
  props: {
    // use the prop since width behavior inside n-scrollbar is different from
    // real scrollbar
    styleWidth: {
      type: String,
      default: null
    }
  },
  provide () {
    return {
      NDrawer: this
    }
  },
  methods: {
    getDetachTarget () {
      return this.$el
    }
  }
}
</script>
