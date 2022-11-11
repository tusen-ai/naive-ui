<markdown>
# 交互展示元素控制

通过 `trigger` 属性控制相关交互按钮在何时显示，可选值 `none` (一直显示) | `hover` | `click`
</markdown>

<template>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image-card"
    trigger="none"
  >
    点击上传
  </n-upload>
  <n-divider />
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image-card"
    trigger="hover"
    @preview="handlePreview"
  />
  <n-divider />
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image-card"
    trigger="click"
    @preview="handlePreview"
  />
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 600px"
    title="一张很酷的图片"
  >
    <img :src="previewImageUrl" style="width: 100%">
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UploadFileInfo } from 'naive-ui'

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
          id: 'react',
          name: '我是react.png',
          status: 'finished',
          url: '__HTTP__://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        }
      ])
    }
  }
})
</script>
