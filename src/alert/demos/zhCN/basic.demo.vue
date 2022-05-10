<markdown>
# 基础用法
</markdown>

<template>
  <n-space vertical :size="12">
    <n-alert title="Default 类型" type="default">
      <template #icon>
        <n-icon>
          <ios-airplane />
        </n-icon>
      </template>
      Gee it's good to be back home
    </n-alert>
    <n-alert title="Info 类型" type="info">
      Gee it's good to be back home
    </n-alert>
    <n-alert title="Success 类型" type="success">
      Leave it till tomorrow to unpack my case
    </n-alert>
    <n-alert title="Warning 类型" type="warning">
      Honey disconnect the phone
    </n-alert>
    <n-alert title="Error 类型" type="error">
      I'm back in the U.S.S.R.
    </n-alert>
  </n-space>
</template>

<script lang="ts">
import { IosAirplane } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    IosAirplane
  }
})
</script>
