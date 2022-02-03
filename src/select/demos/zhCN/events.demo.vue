<markdown>
# UpdateValue 事件

为什么 `update:value` 事件还是个例子？因为一开始的时候没什么可写的。
</markdown>

<template>
  <n-space vertical>
    <n-select
      placeholder="选择歌曲"
      :options="options"
      @update:value="handleUpdateValue"
    />
    <n-select
      multiple
      placeholder="选择歌曲"
      :options="options"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, SelectOption } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleUpdateValue (value: string, option: SelectOption) {
        message.info('value: ' + JSON.stringify(value))
        message.info('option: ' + JSON.stringify(option))
      },
      options: [
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourself',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    }
  }
})
</script>
