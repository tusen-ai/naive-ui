<markdown>
# Debug
</markdown>

<script lang="ts" setup>
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { ref } from 'vue'

const files = ref<UploadFileInfo[]>([])

async function customRequest(uploadFile: UploadCustomRequestOptions) {
  // 去掉注释可以正常显示所有文件 error 状态
  // await new Promise((resolve) => setTimeout(() => { resolve(1) }, 3000))
  uploadFile.onError()
}

function handleUpdateList(...args: unknown[]): void {
  console.log(...args)
}

const multiple = ref(false)
const directory = ref(false)
const directoryDnd = ref(false)
const directoryDndUndefined = ref(true)
</script>

<template>
  <n-p> Issue #7366 复现：多文件同步 onError 只有最后一个文件显示红色 </n-p>
  <n-upload v-model:file-list="files" multiple :custom-request="customRequest">
    <n-button>上传文件（多选）</n-button>
  </n-upload>
  <n-p depth="3" style="margin-top: 12px">
    files: {{ files }}
  </n-p>

  <n-divider />

  Retry
  <n-upload action="http://fake-api">
    <n-button>Upload</n-button>
  </n-upload>
  Multiple <n-switch v-model:value="multiple" /><br>
  Directory <n-switch v-model:value="directory" /><br>
  DirectoryDnd <n-switch v-model:value="directoryDnd" /><br>
  DirectoryDnd undefined <n-switch v-model:value="directoryDndUndefined" />
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :multiple="multiple"
    :directory="directory"
    :directory-dnd="directoryDndUndefined ? undefined : directoryDnd"
    @update:file-list="handleUpdateList"
  >
    <n-button>Upload</n-button>
  </n-upload>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :multiple="multiple"
    :directory="directory"
    :directory-dnd="directoryDndUndefined ? undefined : directoryDnd"
    @update:file-list="handleUpdateList"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <ArchiveIcon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>
</template>
