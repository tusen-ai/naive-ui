<markdown>
# 上传完成的回调

你可以在回调中修改文件的属性。
</markdown>

<template>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @finish="handleFinish"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const handleFinish = ({
      file,
      event
    }: {
      file: UploadFileInfo
      event?: ProgressEvent
    }) => {
      console.log(event)
      message.success((event?.target as XMLHttpRequest).response)
      const ext = file.name.split('.')[1]
      file.name = `更名.${ext}`
      file.url = '__HTTPS__://www.mocky.io/v2/5e4bafc63100007100d8b70f'
      return file
    }
    return {
      message,
      handleFinish
    }
  }
})
</script>
