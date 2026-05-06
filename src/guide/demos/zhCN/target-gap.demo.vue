<markdown>
# 高亮间距

控制高亮框与目标框之间的间距。
</markdown>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showRef = ref(false)
    const gapRef = ref(0)
    const stepsRef = computed(() => [
      {
        title: '高亮间距',
        content: `当前高亮间距：${gapRef.value}px`,
        target: '#guide-target-gap'
      }
    ])

    return {
      show: showRef,
      gap: gapRef,
      steps: stepsRef,
      startGuide(gap: number) {
        gapRef.value = gap
        showRef.value = true
      }
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-button id="guide-target-gap">
      目标
    </n-button>
    <n-space>
      <n-button @click="startGuide(0)">
        间距 0
      </n-button>
      <n-button @click="startGuide(12)">
        间距 12
      </n-button>
    </n-space>
  </n-space>
  <n-guide v-model:show="show" :steps="steps" :target-gap="gap" />
</template>
