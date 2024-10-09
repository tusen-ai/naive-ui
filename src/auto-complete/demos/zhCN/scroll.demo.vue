<markdown>
  # 滚动事件

  菜单滚动时触发的回调函数。
</markdown>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const valueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return [
          {
            label: 'Drive My Car',
            value: 'Drive My Car'
          },
          {
            label: 'Norwegian Wood',
            value: 'Norwegian Wood'
          },
          {
            label: 'You Won\'t See',
            value: 'You Won\'t See',
            disabled: true
          },
          {
            label: 'Nowhere Man',
            value: 'Nowhere Man'
          },
          {
            label: 'Think For Yourself',
            value: 'Think For Yourself'
          },
          {
            label: 'The Word',
            value: 'The Word'
          },
          {
            label: 'Michelle',
            value: 'Michelle',
            disabled: true
          },
          {
            label: 'What goes on',
            value: 'What goes on'
          },
          {
            label: 'Girl',
            value: 'Girl'
          },
          {
            label: 'I\'m looking through you',
            value: 'I\'m looking through you'
          },
          {
            label: 'In My Life',
            value: 'In My Life'
          },
          {
            label: 'Wait',
            value: 'Wait'
          }
        ]
      }),
      handleScroll: (_: Event) => {}
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      @scroll="handleScroll"
    />
  </n-space>
</template>
