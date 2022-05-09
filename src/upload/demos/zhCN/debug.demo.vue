<markdown>
# Debug
</markdown>

<template>
  Retry
  <n-upload action="http://fake-api">
    <n-button>Upload</n-button>
  </n-upload>
  Single
  <n-upload action="http://fake-api" @update:file-list="handleUpdateList">
    <n-button>Upload</n-button>
  </n-upload>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @update:file-list="handleUpdateList"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
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
  Multiple
  <n-upload
    multiple
    action="http://fake-api"
    @update:file-list="handleUpdateList"
  >
    <n-button>Upload</n-button>
  </n-upload>
  <n-upload
    multiple
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @update:file-list="handleUpdateList"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
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
  Directory
  <n-upload
    directory
    action="http://fake-api"
    @update:file-list="handleUpdateList"
  >
    <n-button>Upload</n-button>
  </n-upload>
  <n-upload
    directory
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    @update:file-list="handleUpdateList"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
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

<script lang="ts">
import { defineComponent } from 'vue'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    ArchiveIcon
  },
  setup () {
    return {
      handleUpdateList (...args: unknown[]) {
        console.log(...args)
      }
    }
  }
})
</script>
