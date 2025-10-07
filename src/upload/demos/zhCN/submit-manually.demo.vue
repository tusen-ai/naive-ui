<markdown>
# 非受控手动提交

你可以使用 submit 方法来进行非受控状态下的手动提交。当然你也可以在受控模式下完全控制提交行为。
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo, UploadInst } from 'naive-ui'
import { ref } from 'vue'

const fileListLengthRef = ref(0)
const uploadRef = ref<UploadInst | null>(null)

const fileListLength = fileListLengthRef
const upload = uploadRef

function handleChange(options: { fileList: UploadFileInfo[] }) {
  fileListLengthRef.value = options.fileList.length
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
    上传文件
  </n-button>
  <n-upload
    ref="upload"
    action="https://m1.apifoxmock.com/m1/7208154-6934252-default/api/upload"
    :default-upload="false"
    multiple
    @change="handleChange"
  >
    <n-button>选择文件</n-button>
  </n-upload>
</template>
