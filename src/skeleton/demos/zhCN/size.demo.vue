<markdown>
# 尺寸

使用 `size` 装成其他组件。
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="loading" />加载</n-space>
    <n-space>
      <n-skeleton v-if="loading" :width="146" :sharp="false" size="medium" />
      <n-button v-else>
        Won't you fly high
      </n-button>
      <n-skeleton v-if="loading" :width="132" round size="medium" />
      <n-button v-else round>
        free bird, yeah
      </n-button>
      <n-skeleton v-if="loading" circle size="medium" />
      <n-button v-else circle>
        ?
      </n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      loading: ref(true)
    }
  }
})
</script>
