<markdown>
# Before upload hook

Use `before-upload` to perform a function before the upload starts (e.g. cancel the upload).
</markdown>

<template>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @before-upload="beforeUpload"
  >
    <n-button>Upload PNG</n-button>
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
          message.error(
            'Only upload picture files in png format, please re-upload.'
          )
          return false
        }
        return true
      }
    }
  }
})
</script>
