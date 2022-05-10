<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space>
        <n-tag>
          我不配
          <template #avatar>
            <n-avatar
              src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
            />
          </template>
        </n-tag>
        <n-tag type="success" size="small" round closable @close="handleClose">
          梯田
        </n-tag>
        <n-tag type="error" closable round @close="handleClose">
          说好不哭
          <template #avatar>
            <n-avatar
              round
              src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
            />
          </template>
        </n-tag>
        <n-tag type="error" closable size="large" round @close="handleClose">
          一路向北
        </n-tag>
      </n-space>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableTagRtl, useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableTagRtl],
      handleClose () {
        message.info('tag close')
      }
    }
  }
})
</script>
