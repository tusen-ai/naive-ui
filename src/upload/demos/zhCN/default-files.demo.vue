<markdown>
# 默认文件列表
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'

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
</script>

<template>
  <n-upload
    action="https://m1.apifoxmock.com/m1/7208154-6934252-default/api/upload"
    :default-file-list="defaultFileList"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>
