<markdown>
# 没有边框
</markdown>

<template>
  <n-space vertical :size="12">
    <n-alert title="Default 类型" type="default" :show-border="false">
      <template #icon>
        <n-icon>
          <ios-airplane />
        </n-icon>
      </template>
      Gee it's good to be back home
    </n-alert>
    <n-alert title="Info 类型" type="info" :show-border="false">
      Gee it's good to be back home
    </n-alert>
    <n-alert title="Success 类型" type="success" :show-border="false">
      Leave it till tomorrow to unpack my case
    </n-alert>
    <n-alert title="Warning 类型" type="warning" :show-border="false">
      Honey disconnect the phone
    </n-alert>
    <n-alert title="Error 类型" type="error" :show-border="false">
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
