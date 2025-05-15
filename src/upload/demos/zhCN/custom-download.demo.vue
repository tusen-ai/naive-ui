<markdown>
# 自定义下载文件

通过设置 `on-download` 来自定义下载文件。

默认下载方式为浏览器原生，面对一些动态内容下载的业务场景,您可以使用自定义下载。
</markdown>

<script lang="ts">
import type { UploadFileInfo } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fileListRef = ref<UploadFileInfo[]>([
      {
        id: 'c',
        name: '自定义下载文件.png',
        status: 'finished',
        url: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      }
    ])
    const handleDownload = (file: UploadFileInfo) => {
      const { url, name } = file
      if (!url)
        return
      fetch(url)
        .then(response => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(new Blob([blob]))
          const link = document.createElement('a')
          link.href = blobUrl
          if (name) {
            link.download = name
          }

          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(blobUrl)
          link.remove()
        })
      return false
    }
    return {
      fileList: fileListRef,
      handleDownload
    }
  }
})
</script>

<template>
  <n-upload
    action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image"
    show-download-button
    @download="handleDownload"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>
