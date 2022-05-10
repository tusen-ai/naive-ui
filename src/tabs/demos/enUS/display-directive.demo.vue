<markdown>
# Display directive

You can set tab-panel's display directive to `if` or `show`. When use `show`, the tab-panel's content won't be reset after tab changes. When use `show:lazy`, the display effect is the same as `show`, but the content will be lazily loaded.
</markdown>

<template>
  <n-tabs default-value="show">
    <n-tab-pane name="show" display-directive="show" tab="show">
      <show-input />
    </n-tab-pane>
    <n-tab-pane name="if" display-directive="if" tab="if">
      <if-input />
    </n-tab-pane>
    <n-tab-pane name="show:lazy" display-directive="show:lazy" tab="show:lazy">
      <show-lazy-input />
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NInput } from 'naive-ui'

const showInput = defineComponent({
  render () {
    return h(NInput, {
      placeholder: "My content won't be reset"
    })
  }
})

const ifInput = defineComponent({
  render () {
    return h(NInput, {
      placeholder: 'My content will be reset'
    })
  }
})

const showLazyInput = defineComponent({
  render () {
    return h(NInput, {
      placeholder:
        'I will delay loading, and my content will not be reset afterwards'
    })
  }
})

export default defineComponent({
  components: {
    showInput,
    ifInput,
    showLazyInput
  }
})
</script>
