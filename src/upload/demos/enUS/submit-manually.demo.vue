<markdown>
# Uncontrolled manually submit & abort

You can use a `ref` to get a handle on files uploaded, and the `submit` method to submit them when you're ready.
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
      handleChange(data: { fileList: UploadFileInfo[] }) {
        fileListLengthRef.value = data.fileList.length
      },
      handleClick() {
        uploadRef.value?.submit()
      },
      handleAbort() {
        uploadRef.value?.abort()
      }
    }
  }
})
</script>

<template>
  <n-space style="margin-bottom: 12px">
    <n-button :disabled="!fileListLength" @click="handleClick">
      Upload File
    </n-button>
    <n-button @click="handleAbort">
      Abort Uploading
    </n-button>
  </n-space>
  <n-upload
    ref="upload"
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-upload="false"
    multiple
    @change="handleChange"
  >
    <n-button>Select File</n-button>
  </n-upload>
</template>
