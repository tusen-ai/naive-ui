<markdown>
# Default file list
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'

const defaultFileList: UploadFileInfo[] = [
  {
    id: 'the',
    name: 'The',
    status: 'finished'
  },
  {
    id: 'razars',
    name: 'Razars\'s',
    status: 'finished'
  },
  {
    id: 'edge',
    name: 'Blade',
    status: 'finished'
  }
]
</script>

<template>
  <n-upload
    action="https://m1.apifoxmock.com/m1/7208154-6934252-default/api/upload"
    :default-file-list="defaultFileList"
  >
    <n-button>Upload File</n-button>
  </n-upload>
</template>
