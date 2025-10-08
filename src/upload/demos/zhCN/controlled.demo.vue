<markdown>
# 受控的文件列表

下面的例子纯属玩笑。
</markdown>

<script lang="ts" setup>
import type { UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const fileListRef = ref<UploadFileInfo[]>([
  {
    id: 'url-test',
    name: 'URL 测试',
    status: 'finished'
  },
  {
    id: 'text-message',
    name: '你的短信',
    status: 'error'
  },
  {
    id: 'notification',
    name: '你的通知',
    status: 'finished'
  },
  {
    id: 'contact',
    name: '你的联系人信息',
    status: 'finished'
  }
])

const fileList = fileListRef

function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
  fileListRef.value = data.fileList
}

function handleRemove(data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) {
  if (data.file.id === 'text-message') {
    message.info('居然没传上去，算了，删了吧')
  }
  else if (data.file.id === 'notification') {
    message.error('不行，这个有用，不许删')
    return false
  }
  else if (data.file.id === 'contact') {
    message.loading('不知道这个有没有用，等我问问服务器能不能删', {
      duration: 4000
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        message.error('不行，他们也不许删这个')
        resolve(false)
      }, 4000)
    })
  }
}

function handleFinish({
  file,
  event
}: {
  file: UploadFileInfo
  event?: ProgressEvent
}) {
  const response = (event?.target as XMLHttpRequest).response
  const res = JSON.parse(response)
  message.success(response)
  file.status = res.status
  file.url = res.url
  file.thumbnailUrl = res.thumbnailUrl
  return file
}

function handleFileListChange() {
  message.info('是的，file-list 的值变了')
}
</script>

<template>
  <n-upload
    v-model:file-list="fileList"
    action="https://m1.apifoxmock.com/m1/7208154-6934252-default/api/upload"
    @change="handleUploadChange"
    @remove="handleRemove"
    @finish="handleFinish"
    @update:file-list="handleFileListChange"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>
