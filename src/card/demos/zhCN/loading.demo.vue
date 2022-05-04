<markdown>
# 加载中

使用 `n-skeleton` 模拟加载效果。
</markdown>

<template>
  <n-space vertical>
    <n-switch v-model:value="loading" />
    <n-card>
      <template #header>
        <n-skeleton v-if="loading" text width="60%" />
        <template v-else>
          I'm OK
        </template>
      </template>
      <n-skeleton v-if="loading" text :repeat="6" />
      <template v-else>
        不要忘了留姓名<br>
        电话和其他事情<br>
        不要说的太快免得我没写下你大名<br>
        或许你不再打来<br>
        我却等到头发白<br>
        希望有一天你会打来
      </template>
    </n-card>
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
