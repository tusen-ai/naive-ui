<markdown>
# 受控的文件列表

下面的例子纯属玩笑。
</markdown>

<template>
  <n-upload
    v-model:file-list="fileList"
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @change="handleUploadChange"
    @remove="handleRemove"
    @update:file-list="handleFileListChange"
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
    const fileListRef = ref<UploadFileInfo[]>([
      {
        id: 'url-test',
        name: 'URL 测试',
        url: '__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f',
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
    return {
      fileList: fileListRef,
      handleUploadChange (data: { fileList: UploadFileInfo[] }) {
        fileListRef.value = data.fileList
      },
      handleRemove (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
        if (data.file.id === 'text-message') {
          message.info('居然没传上去，算了，删了吧')
        } else if (data.file.id === 'notification') {
          message.error('不行，这个有用，不许删')
          return false
        } else if (data.file.id === 'contact') {
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
      },
      handleFileListChange () {
        message.info('是的，file-list 的值变了')
      }
    }
  }
})
</script>
