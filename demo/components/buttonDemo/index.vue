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
      <basic />
      <icon />
      <disabled />
      <events />
      <loading />
      <debug />
    </div>
  </div>
</template>

<script>
import loading from './loading.md'
import disabled from './disabled.md'
import events from './events.md'
import debug from './debug.md'
import basic from './basic.md'
import icon from './icon.md'

export default {
  components: {
    loading,
    disabled,
    icon,
    events,
    debug,
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
