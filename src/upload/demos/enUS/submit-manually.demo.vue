<markdown>
# Uncontrolled manually submit

You can use a `ref` to get a handle on files uploaded, and the `submit` method to submit them when you're ready.
</markdown>

<template>
  <n-button
    :disabled="!fileListLength"
    style="margin-bottom: 12px"
    @click="handleClick"
  >
    Upload File
  </n-button>
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadInst, UploadFileInfo } from 'naive-ui'

export default defineComponent({
  setup () {
    const fileListLengthRef = ref(0)
    const uploadRef = ref<UploadInst | null>(null)

    return {
      upload: uploadRef,
      fileListLength: fileListLengthRef,
      handleChange (data: { fileList: UploadFileInfo[] }) {
        fileListLengthRef.value = data.fileList.length
      },
      handleClick () {
        uploadRef.value?.submit()
      }
    }
  }
})
</script>
