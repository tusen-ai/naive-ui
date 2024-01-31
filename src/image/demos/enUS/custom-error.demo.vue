<markdown>
# The custom loading failed. Procedure

In most cases, can use 'fallback-src' to set the image when it fails.
</markdown>

<template>
  <n-flex vertical inline>
    <n-flex>
      <n-button type="error" @click="reloadError">
        Load Fail
      </n-button>
      <n-button type="primary" @click="refresh">
        Refresh
      </n-button>
    </n-flex>
    <n-image width="100" :src="url">
      <template #error>
        <n-icon :size="100" color="lightGrey">
          <image-outline-icon />
        </n-icon>
      </template>
    </n-image>
  </n-flex>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ImageOutline as ImageOutlineIcon } from '@vicons/ionicons5'
export default defineComponent({
  components: {
    ImageOutlineIcon
  },
  setup () {
    const url = ref('blablabla')
    const refresh = () => {
      url.value = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    }
    const reloadError = () => {
      url.value = 'blablabla'
    }
    return {
      url,
      refresh,
      reloadError
    }
  }
})
</script>
