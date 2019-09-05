<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Button / n-button
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <disabled />
      <type />
      <icon />
      <events />
      <loading />
    </div>
  </div>
</template>

<script>
import loading from './loading.demo.vue'
import basicUsage from './basicUsage.demo.vue'
import disabled from './disabled.demo.vue'
import type from './type.demo.vue'
import icon from './icon.demo.vue'
import events from './events.demo.vue'

export default {
  components: {
    loading,
    basicUsage,
    disabled,
    type,
    icon,
    events
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
