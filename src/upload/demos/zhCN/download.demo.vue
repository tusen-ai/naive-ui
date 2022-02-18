<markdown>
# 下载文件

通过设置 `show-download-button` 来显示下载按钮，通过 `on-download` 来设置下载按钮被点击的事件处理函数。
</markdown>

<template>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image"
    show-download-button
    @download="handleDownload"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const fileListRef = ref<UploadFileInfo[]>([
      {
        id: 'a',
        name: '我错了，但我可以改.png',
        status: 'error'
      },
      {
        id: 'd',
        name: '现在还不行呢.doc',
        status: 'uploading',
        percentage: 50
      },
      {
        id: 'c',
        name: '现在就可下载哟.png',
        status: 'finished',
        url: '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    ])
    const handleDownload = (file: UploadFileInfo) => {
      message.success(`下载成功：${file.name}`)
    }
    return {
      fileList: fileListRef,
      handleDownload
    }
  }
})
</script>
