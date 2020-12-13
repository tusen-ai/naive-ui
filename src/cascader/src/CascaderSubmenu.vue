<template>
  <div class="n-cascader-submenu">
    <n-scrollbar ref="scrollbarRef">
      <n-cascader-option
        v-for="tmNode in tmNodes"
        ref="options"
        :key="tmNode.rawNode.value"
        :tm-node="tmNode"
      />
    </n-scrollbar>
  </div>
</template>

<script>
import { ref } from 'vue'
import NCascaderOption from './CascaderOption.vue'
import { NScrollbar } from '../../scrollbar'

export default {
  name: 'NCascaderSubmenu',
  components: {
    NCascaderOption,
    NScrollbar
  },
  inject: ['NCascader'],
  props: {
    depth: {
      type: Number,
      required: true
    },
    tmNodes: {
      type: Array,
      required: true
    }
  },
  setup () {
    return {
      scrollbarRef: ref(null)
    }
  }
}
</script>
