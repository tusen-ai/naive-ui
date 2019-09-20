<template>
  <div style="padding: 24px 56px;">
    <n-row style="margin-bottom: 16px;">
      <n-gradient-text :font-size="20">
        Button
      </n-gradient-text>
    </n-row>
    <n-row :gutter="16">
      <n-col span="12">
        <basic />
        <icon />
        <disabled />
        <events />
        <loading />
      </n-col>
      <n-col span="12">
        <debug />
      </n-col>
    </n-row>
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
