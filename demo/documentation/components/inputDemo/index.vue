<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Input / n-input
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basic-usage />
      <password />
      <event />
      <icon />
      <round />
      <placeholder />
      <disabled />
      <textarea-demo />
      <clearable />
      <autosize />
    </div>
  </div>
</template>

<script>
import basicUsage from './basicUsage.demo.vue'
import password from './password.demo'
import event from './event.demo'
import icon from './icon.demo'
import round from './round.demo'
import placeholder from './placeholder.demo'
import disabled from './disabled.demo'
import textareaDemo from './textarea.demo'
import clearable from './clearable.demo'
import autosize from './autosize.demo.vue'

export default {
  components: {
    basicUsage,
    password,
    event,
    icon,
    round,
    placeholder,
    disabled,
    textareaDemo,
    clearable,
    autosize
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
