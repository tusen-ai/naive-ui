<markdown>
# Error slot

You can use `error` slot to custom loading error display.
</markdown>

<script lang="ts" setup>
import { ImageOutline as ImageOutlineIcon } from '@vicons/ionicons5'
import { ref } from 'vue'

const url = ref('blablabla')
function refresh() {
  url.value = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
}
function reloadError() {
  url.value = 'blablabla'
}
</script>

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
          <ImageOutlineIcon />
        </n-icon>
      </template>
    </n-image>
  </n-flex>
</template>
