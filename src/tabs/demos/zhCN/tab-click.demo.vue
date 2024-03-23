<markdown>
# 点击触发
</markdown>

<template>
  <n-card title="歌曲" style="margin-bottom: 16px">
    <n-tabs type="line" animated @tab-click="handleTabClick">
      <n-tab-pane name="oasis" tab="Oasis">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="the Beatles">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="周杰伦">
        七里香
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const handleTabClick = (tab: string) => {
      console.log(tab)
    }

    return {
      handleTabClick
    }
  }
})
</script>

<style>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
