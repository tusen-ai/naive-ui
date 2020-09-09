<template>
  <div class="n-upload-dragger">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UploadDragger',
  inject: {
    NUpload: {
      default: null
    }
  },
  created () {
    this.NUpload && (this.NUpload.draggerInside = true)
  },
  beforeDestroy () {
    this.NUpload && (this.NUpload.draggerInside = false)
  }
}
</script>
