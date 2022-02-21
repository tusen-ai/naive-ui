<markdown>
# 限制上传文件

使用 `before-upload` 限制上传。
</markdown>

<template>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @before-upload="beforeUpload"
  >
    <n-button>上传 PNG 文件</n-button>
  </n-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      async beforeUpload (data: {
        file: UploadFileInfo
        fileList: UploadFileInfo[]
      }) {
        if (data.file.file?.type !== 'image/png') {
          message.error('只能上传png格式的图片文件，请重新上传')
          return false
        }
        return true
      }
    }
  }
})
</script>
