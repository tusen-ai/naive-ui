<markdown>
# Actions
</markdown>

<template>
  <n-space>
    <n-popconfirm
      @positive-click="handlePositiveClick"
      @negative-click="handleNegativeClick"
    >
      <template #trigger>
        <n-button>Quote</n-button>
      </template>
      Things pass us by. Nobody can catch them. That's the way we live our
      lives.
    </n-popconfirm>
    <n-popconfirm :negative-text="null" @positive-click="handlePositiveClick">
      <template #trigger>
        <n-button>Only Confirm</n-button>
      </template>
      Things pass us by. Nobody can catch them. That's the way we live our
      lives.
    </n-popconfirm>
    <n-popconfirm :positive-text="null" @negative-click="handleNegativeClick">
      <template #trigger>
        <n-button>Only Cancel</n-button>
      </template>
      Things pass us by. Nobody can catch them. That's the way we live our
      lives.
    </n-popconfirm>
    <n-popconfirm :positive-text="null" :negative-text="null">
      <template #trigger>
        <n-button>Nothing</n-button>
      </template>
      Things pass us by. Nobody can catch them. That's the way we live our
      lives.
    </n-popconfirm>
    <n-popconfirm>
      <template #trigger>
        <n-button>Custom action</n-button>
      </template>
      <template #action>
        Custom Action
      </template>
      Things pass us by. Nobody can catch them. That's the way we live our
      lives.
    </n-popconfirm>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handlePositiveClick () {
        message.info('Yes')
      },
      handleNegativeClick () {
        message.info('No')
      }
    }
  }
})
</script>
