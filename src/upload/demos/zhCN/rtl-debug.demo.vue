<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { unstableUploadsRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableUploadsRtl]

const fileList = ref<UploadFileInfo[]>([
  {
    id: 'a',
    name: '我是上传出错的普通文件.png',
    status: 'error'
  },
  {
    id: 'b',
    name: '我是普通文本.doc',
    status: 'finished',
    type: 'text/plain'
  },
  {
    id: 'c',
    name: '我是自带url的图片.png',
    status: 'finished',
    url: '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    id: 'd',
    name: '我是上传进度99%的文本.doc',
    status: 'uploading',
    percentage: 99
  }
])
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space vertical>
        <n-upload
          action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="fileList"
          list-type="image-card"
        >
          点击上传
        </n-upload>

        <n-upload
          action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="fileList"
          list-type="image"
        >
          <n-button>上传文件</n-button>
        </n-upload>
      </n-space>
    </n-config-provider>
  </n-space>
</template>
