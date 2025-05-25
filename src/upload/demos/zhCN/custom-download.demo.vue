<markdown>
# 自定义下载

通过设置 `custom-download` 来自定义下载文件的逻辑。

默认下载方式为浏览器原生，通过对一个有对应 URL 的 `<a />` 元素的点击操作实现。但是在特定的场合下，例如跨域的文件下载，你可能会需要对文件的下载逻辑进行自定义。
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { ref } from 'vue'

const fileList = ref<UploadFileInfo[]>([
  {
    id: 'c',
    name: '自定义下载文件.png',
    status: 'finished',
    url: 'https://avatars.githubusercontent.com/u/20943608?s=60&v=4'
  }
])

function handleCustomDownload(file: UploadFileInfo) {
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
}
</script>

<template>
  <n-upload
    action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image"
    show-download-button
    :custom-download="handleCustomDownload"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>
