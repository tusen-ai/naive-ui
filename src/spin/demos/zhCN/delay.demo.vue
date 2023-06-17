<markdown>
# 延迟

你可以设置一个显示延迟时间。在延迟时间到达前结束，Spin 将不会显示
</markdown>

<template>
  <n-space vertical>
    <n-spin :show="show" :delay="1000">
      <n-alert title="La La La" type="success">
        明天再打开行李箱。宝贝，挂电话啦。
      </n-alert>
    </n-spin>
    <n-button @click="show = !show">
      {{ show ? '不要再转啦' : '点击来转圈' }}
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
