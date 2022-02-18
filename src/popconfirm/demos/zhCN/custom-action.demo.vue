<markdown>
# 自定义操作
</markdown>

<template>
  <n-space>
    <n-popconfirm v-model:show="show">
      <template #trigger>
        <n-button>引用</n-button>
      </template>
      譬如，我或许可以就大象本身写一点什么，但对象的驯化却不知从何写起。
      <template #action>
        <n-button size="small" @click="show = false">
          或许吧
        </n-button>
      </template>
    </n-popconfirm>
    <n-popconfirm positive-text="噢!">
      <template #trigger>
        <n-button>引用</n-button>
      </template>
      譬如，我或许可以就大象本身写一点什么，但对象的驯化却不知从何写起。
    </n-popconfirm>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
