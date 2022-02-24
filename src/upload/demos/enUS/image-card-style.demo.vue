<markdown>
# Pictures wall

By default, this will use Naive UI's internal preview component. You can also use `on-preview` to customize what to do when previewing a file.
</markdown>

<template>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image-card"
  >
    Click to Upload
  </n-upload>
  <n-divider />
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="previewFileList"
    list-type="image-card"
    @preview="handlePreview"
  />
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 600px"
    title="A Cool Picture"
  >
    <img :src="previewImageUrl" style="width: 100%">
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadFileInfo } from 'naive-ui'

export default defineComponent({
  setup () {
    const showModalRef = ref(false)
    const previewImageUrlRef = ref('')
    function handlePreview (file: UploadFileInfo) {
      const { url } = file
      previewImageUrlRef.value = url as string
      showModalRef.value = true
    }
    return {
      handlePreview,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      fileList: ref<UploadFileInfo[]>([
        {
          id: 'a',
          name: '我是上传出错的普通文件.png',
          status: 'error'
        },
        {
          id: 'b',
          name: '我是普通文本.doc',
          status: 'finished',
          type: 'text/plain'
        },
        {
          id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          id: 'd',
          name: '我是上传进度99%的文本.doc',
          status: 'uploading',
          percentage: 99
        }
      ]),
      previewFileList: ref<UploadFileInfo[]>([
        {
          id: 'react',
          name: '我是react.png',
          status: 'finished',
          url: '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          id: 'vue',
          name: '我是vue.png',
          status: 'finished',
          url: '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        }
      ])
    }
  }
})
</script>
