<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
  <n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-dialog-provider>
        <DialogButton />
      </n-dialog-provider>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { useMessage, useDialog, unstableDialogRtl, NButton } from 'naive-ui'

const DialogButton = defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      message,
      dialog
    }
  },
  render () {
    return h(
      NButton,
      {
        onClick: () => {
          this.dialog.warning({
            title: '警告',
            content: '你确定？',
            positiveText: '确定',
            negativeText: '不确定',
            onPositiveClick: () => {
              this.message.success('确定')
            },
            onNegativeClick: () => {
              this.message.error('不确定')
            }
          })
        }
      },
      { default: () => 'Show some message' }
    )
  }
})

export default defineComponent({
  components: {
    DialogButton
  },
  setup () {
    return {
      rtlEnabled: ref(true),
      rtlStyles: [unstableDialogRtl]
    }
  }
})
</script>
