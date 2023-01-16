<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-upload
        action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        :default-file-list="fileList"
        list-type="image"
        show-download-button
      >
        <n-button>上传文件</n-button>
      </n-upload>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { unstableUploadRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import type { UploadFileInfo } from 'naive-ui'

export default defineComponent({
  setup () {
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
        url: 'http://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    ])
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableUploadRtl],
      fileList: fileListRef
    }
  }
})
</script>
