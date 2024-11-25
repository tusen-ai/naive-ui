<markdown>
# 展示指令

可以制定标签页展示的指令为 `if` 、 `show` 或者 `show:lazy` 。使用 `show` 的时候标签页内容不会随着切换重置。使用 `show:lazy` 的时候显示效果跟 `show` 一致，不过内容会进行延迟加载。
</markdown>

<script lang="ts">
import { NInput } from 'naive-ui'
import { defineComponent, h } from 'vue'

const showInput = defineComponent({
  render() {
    return h(NInput, {
      placeholder: '我的内容不会被重置'
    })
  }
})

const ifInput = defineComponent({
  render() {
    return h(NInput, {
      placeholder: '我的内容会被重置'
    })
  }
})

const showLazyInput = defineComponent({
  render() {
    return h(NInput, {
      placeholder: '我会延迟加载，并且之后我的内容不会被重置'
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
