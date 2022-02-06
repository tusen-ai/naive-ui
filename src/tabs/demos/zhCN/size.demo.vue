<markdown>
# 尺寸

Tabs 可以有不同的尺寸。
</markdown>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="size">
      <n-space>
        <n-radio value="small">
          小
        </n-radio>
        <n-radio value="medium">
          不小
        </n-radio>
        <n-radio value="large">
          不不小
        </n-radio>
      </n-space>
    </n-radio-group>
    <n-tabs type="bar" :size="size">
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
    <n-tabs type="line" :size="size">
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
    <n-tabs type="card" :size="size" closable>
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
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      size: ref<'small' | 'medium' | 'large'>('medium')
    }
  }
})
</script>
