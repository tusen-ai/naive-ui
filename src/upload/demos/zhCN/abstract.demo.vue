<markdown>
# 拆分触发器和列表

`n-upload-trigger`和 `n-upload-file-list` 需在 `n-upload` 内调用。
</markdown>

<template>
  <n-upload
    abstract
    :default-file-list="fileList"
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
  >
    <n-button-group>
      <n-button>点我没用</n-button>
      <n-upload-trigger #="{ handleClick }" abstract>
        <n-button @click="handleClick">
          上传
        </n-button>
      </n-upload-trigger>
    </n-button-group>
    <n-card style="margin-top: 12px" title="文件列表">
      <n-upload-file-list />
    </n-card>
  </n-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadFileInfo } from 'naive-ui'
export default defineComponent({
  setup () {
    const fileListRef = ref<UploadFileInfo[]>([
      {
        id: 'b',
        name: 'file.doc',
        status: 'finished',
        type: 'text/plain'
      }
    ])

    return { fileList: fileListRef }
  }
})
</script>
