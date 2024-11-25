<markdown>
# Drag to upload

You can set `directory-dnd` to `true` to make directory drag and drop available.
</markdown>

<script lang="ts">
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ArchiveIcon
  }
})
</script>

<template>
  <n-upload
    multiple
    directory-dnd
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :max="5"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <ArchiveIcon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        Click or drag a file to this area to upload
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        Strictly prohibit from uploading sensitive information. For example,
        your bank card PIN or your credit card expiry date.
      </n-p>
    </n-upload-dragger>
  </n-upload>
</template>
