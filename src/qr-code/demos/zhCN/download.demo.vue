<markdown>
  # 下载

下载二维码的代码实现，你也可以选择右键图片另存为。
</markdown>

<template>
  <n-space vertical>
    <n-qr-code id="qr-code" value="https://www.naiveui.com/" />
    <n-button @click="handleDownloadQRCode">
      下载
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const handleDownloadQRCode = () => {
      const canvas = document
        .querySelector('#qr-code')
        ?.querySelector<HTMLCanvasElement>('canvas')
      if (canvas) {
        const url = canvas.toDataURL()
        const a = document.createElement('a')
        a.download = 'QRCode.png'
        a.href = url
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }
    return {
      handleDownloadQRCode
    }
  }
})
</script>
