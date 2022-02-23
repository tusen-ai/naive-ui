<markdown>
# 调试
</markdown>

<template>
  <n-button @click="name = 'the beatles'">
    将名称设置为披头士乐队
  </n-button>

  <n-card title="歌曲" style="margin-bottom: 16px">
    <n-tabs v-model:value="name">
      <n-tab-pane name="oasis" tab="绿洲乐队">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="披头士乐队">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="周杰伦">
        七里香
      </n-tab-pane>
    </n-tabs>
  </n-card>

  <n-card content-style="padding: 0;">
    <n-tabs
      type="line"
      size="large"
      :tabs-padding="20"
      pane-style="padding: 20px;"
    >
      <n-tab-pane v-for="item in 50" :key="item" :name="`item${item}`">
        PARKLIFE
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      name: ref('oasis')
    }
  }
})
</script>

<style>
.n-button {
  margin-top: 12px;
}
</style>
