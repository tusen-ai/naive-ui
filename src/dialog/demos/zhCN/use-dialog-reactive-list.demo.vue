<markdown>
# 访问全部 Dialog 实例

你可以使用 `useDialogReactiveList` 去访问当前 `n-dialog-provider` 下的所有对话框。
</markdown>

<template>目前页面中共有 {{ dialogReactiveList.length }} 个对话框。</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialogReactiveList } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      dialogReactiveList: useDialogReactiveList()
    }
  }
})
</script>
