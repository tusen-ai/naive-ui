<markdown>
# Custom download

Use `custom-download` to customize file downloading.

By default, naive-ui uses native download logic (which initiates downloading by perform a click on an `<a />` element with correspoding URL).

However, you may want to preform custom download logic for example in a cross origin downloading process.
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { ref } from 'vue'

const fileList = ref<UploadFileInfo[]>([
  {
    id: 'c',
    name: 'custom-Download.png',
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
    <n-button>Upload</n-button>
  </n-upload>
</template>
