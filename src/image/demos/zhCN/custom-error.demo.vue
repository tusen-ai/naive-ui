<markdown>
# 自定义加载失败

多数情况下可以使用 `fallback-src` 设定失败时的图像。
</markdown>

<template>
  <n-flex vertical inline>
    <n-flex>
      <n-button type="error" @click="reloadError">
        加载失败
      </n-button>
      <n-button type="primary" @click="refresh">
        刷新
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
    const url = ref('人生嘛，失败总是难免的')
    const refresh = () => {
      url.value = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    }
    const reloadError = () => {
      url.value = '人生嘛，失败总是难免的'
    }
    return {
      url,
      refresh,
      reloadError
    }
  }
})
</script>
