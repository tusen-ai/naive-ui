<markdown>
# Download when finished

set `show-download-button` to show download button. set `on-download` to provide a handler function when download button clicked.
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const fileListRef = ref<UploadFileInfo[]>([
  {
    id: 'a',
    name: 'My Fault.png',
    status: 'error'
  },
  {
    id: 'c',
    name: 'Finished you can dowload.png',
    status: 'finished',
    url: '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    id: 'd',
    name: 'Waiting for the finish .doc',
    status: 'uploading',
    percentage: 50
  }
])

const fileList = fileListRef

function handleDownload(file: UploadFileInfo) {
  message.success(`success：${file.name}`)
}
</script>

<template>
  <n-upload
    action="https://m1.apifoxmock.com/m1/7208154-6934252-default/api/upload"
    :default-file-list="fileList"
    list-type="image"
    show-download-button
    @download="handleDownload"
  >
    <n-button>Upload</n-button>
  </n-upload>
</template>
