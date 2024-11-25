<markdown>
# 默认文件列表
</markdown>

<script lang="ts">
import type { UploadFileInfo } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const defaultFileList: UploadFileInfo[] = [
      {
        id: 'razars',
        name: '刀',
        status: 'finished'
      },
      {
        id: 'edge',
        name: '锋',
        status: 'finished'
      }
    ]
    return {
      defaultFileList
    }
  }
})
</script>

<template>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="defaultFileList"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>
