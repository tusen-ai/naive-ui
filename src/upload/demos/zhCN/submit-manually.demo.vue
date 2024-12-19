<markdown>
# 非受控手动提交

你可以使用 submit 方法来进行非受控状态下的手动提交。当然你也可以在受控模式下完全控制提交行为。
</markdown>

<script lang="ts">
import type { UploadFileInfo, UploadInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fileListLengthRef = ref(0)
    const uploadRef = ref<UploadInst | null>(null)

    return {
      upload: uploadRef,
      fileListLength: fileListLengthRef,
      handleChange(options: { fileList: UploadFileInfo[] }) {
        fileListLengthRef.value = options.fileList.length
      },
      handleClick() {
        uploadRef.value?.submit()
      }
    }
  }
})
</script>

<template>
  <n-button
    :disabled="!fileListLength"
    style="margin-bottom: 12px"
    @click="handleClick"
  >
    上传文件
  </n-button>
  <n-upload
    ref="upload"
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-upload="false"
    multiple
    @change="handleChange"
  >
    <n-button>选择文件</n-button>
  </n-upload>
</template>
