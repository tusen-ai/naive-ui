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
      <icon />
      <basic-usage />
      <disabled />
      <type />
      <events />
      <loading />
      <basic />
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
import basic from './basic.md'

export default {
  components: {
    loading,
    basicUsage,
    disabled,
    type,
    icon,
    events,
    basic
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
