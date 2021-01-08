<template>
  <div class="n-upload-dragger">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UploadDragger',
  inject: {
    NUpload: {
      default: null
    }
  },
  created () {
    this.NUpload && (this.NUpload.draggerInside = true)
  },
  beforeUnmount () {
    this.NUpload && (this.NUpload.draggerInside = false)
  }
})
</script>
