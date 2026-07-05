<markdown>
  # Download

  Download two-dimensional code code implementation, you can also choose to right-click the picture to save it.
</markdown>

<script lang="ts" setup>
function handleDownloadQRCode() {
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
</script>

<template>
  <n-space vertical>
    <n-qr-code id="qr-code" value="https://www.naiveui.com/" />
    <n-button @click="handleDownloadQRCode">
      Download
    </n-button>
  </n-space>
</template>
