<markdown>
# Display directive

You can set tab-panel's display directive to `if` or `show`. When use `show`, the tab-panel's content won't be reset after tab changes. When use `show:lazy`, the display effect is the same as `show`, but the content will be lazily loaded.
</markdown>

<script lang="ts">
import { NInput } from 'naive-ui'
import { defineComponent, h } from 'vue'

const showInput = defineComponent({
  render() {
    return h(NInput, {
      placeholder: 'My content won\'t be reset'
    })
  }
})

const ifInput = defineComponent({
  render() {
    return h(NInput, {
      placeholder: 'My content will be reset'
    })
  }
})

const showLazyInput = defineComponent({
  render() {
    return h(NInput, {
      placeholder:
        'I will delay loading, and my content will not be reset afterwards'
    })
  }
})

export default defineComponent({
  components: {
    ShowInput: showInput,
    IfInput: ifInput,
    ShowLazyInput: showLazyInput
  }
})
</script>

<template>
  <n-tabs default-value="show">
    <n-tab-pane name="show" display-directive="show" tab="show">
      <ShowInput />
    </n-tab-pane>
    <n-tab-pane name="if" display-directive="if" tab="if">
      <IfInput />
    </n-tab-pane>
    <n-tab-pane name="show:lazy" display-directive="show:lazy" tab="show:lazy">
      <ShowLazyInput />
    </n-tab-pane>
  </n-tabs>
</template>
