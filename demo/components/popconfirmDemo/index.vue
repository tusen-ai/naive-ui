<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Popconfirm / n-popconfirm
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <no-icon />
      <event />
      <custom-action />
      <custom-icon />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import event from './event.demo.vue'
import customAction from './customAction.demo.vue'
import noIcon from './noIcon.demo.vue'
import customIcon from './customIcon.demo.vue'

export default {
  components: {
    basicUsage,
    event,
    customAction,
    noIcon,
    customIcon
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
