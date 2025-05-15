<markdown>
# Custom Download

User `on-download` to customize download file
</markdown>

<script lang="ts">
import type { UploadFileInfo } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fileListRef = ref<UploadFileInfo[]>([
      {
        id: 'c',
        name: 'custom-Download.png',
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
    <n-button>Upload</n-button>
  </n-upload>
</template>
