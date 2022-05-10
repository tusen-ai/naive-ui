<markdown>
# Size

Tabs may have different sizes.
</markdown>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="size">
      <n-space>
        <n-radio value="small">
          Small
        </n-radio>
        <n-radio value="medium">
          Not Small
        </n-radio>
        <n-radio value="large">
          Not Not Small
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
      <n-tab-pane name="jay chou" tab="Jay Chou">
        Qilixiang
      </n-tab-pane>
    </n-tabs>
    <n-tabs type="line" :size="size">
      <n-tab-pane name="oasis" tab="Oasis">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="the Beatles">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="Jay Chou">
        Qilixiang
      </n-tab-pane>
    </n-tabs>
    <n-tabs type="card" :size="size" closable>
      <n-tab-pane name="oasis" tab="Oasis">
        Wonderwall
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="the Beatles">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="Jay Chou">
        Qilixiang
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
