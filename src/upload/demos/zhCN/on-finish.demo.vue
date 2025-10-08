<markdown>
# 上传完成的回调

你可以在回调中修改文件的属性。
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'

const message = useMessage()

function handleFinish({
  file,
  event
}: {
  file: UploadFileInfo
  event?: ProgressEvent
}) {
  const response = (event?.target as XMLHttpRequest).response
  const res = JSON.parse(response)
  message.success(response)
  const ext = file.name.split('.')[1]
  file.name = `更名.${ext}`
  file.status = res.status
  file.url = res.url
  file.thumbnailUrl = res.thumbnailUrl
  return file
}
</script>

<template>
  <n-upload
    action="https://m1.apifoxmock.com/m1/7208154-6934252-default/api/upload"
    @finish="handleFinish"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>
