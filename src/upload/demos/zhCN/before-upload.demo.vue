<markdown>
# 限制上传文件

使用 `before-upload` 限制上传。
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
    message.error('只能上传png格式的图片文件，请重新上传')
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
    <n-button>上传 PNG 文件</n-button>
  </n-upload>
</template>
