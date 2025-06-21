<markdown>
# Uncontrolled manually submit

You can use a `ref` to get a handle on files uploaded, and the `submit` method to submit them when you're ready.
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo, UploadInst } from 'naive-ui'
import { ref } from 'vue'

const fileListLengthRef = ref(0)
const uploadRef = ref<UploadInst | null>(null)

const fileListLength = fileListLengthRef
const upload = uploadRef

function handleChange(data: { fileList: UploadFileInfo[] }) {
  fileListLengthRef.value = data.fileList.length
}

function handleClick() {
  uploadRef.value?.submit()
}
</script>

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
