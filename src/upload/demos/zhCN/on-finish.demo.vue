<markdown>
# 上传完成的回调

你可以在回调中修改文件的属性。使用`keep-file-after-finish`允许在回调中返回File。
</markdown>

<template>
  KeepFileAfterFinish <n-switch v-model:value="keepFileAfterFinish" /><br>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :keep-file-after-finish="keepFileAfterFinish"
    @finish="handleFinish"
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
    const handleFinish = ({
      file,
      event
    }: {
      file: UploadFileInfo
      event?: ProgressEvent
    }) => {
      console.log(event)
      console.log(file.file)
      message.success((event?.target as XMLHttpRequest).response)
      const ext = file.name.split('.')[1]
      file.name = `更名.${ext}`
      file.url = '__HTTPS__://www.mocky.io/v2/5e4bafc63100007100d8b70f'
      return file
    }
    return {
      keepFileAfterFinish: ref(false),
      message,
      handleFinish
    }
  }
})
</script>
