<template>
  <n-scrollbar>
    <div
      ref="bodyRef"
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
import { ref } from 'vue'
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
      NDrawerBody: this,
      NModalBody: null
    }
  },
  setup () {
    return {
      bodyRef: ref(null)
    }
  },
  methods: {
    getDetachTarget () {
      return this.$el
    }
  }
}
</script>
