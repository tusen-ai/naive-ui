<markdown>
# 自定义上传

使用 `custom-request` 属性来自定义上传请求。
</markdown>

<template>
  <n-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :headers="{
      'naive-info': 'hello!'
    }"
    :data="{
      'naive-data': 'cool! naive!'
    }"
    :custom-request="customRequest"
  >
    <n-button>上传文件</n-button>
  </n-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
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
      axios
        .post(action as string, formData, {
          withCredentials,
          headers,
          onUploadProgress: ({ loaded, total }) => {
            onProgress({ percent: Math.ceil((loaded / total) * 100) })
          }
        } as AxiosRequestConfig)
        .then((e) => {
          message.success(e.data)
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
