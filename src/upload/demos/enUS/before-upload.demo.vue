<markdown>
# Before upload hook

Use `before-upload` to perform a function before the upload starts (e.g. cancel the upload).
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'

const message = useMessage()

async function beforeUpload(data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) {
  if (data.file.file?.type !== 'image/png') {
    message.error('Only upload picture files in png format, please re-upload.')
    return false
  }
  return true
}
</script>

<template>
  <n-upload
    action="https://m1.apifoxmock.com/m1/7208154-6934252-default/api/upload"
    @before-upload="beforeUpload"
  >
    <n-button>Upload PNG</n-button>
  </n-upload>
</template>
