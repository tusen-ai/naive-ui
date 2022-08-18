<markdown>
# Custom request

User `custom-request` to customize upload request.
</markdown>

<template>
  <n-upload
    action="__HTTP__://naive-upload.free.beeceptor.com/"
    :headers="{
      'naive-info': 'hello!'
    }"
    :data="{
      'naive-data': 'cool! naive!'
    }"
    :custom-request="customRequest"
  >
    <n-button>Upload</n-button>
  </n-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lyla } from 'lyla'
import { useMessage } from 'naive-ui'
import type { UploadCustomRequestOptions } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const customRequest = ({
      file,
      data,
      headers,
      withCredentials,
      action,
      onFinish,
      onError,
      onProgress
    }: UploadCustomRequestOptions) => {
      const formData = new FormData()
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(
            key,
            data[key as keyof UploadCustomRequestOptions['data']]
          )
        })
      }
      formData.append(file.name, file.file as File)
      lyla
        .post(action as string, {
          withCredentials,
          headers: headers as Record<string, string>,
          body: formData,
          onUploadProgress: ({ percent }) => {
            onProgress({ percent: Math.ceil(percent) })
          }
        })
        .then(({ json }) => {
          message.success(JSON.stringify(json))
          onFinish()
        })
        .catch((error) => {
          message.success(error.message)
          onError()
        })
    }
    return {
      customRequest
    }
  }
})
</script>
